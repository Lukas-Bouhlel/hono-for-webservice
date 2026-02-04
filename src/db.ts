import dns from "node:dns";

import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");

// const CONNECTION_STRING = "mongodb+srv://joe:Citron@cluster0.oaeby.mongodb.net/?appName=Cluster0";
const CONNECTION_STRING = "mongodb+srv://joe:Citron@cluster0.oaeby.mongodb.net/sample_mflix?appName=Cluster0";

export async function DbConnect() {
  try {
    console.log("⏳ Tentative de connexion directe (bypass SRV)...");

    await mongoose.connect(CONNECTION_STRING, {
      tls: true,
      retryWrites: true,
    });

    console.log("🟢 SUCCÈS : Connecté à MongoDB Atlas !");
  }
  catch (e) {
    console.error("🔴 Échec de la connexion :");
    console.error((e as Error).message);
  }
}
