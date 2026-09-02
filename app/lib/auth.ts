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

  baseURL: process.env.BETTER_AUTH_URL as string,

  advanced: {
    cookiePrefix: "estately",
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "google"],
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

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
