const mongoose = require("mongoose");

const connectionString = process.env.DB_CONNECTION.replace(
  "<password>",
  process.env.DB_PASSWORD
);

const OLD_BASE = "http://localhost:9595";

async function run() {
  await mongoose.connect(connectionString);

  console.log("MongoDB connected");
  console.log("DRY RUN - database deyisdirilmir\n");

  const collections =
    await mongoose.connection.db.listCollections().toArray();

  let total = 0;

  for (const { name } of collections) {
    const collection = mongoose.connection.db.collection(name);
    const docs = await collection.find({}).toArray();

    for (const doc of docs) {
      for (const field of ["image", "video", "song"]) {
        const value = doc[field];

        if (
          typeof value === "string" &&
          value.startsWith(OLD_BASE + "/")
        ) {
          console.log(
            name,
            doc._id.toString(),
            field,
            "=>",
            value.replace(OLD_BASE, "")
          );

          total++;
        }
      }
    }
  }

  console.log("\nOld URL count:", total);

  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});