"use server";

import sql from "@/lib/db";

export const fetchUserId = async (userEmail: string) => {
  try {
    const result = await sql(`SELECT user_id FROM all_users WHERE email = $1`, [
      userEmail,
    ]);
    console.log("This is the email: ", userEmail);
    console.log("this is the user email object from the db: ", result);
  } catch (error) {
    console.log("Error fetching user ID: ", error);
  }
};
