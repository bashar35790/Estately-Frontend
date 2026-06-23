import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    additionalFields: {
      userRole: {
        type: "string",
      },
      plan: {
        type: "string",
      },
    },
  },
});

export const { signIn, signUp, useSession } = authClient;
