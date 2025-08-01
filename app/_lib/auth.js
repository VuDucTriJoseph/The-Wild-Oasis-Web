import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  provider: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const {
  auth,
  handlers: { POST, GET },
  signIn,
  signOut,
} = NextAuth({
  provider: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
