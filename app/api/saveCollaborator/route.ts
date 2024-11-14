import { NextResponse, NextRequest } from "next/server";
import sql from "@/lib/db";

export async function POST(request: NextRequest) {
  const { unique_id, userId, email } = await request.json();

  if (!userId || !email) {
    console.log("Some collaborator data is missing");
    return NextResponse.json({
      message: "Some collaborator data is missing",
    });
  }

  try {
    await sql(
      `INSERT INTO all_collaborators (unique_id, friend_id, email) VALUES ($1, $2, $3)`,
      [unique_id, userId, email]
    );

    return NextResponse.json({
      message: "Collaborator saved successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Error saving collaborator to DB: ", error);
    return NextResponse.json({
      message: "Collaborator not saved. See logged error message",
    });
  }
}
