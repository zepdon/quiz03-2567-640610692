import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { DBtype, Payload } from "@lib/types";
import { read } from "fs";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  // readDB();
  let filtered = (<DBtype>DB).rooms;
  return NextResponse.json({
    ok: true,
    rooms: filtered,
    totalRooms:filtered.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  const { role } = <Payload>payload;

  const body = await request.json();
  const { roomName } = body;
  readDB();
  (<DBtype>DB).rooms.push({
    roomId: nanoid(),
    roomName: roomName,
  })
  //call writeDB after modifying Database
  writeDB();
  
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    const roomId = nanoid();
    return NextResponse.json(
      {
        ok:true,
        roomId: roomId,
        message: `Room ${"Spoil One Piece"} has been created`,
      }
    )
  }
  
  const foundRoom = (<DBtype>DB).rooms.find(
    (x) => x.roomName === roomName
  );
  if (foundRoom) {
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${"replace this with room name"} already exists`,
    },
    { status: 400 }
  );


}};
