"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInButton = () => {
  const { data: session } = useSession(); // Access session data

  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" }); // Redirect after sign-in
  };

  useEffect(() => {
    if (session) {
      // Access the token from the session
      const accessToken = session.accessToken;
      console.log("Access Token:", accessToken);

      // Perform actions with the token
      // Example: fetch user-related data from an external API
    }
  }, [session]);

  return (
    <button className="mt-40 p-4 bg-white" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default SignInButton;
