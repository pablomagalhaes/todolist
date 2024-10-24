import type { Metadata } from "next";
import localFont from "next/font/local";

import { ApolloWrapper } from "./ApolloWrapper"; // ApolloWrapper
import { ToDoProvider } from "../context/ToDoContext"; // Importe o ToDoProvider

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ToDoProvider>
            {children}
          </ToDoProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
