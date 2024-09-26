import jwt from "jsonwebtoken";

import { DB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";
import { DBtype } from "@lib/types";

export const POST = async (request: NextRequest) => {
  
  const body = await request.json();
  const { username, password } = body;
  readDB();

  //you should do the validation here
  const user = (<DBtype>DB).users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }
  
  //if found user, sign a JWT TOKEN
  const secret = process.env.JWT_SECRET || "This is my special secret";

  const token = jwt.sign(
    { username, role: user.role, },
    secret,
    { expiresIn: "8h" }
  );
  return NextResponse.json({ ok: true, token });
};
