import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const ProfilePage = async () => {
  // immediately fetch user data from db, or send it if N/A
  //   await client.connect();

  // get clerkId for serverside
  const user = await currentUser();
  try {
    if (!user?.id) {
      console.log("User is not defined or does not have an ID");
      return;
    }

    const dbQueryResult = await client.query(
      `SELECT * FROM all_users WHERE user_id = $1`,
      [user?.id]
    );

    console.log(dbQueryResult);
  } catch (error) {
    console.log("Error while fetching user from DB: ", error);
  }

  // view if user not found in db

  // view if user found in db
  return (
    <div className=" min-h-screen w-full bg-slate-950 flex justify-center items-center text-white flex-col ">
      <h1>It seems you're not in the db yet</h1>

      <h3>We need to attach a display name for your profile.</h3>

      {user?.fullName && user.fullName.length > 2 ? (
        <>Is this your name: {user.fullName}</>
      ) : (
        <>Let me add my display name now</>
      )}
    </div>
  );
};

export default ProfilePage;
