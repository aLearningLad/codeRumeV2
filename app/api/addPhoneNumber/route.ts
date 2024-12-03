import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  const { phoneNumber, userId } = await req.json();

  if (!phoneNumber) {
    console.log("Phone number is missing");
    return NextResponse.json({
      message: "Please ensure phone number value is provided by the client",
    });
  }

  try {
    await sql(`UPDATE all_users SET phone_number = $1 WHERE user_id = $2`, [
      phoneNumber,
      userId,
    ]);

    return NextResponse.json({
      message: "Phone number saved successfully!",
      status: 201,
    });
  } catch (error) {
    console.log("Error updating phone number: ", error);
    return NextResponse.json({ message: "Phone number not updated" });
  }
}
