import { NextResponse, NextRequest } from "next/server";
import sql from "@/lib/db";

export async function POST(request: NextRequest) {
  const { unique_id } = await request.json();

  if (!unique_id) {
    console.log("Unique ID is missing!");
    return NextResponse.json({
      message: "Unique ID is missing",
    });
  }

  try {
    await sql(`DELETE FROM all_collaborators WHERE unique_id = $1`, [
      unique_id,
    ]);

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
