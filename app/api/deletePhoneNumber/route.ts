import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    console.log("The userId value wasn't sent from the client");
    return NextResponse.json({
      message: "Please ensure the userId is provided on the client side",
    });
  }

  try {
    await sql(`UPDATE all_users SET phone_number = NULL WHERE user_id = $1`, [
      userId,
    ]);

    return NextResponse.json({
      message: "Phone number removed successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Unable to delete: ", error);
    return NextResponse.json({
      message: "Phone number not removed",
    });
  }
}
