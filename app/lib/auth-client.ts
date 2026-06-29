import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** Use NEXT_PUBLIC_ prefix so the URL is accessible in the browser */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
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
