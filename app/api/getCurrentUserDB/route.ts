import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // retrieve userId from client
  const { userId } = await req.json();

  if (!userId) {
    console.log(
      "No userId value is found on the backend. Please check client-side API call"
    );
    return NextResponse.json({
      message:
        "No userId value is found on the backend. Please check client-side API call",
    });
  }

  try {
    const res = await sql(`SELECT * FROM all_users WHERE user_id = $1`, [
      userId,
    ]);

    console.log("User found!");

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("Error fetching this user's data from NeonDB: ", error);
    return NextResponse.json({
      status: 400,
      message: "This user's data was not returned from NeonD",
    });
  }
}
