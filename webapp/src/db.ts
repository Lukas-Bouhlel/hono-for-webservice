import { connect } from "mongoose";
import env from "../../webapp/env";

// or any ORM and connection string/method according to your database

const CONNECTION_STRING = `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PWD}@${env.MONGO_CLUSTER}/${env.MONGO_DATABASE}`;
// const CONNECTION_STRING = "mongodb+srv://remiYnov:IhdOUbaRVNCpYGKh@cluster0.l5wh2xj.mongodb.net/first-db"

export async function DbConnect() {
  try {
    const _db = await connect(CONNECTION_STRING);
    console.log(`🟢 connected to Atlas Cluster: ${env.MONGO_CLUSTER}`);
    return _db;
  }
  catch (e) {
    console.warn(e);
    return e;
  }
}
