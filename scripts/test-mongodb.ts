import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local manually
config({ path: resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not set in .env.local");
  process.exit(1);
}

console.log("🔍 Testing MongoDB connection...");
console.log("📋 URI (first 50 chars):", uri.substring(0, 50) + "...");

// Extract username and cluster for verification
try {
  const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)/);
  if (match) {
    console.log("👤 Username:", match[1]);
    console.log("🌐 Cluster:", match[3]);
    console.log("🔑 Password length:", match[2].length, "characters");
  }
} catch (e) {
  console.error("⚠️ Could not parse URI");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function testConnection() {
  try {
    console.log("\n🔄 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected successfully!");
    
    console.log("\n🔄 Testing ping...");
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping successful!");
    
    console.log("\n🔄 Testing database access...");
    const db = client.db("instagram_grid_planner");
    const collections = await db.listCollections().toArray();
    console.log("✅ Database accessible!");
    console.log("📁 Collections:", collections.length > 0 ? collections.map(c => c.name).join(", ") : "none");
    
    console.log("\n✅ All tests passed! Your MongoDB connection is working correctly.");
  } catch (error: any) {
    console.error("\n❌ Connection failed!");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error name:", error.name);
    
    if (error.message.includes("bad auth")) {
      console.error("\n💡 Troubleshooting:");
      console.error("1. Verify the username and password in MongoDB Atlas → Database Access");
      console.error("2. Make sure the password is URL-encoded in the connection string");
      console.error("3. Try resetting the password in MongoDB Atlas");
      console.error("4. Check that Network Access allows your IP address");
    }
  } finally {
    await client.close();
    console.log("\n🔌 Connection closed");
    process.exit(0);
  }
}

testConnection();
