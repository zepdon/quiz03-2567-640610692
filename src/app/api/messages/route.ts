import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { DBtype } from "@lib/types";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const roomId = request.nextUrl.searchParams.get("roomId");
  if (!roomId) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ID not found`,
      },
      { status: 404 }
    );
  }
  readDB();
  if (roomId ) {
    const roomIdlist = [];
    for (const enroll of (<DBtype>DB).messages) {
      if (enroll.roomId === roomId){
        roomIdlist.push(enroll);
      }
    }
    return NextResponse.json({
      ok: true,
      message: roomIdlist,
    }
  )


};}

export const POST = async (request: NextRequest) => {
  readDB();
  const body = await request.json(); 
  const { roomId, messageText } = body;

  const roomExist = (<DBtype>DB).rooms.some(room => roomId === roomId);
  if (!roomExist) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }

  (<DBtype>DB).messages.push(messageText,roomId);
  const messageId = nanoid();
  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Invalid token",
  //   },
  //   { status: 401 }
  // );

  readDB();

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
