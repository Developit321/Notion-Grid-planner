import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    // In development, use a global variable to preserve the connection across HMR
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production, create a new client for each request
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export default getClientPromise;

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db("instagram_grid_planner");
}
