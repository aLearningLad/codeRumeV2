import ProfileNav from "@/app/components/forProfile/ProfileNav";
import RegisterUserToDb from "@/app/components/forProfile/RegisterUserToDb";
import sql from "@/lib/db";
import client from "@/lib/db";
import { UserProfile } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const ProfilePage = async () => {
  //   // get user from clerk
  const user = await currentUser();
  const userImg = user?.imageUrl;

  // console.log("This is the user object from clerk: ", user);

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
      <div className=" lg:flex hidden px-2 md:px-5 py-5 items-center justify-start relative flex-col lg:w-2/12 bg-slate-500/10 rounded-lg ">
        <section className=" w-full flex flex-col text-start mb-12 border-b-2 pb-2 border-slate-500/40 ">
          <h1 className=" text-2xl font-semibold">Account</h1>
          <h3 className=" text-[14px] text-neutral-300">
            Manage your account info
          </h3>
        </section>

        <ProfileNav />

        <button className=" w-[90%] absolute hover:scale-95 transition-all rounded-md bottom-3 ease-in-out flex h-12 text-[14px] justify-center items-center bg-white text-slate-950 ">
          Sign Out
        </button>
      </div>

      {/* right side  */}
      <div className=" w-full lg:w-10/12 bg-slate-500/10 rounded-lg flex flex-col p-5">
        <header className=" w-full text-start text-xl  border-b-2 border-slate-500/40 mb-12">
          Profile details
        </header>
        {/* top */}
        <section className=" h-[15vh] w-full flex border-b-2 border-slate-500/30 mb-4  ">
          <div className=" w-full lg:w-3/12 h-full flex justify-start items-center text-[14px]">
            Profile
          </div>
          <div className=" w-full lg:w-5/12 h-full flex justify-start items-center gap-7">
            <Image
              width={80}
              height={80}
              src={(userImg as string) || "/assets/crlogo.png"}
              alt="user profile image"
              className=" rounded-full overflow-clip "
            />
            <p className=" text-xl lg:text-[14px] ">{user?.fullName}</p>
          </div>
          <div className=" w-full lg:w-4/12 h-full flex justify-start items-center text-[14px]">
            Edit Profile
          </div>
        </section>
        {/* middle  */}
        <section className=" w-full flex h-[35vh] border-b-2 border-slate-500/20  ">
          <div className=" lg:w-3/12 w-full h-full">Email addresses</div>
          <div className=" lg:w-9/12 w-full flex flex-col items-start h-full ">
            {user?.emailAddresses.map((anEmail, index) => (
              <span
                key={anEmail.id}
                className=" flex items-center justify-center gap-1"
              >
                {anEmail.emailAddress}
                {index === 0 && (
                  <p className=" text-[10px] text-neutral-400 font-light ">
                    Primary
                  </p>
                )}
                <div className=" w-[4px] h-[4px] rounded-full bg-green-400 " />
              </span>
            ))}
            <button className="flex gap-2 items-center justify-center mt-5 px-8 h-8 bg-slate-500/20 rounded-md ">
              <FaPlus size={12} className=" text-white " />
              <p className=" text-[12px] ">Add an email address</p>
            </button>
          </div>
        </section>

        {/* bottom */}
      </div>
    </div>
  );

  // return (
  //   <div className=" w-full h-screen bg-slate-950 flex justify-center items-center ">
  //     <UserProfile />
  //   </div>
  // );
};

export default ProfilePage;
