import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("Estately");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      userRole: {
        type: "string",
        required: true,
        defaultValue: "tenant",
        input: true,
      },
      plan: {
        type: "string",
        required: true,
        defaultValue: "free",
        input: true,
      },
    },
  },
  plugins: [admin()],
});
