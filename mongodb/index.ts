import { MongoClient } from "mongodb";

// Functions in the mongodb/ folder can only be used in
// pages/api/ or getServerSideProps()

const uri = process.env.MONGODB_URI ?? "";
const options = {};

let client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function isConnected(): Promise<boolean> {
  try {
    await clientPromise;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// (await clientPromise).db() will be the default database passed in the MONGODB_URI
// You can change the database by calling the client.db() function and specifying a database like:
// const db = client.db("myDatabase");
// Then you can execute queries against your database like so:
// db.find({}) or any of the MongoDB Node Driver commands
