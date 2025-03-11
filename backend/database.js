import mongoose from "mongoose";

// MongoDB connection options
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
};

// Create connections
const ProductDb = mongoose.createConnection(process.env.DB_URL_PRODUCT, mongoOptions);
const UserDb = mongoose.createConnection(process.env.DB_URL_USER, mongoOptions);

ProductDb.on("connected", () => {
  console.log("✅ Connected to Products Database");
});

ProductDb.on("error", (err) => {
  console.log("❌ Error Connect To DataBase [PRODUCT]", err);
});

UserDb.on("connected", () => {
  console.log("✅ Connected to Users Database");
});

UserDb.on("error", (err) => {
  console.log("❌ Connect to Database Failed [USER]", err);
});


export { ProductDb, UserDb };
