import RegisterUserToDb from "@/app/components/forProfile/RegisterUserToDb";
import sql from "@/lib/db";
import client from "@/lib/db";
import { UserProfile } from "@clerk/nextjs";
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
    <div className=" min-h-screen w-full flex bg-slate-900 text-white gap-3 p-5 ">
      {/* left side  */}
      <div className=" lg:flex hidden px-2 items-center justify-start relative flex-col lg:w-2/12 bg-slate-500/50 rounded-md ">
        <button className=" w-[90%] absolute rounded-md bottom-3 hover:bg-transparent ease-in-out flex h-12 text-[14px] justify-center items-center bg-slate-950 text-white ">
          Sign Out
        </button>
      </div>

      {/* right side  */}
      <div className=" w-full lg:w-10/12 "></div>
    </div>
  );

  // return (
  //   <div className=" w-full h-screen bg-slate-950 flex justify-center items-center ">
  //     <UserProfile />
  //   </div>
  // );
};

export default ProfilePage;
