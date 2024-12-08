"use server";

import sql from "@/lib/db";

// fetch user data
export async function GetUserInDB(userId: string) {
  try {
    const res = await sql(`SELECT * FROM all_users WHERE user_id = $1`, [
      userId,
    ]);
    console.log("This is the user data from DB: ", res);
    return res;
  } catch (error) {
    console.log("Error fetching user from Neon: ", error);
  }
}

// fetch collaborators
export async function GetCollaborators(userId: string) {
  try {
    const result = await sql(
      `SELECT * FROM all_collaborators WHERE friend_id = $1`,
      [userId]
    );
    console.log("This is the list of collaborators for the user: ", result);
  } catch (error) {
    console.log("Error fetching list of collaborators from Neon: ", error);
  }
}
