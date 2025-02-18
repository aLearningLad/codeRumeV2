import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { display_name, email, user_id } = await request.json();

  if (!display_name || !email || !user_id) {
    console.log("Here is the name value: ", display_name);
    console.log("Values are missing, bruv");
    return NextResponse.json({
      message: "Please ensure all values are sent from the client!",
    });
  }
  try {
    await sql(
      `INSERT INTO all_users (user_id, email, display_name) VALUES ($1, $2, $3)`,
      [user_id, email, display_name]
    );

    return NextResponse.json({
      message: "values uploaded successfully!",
      status: 200,
    });
  } catch (error) {
    console.log("Error sending user data to DB: ", error);
    return NextResponse.json({ message: "Details not saved to DB" });
  }
}
