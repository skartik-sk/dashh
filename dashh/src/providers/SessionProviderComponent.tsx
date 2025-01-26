// app/providers/SessionProviderComponent.tsx
"use client"; // This line makes this component a Client Component

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session: any; // Adjust type as needed based on your session structure
}

const SessionProviderComponent = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderComponent;
