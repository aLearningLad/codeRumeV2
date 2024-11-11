import sql from "@/lib/db";
import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// issues likely arise from here
// const fetchUserData = async () => {
//   // get user from clerk
//   const user = await currentUser();
//   console.log("Here is the user: ", user); // OK!
//   try {
//     await client.query(`SELECT * FROM all_users WHERE user_id = $1`, [
//       user?.id,
//     ]);
//   } catch (error) {
//     console.log("Error fetching data from db: ", error);
//   }
// };

// fetchUserData();

const ProfilePage = async () => {
  //   // get user from clerk
  const user = await currentUser();

  const result = await sql(`SELECT * FROM all_users WHERE user_id = $1`, [
    user?.id,
  ]);

  console.log("This is the db data: ", result);

  return (
    <div className=" min-h-screen w-full bg-slate-950 flex justify-center items-center text-white flex-col ">
      <h1>It seems you're not in the db yet</h1>

      <h3>We need to attach a display name for your profile.</h3>

      {/* {user?.fullName && user.fullName.length > 2 ? (
        <>Is this your name: {user.fullName}</>
      ) : (
        <>Let me add my display name now</>
      )} */}
    </div>
  );
};

export default ProfilePage;
