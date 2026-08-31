const mongoose = require("mongoose");

const connectionString = process.env.DB_CONNECTION.replace(
  "<password>",
  process.env.DB_PASSWORD
);

const OLD_BASE = "http://localhost:9595";
const FIELDS = ["image", "video", "song"];

const BACKUP_COLLECTION = "media_migration_backup_20260831";

async function run() {
  await mongoose.connect(connectionString);

  console.log("MongoDB connected");

  const db = mongoose.connection.db;
  const backupCollection = db.collection(BACKUP_COLLECTION);

  // Eyni migration ikinci dəfə səhvən işləməsin
  const existingBackup = await backupCollection.countDocuments();

  if (existingBackup > 0) {
    console.log("Migration backup already exists.");
    console.log("Migration stopped.");
    await mongoose.disconnect();
    return;
  }

  const collections = await db.listCollections().toArray();

  let totalUpdated = 0;

  for (const { name } of collections) {
    if (name === BACKUP_COLLECTION) continue;

    const collection = db.collection(name);
    const cursor = collection.find({});

    for await (const doc of cursor) {
      const updates = {};
      const backups = [];

      for (const field of FIELDS) {
        const value = doc[field];

        if (
          typeof value === "string" &&
          value.startsWith(OLD_BASE + "/")
        ) {
          const newValue = value.replace(OLD_BASE, "");

          updates[field] = newValue;

          backups.push({
            collection: name,
            documentId: doc._id,
            field,
            oldValue: value,
            newValue: newValue,
            migratedAt: new Date()
          });
        }
      }

      if (backups.length > 0) {
        // Köhnə URL-i əvvəl backup et
        await backupCollection.insertMany(backups);

        // Sonra dəyiş
        await collection.updateOne(
          { _id: doc._id },
          { $set: updates }
        );

        totalUpdated += backups.length;

        console.log(
          name,
          doc._id.toString(),
          "updated"
        );
      }
    }
  }

  console.log("\nMigration completed.");
  console.log("Updated URLs:", totalUpdated);
  console.log("Backup collection:", BACKUP_COLLECTION);

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});