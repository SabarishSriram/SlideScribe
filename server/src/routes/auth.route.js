import express from "express";
import { ExpressAuth } from "@auth/express";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "@auth/express/providers/github";
import { prisma } from "../config/prisma.js"; // Make sure this file has .js extension

export async function loadAuth() {
  
  const app = express();

  app.set("trust proxy", true);

  app.use(
    "/auth/*",
    ExpressAuth({
      adapter: PrismaAdapter(prisma),
      providers: [GitHub],
    })
  );

  console.log("Auth.js setup completed.");
}

loadAuth().catch(console.error);
