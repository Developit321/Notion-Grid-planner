import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  console.log("[MongoDB] getClientPromise called");
  console.log("[MongoDB] NODE_ENV:", process.env.NODE_ENV);
  console.log("[MongoDB] URI exists:", !!uri);
  console.log("[MongoDB] URI starts with:", uri ? uri.substring(0, 20) + "..." : "N/A");
  
  if (!uri) {
    console.error("[MongoDB] ERROR: MONGODB_URI is not set");
    throw new Error("Please add your MongoDB URI to .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    // In development, use a global variable to preserve the connection across HMR
    if (!global._mongoClientPromise) {
      console.log("[MongoDB] Creating new client (development)");
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect().then((client) => {
        console.log("[MongoDB] Connected successfully (development)");
        return client;
      }).catch((error) => {
        console.error("[MongoDB] Connection error (development):", error);
        throw error;
      });
    }
    return global._mongoClientPromise;
  } else {
    // In production, create a new client for each request
    if (!clientPromise) {
      console.log("[MongoDB] Creating new client (production)");
      client = new MongoClient(uri, options);
      clientPromise = client.connect().then((client) => {
        console.log("[MongoDB] Connected successfully (production)");
        return client;
      }).catch((error) => {
        console.error("[MongoDB] Connection error (production):", error);
        console.error("[MongoDB] Error details:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
        throw error;
      });
    }
    return clientPromise;
  }
}

export default getClientPromise;

export async function getDb(): Promise<Db> {
  console.log("[MongoDB] getDb called");
  try {
    const client = await getClientPromise();
    const db = client.db("instagram_grid_planner");
    console.log("[MongoDB] Database 'instagram_grid_planner' accessed");
    return db;
  } catch (error) {
    console.error("[MongoDB] getDb error:", error);
    throw error;
  }
}
