

export async function GET() {

  return Response.json({message: "Hello World"});
}
// import NextAuth, { NextAuthOptions } from "next-auth";
  // import GoogleProvider from "next-auth/providers/google";
  // declare module "next-auth" {
  //   interface Session {
  //     accessToken?: string;
  //   }
  
  //   interface JWT {
  //     accessToken?: string;
  //   }
  // }
  // // Define the authentication options
  // export const authOptions: NextAuthOptions = {
  //   providers: [
  //     GoogleProvider({
  //       clientId: process.env.GOOGLE_CLIENT_ID as string,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //     }),
  //   ],
  //   callbacks: {
  //     async session({ session, token }) {
  //       // Explicitly type session and token
  //       session.accessToken = token.accessToken as string | undefined;
  //       console.log(session);
  //       return session;
  //     },
  //     async jwt({ token, account }) {
  //       // Persist the access_token in the token object
  //       if (account) {
  //         token.accessToken = account.access_token as string | undefined;
  //       }
  //       return token;
  //     },
  //   },
  // };

  // // Export the NextAuth handler
  // const handler = NextAuth(authOptions);
  // export { handler as GET, handler as POST };