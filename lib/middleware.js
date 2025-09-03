import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export const withAuth = (handler) => {
  return async (req, context) => {
    try {
      const authHeader = req.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "No token provided" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];
      const user = verifyToken(token);

      if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      req.user = user;
      return handler(req, context);
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }
  };
};
