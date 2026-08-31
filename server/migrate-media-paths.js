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
  const collections = await db.listCollections().toArray();

  let totalUpdated = 0;

  for (const { name } of collections) {
    if (name === BACKUP_COLLECTION) continue;

    const collection = db.collection(name);
    const cursor = collection.find({});

    for await (const doc of cursor) {
      const updates = {};

      for (const field of FIELDS) {
        const value = doc[field];

        if (
          typeof value === "string" &&
          value.startsWith(OLD_BASE + "/")
        ) {
          const newValue = value.replace(OLD_BASE, "");

          await backupCollection.insertOne({
            collection: name,
            documentId: doc._id,
            field: field,
            oldValue: value,
            newValue: newValue,
            migratedAt: new Date()
          });

          updates[field] = newValue;
          totalUpdated++;
        }
      }

      if (Object.keys(updates).length > 0) {
        await collection.updateOne(
          { _id: doc._id },
          { $set: updates }
        );

        console.log(name, doc._id.toString(), "updated");
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