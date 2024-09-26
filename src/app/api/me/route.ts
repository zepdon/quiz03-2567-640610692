import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Dome Wick",
    studentId: "660610999",
  });
};
