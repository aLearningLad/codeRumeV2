import RegisterUserToDb from "@/app/components/forProfile/RegisterUserToDb";
import sql from "@/lib/db";
import client from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const ProfilePage = async () => {
  //   // get user from clerk
  const user = await currentUser();

  // check that user is not in db
  const result = await sql(`SELECT * FROM all_users WHERE user_id = $1`, [
    user?.id,
  ]);

  //   console.log("This is the db data: ", result);

  if (result.length < 1) {
    return (
      <div className=" min-h-screen w-full bg-slate-950 flex justify-center items-center text-white flex-col ">
        <h1>It seems you're not in the db yet</h1>

        <h3>We need to attach a display name for your profile.</h3>

        {user?.fullName && user.fullName.length > 2 ? (
          <RegisterUserToDb
            display_name={user.fullName}
            email={user.emailAddresses[0].emailAddress}
            user_id={user.id}
          />
        ) : (
          <>Let me add my display name now</>
        )}
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full flex justify-center items-center bg-slate-900 text-white ">
      You're registered on the DB!
    </div>
  );
};

export default ProfilePage;
