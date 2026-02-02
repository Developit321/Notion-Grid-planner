import { MongoClient, Db, ServerApiVersion } from "mongodb";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** Build MongoDB URI from env. Supports full MONGODB_URI or separate user/password/cluster (password is URL-encoded for you). */
function getMongoUri(): string {
  const fullUri = process.env.MONGODB_URI;
  if (fullUri && fullUri.trim()) {
    console.log("[MongoDB] Using MONGODB_URI (full connection string)");
    // Extract username and cluster from URI for logging (without password)
    try {
      const match = fullUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)/);
      if (match) {
        console.log("[MongoDB] Username:", match[1]);
        console.log("[MongoDB] Cluster:", match[3]);
      }
    } catch (e) {
      // Ignore parsing errors
    }
    return fullUri.trim();
  }
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER; // e.g. pedocluster.vyjvmsk.mongodb.net
  const dbName = process.env.MONGODB_DB_NAME || "instagram_grid_planner";
  if (user && password && cluster) {
    console.log("[MongoDB] Using separate env vars (MONGODB_USER/PASSWORD/CLUSTER)");
    console.log("[MongoDB] Username:", user);
    console.log("[MongoDB] Cluster:", cluster);
    const encodedUser = encodeURIComponent(user);
    const encodedPassword = encodeURIComponent(password);
    return `mongodb+srv://${encodedUser}:${encodedPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  }
  return "";
}

function getClientPromise(): Promise<MongoClient> {
  const uri = getMongoUri();
  console.log("[MongoDB] getClientPromise called");
  console.log("[MongoDB] NODE_ENV:", process.env.NODE_ENV);
  console.log("[MongoDB] URI exists:", !!uri);
  console.log("[MongoDB] URI starts with:", uri ? uri.substring(0, 25) + "..." : "N/A");

  if (!uri) {
    console.error("[MongoDB] ERROR: Set MONGODB_URI, or MONGODB_USER + MONGODB_PASSWORD + MONGODB_CLUSTER in .env.local");
    throw new Error("Please add your MongoDB URI (or user/password/cluster) to .env.local");
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
