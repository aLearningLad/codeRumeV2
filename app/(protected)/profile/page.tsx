import ProfileNav from "@/app/components/forProfile/ProfileNav";
import RegisterUserToDb from "@/app/components/forProfile/RegisterUserToDb";
import sql from "@/lib/db";
import client from "@/lib/db";
import { UserProfile } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLayerGroup } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileNewPhoneNumber from "@/app/components/forProfile/ProfileNewPhoneNumber";

const ProfilePage = async () => {
  try {
    //   // get user from clerk
    const user = await currentUser();
    const userImg = user?.imageUrl;

    // check that user is not in db
    const result = await sql(`SELECT * FROM all_users WHERE user_id = $1`, [
      user?.id,
    ]);

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
      <div className=" h-screen w-full flex bg-slate-900 text-white gap-3 p-5 ">
        {/* left side  */}
        <div className=" lg:flex hidden px-2 md:px-5 py-5 items-center justify-start relative flex-col lg:w-2/12 bg-slate-500/10 rounded-lg ">
          <section className=" w-full flex flex-col text-start mb-12 border-b-2 pb-2 border-slate-500/40 ">
            <h1 className=" text-2xl font-semibold ">Account</h1>
            <h3 className=" text-[14px] text-neutral-300 ">
              Manage your account info
            </h3>
          </section>

          <ProfileNav />

          <button className=" w-[90%] absolute hover:scale-95 transition-all rounded-md bottom-3 ease-in-out flex h-12 text-[14px] justify-center items-center bg-white text-slate-950 ">
            Sign Out
          </button>
        </div>

        {/* right side  */}
        <div className=" w-full lg:w-10/12 bg-slate-500/10 rounded-lg flex flex-col p-5 overflow-auto ">
          <header className=" w-full text-start text-xl  border-b-2 border-slate-500/40 mb-12">
            Profile details
          </header>
          {/* top */}
          <section className=" py-12 lg:py-0 lg:h-[15vh] w-full flex flex-col lg:flex-row border-b-2 border-slate-500/30 mb-4 gap-6 lg:gap-0  ">
            <div className=" w-full lg:w-3/12 h-full flex justify-start items-center text-2xl sm:text-xl md:text-lg lg:text-[14px]">
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
              <button className=" h-20 lg:h-10 w-full sm:w-10/12 md:w-8/12 lg:w-fit hover:scale-95 px-12 bg-slate-500/20 group hover:bg-white hover:text-black transition-all duration-300 ease-in-out rounded-md flex justify-center items-center gap-1 ">
                <IoSettingsSharp
                  size={20}
                  className=" text-white group-hover:text-black "
                />
                Edit Profile
              </button>
            </div>
          </section>

          {/* middle  */}
          <section className=" w-full flex flex-col lg:flex-row lg:py-0 py-12 lg:h-[25vh] border-b-2 border-slate-500/20 mb-4 ">
            <div className=" lg:w-3/12 w-full h-full items-start flex gap-2 ">
              <div className="flex items-center gap-2 ">
                <p className="text-xl lg:text-[14px] ">Email addresses</p>
                <IoMdMailUnread size={12} className=" text-white " />
              </div>
            </div>
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

              {/* dialog to add more emails */}
              <Dialog>
                <DialogTrigger>
                  <div className="flex w-full h-20 lg:h-10 sm:w-10/12 md:w-8/12 lg:w-fit hover:scale-95 transition-all group duration-300 ease-in-out hover:bg-white hover:text-black gap-2 items-center justify-center mt-5 px-8 bg-slate-500/20 rounded-md ">
                    <FaPlus
                      size={12}
                      className=" text-white group-hover:text-black "
                    />
                    <p className=" text-[12px] ">Add backup email address</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-center">
                      Premium Feature
                    </DialogTitle>
                    <DialogDescription className=" text-center text-black ">
                      This action is currently reserved for a selected group of
                      users running the beta program. After launch, premium
                      features will be available to the general public for
                      subscription.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* bottom */}
          <section className=" w-full flex flex-col lg:flex-row h-[25vh] py-4 lg:py-0 border-b-2 border-slate-500/20 mb-4 ">
            <div className=" lg:w-3/12 w-full h-full flex items-start  gap-2 ">
              <div className=" flex items-center gap-2">
                <p className=" text-xl lg:text-[14px] ">Phone numbers</p>
                <BsFillTelephoneFill size={12} className=" text-white " />
              </div>
            </div>
            <div className=" lg:w-9/12 w-full flex flex-col items-start h-full ">
              {user?.phoneNumbers && user?.phoneNumbers.length > 0 ? (
                user?.phoneNumbers.map((eachNumber) => (
                  <div key={eachNumber.id} className="">
                    {eachNumber.phoneNumber}
                  </div>
                ))
              ) : (
                <ProfileNewPhoneNumber />
              )}
            </div>
          </section>

          {/* the pits */}
          <section className=" w-full flex lg:flex-row flex-col items-center justify-around lg:h-fit h-[20vh] ">
            <div className="lg:w-3/12 w-full flex items-center  gap-2">
              <p className=" text-xl lg:text-[14px] ">Collaborators</p>
              <FaLayerGroup />
            </div>

            <div className=" w-full lg:w-9/12 flex gap-3 items-center justify-start">
              <span>collaborators shown here</span>
            </div>
            <div className=" w-full md:w-8/12 lg:w-1/2 ">
              <label htmlFor="" className=" text-lg lg:text-[14px] ">
                Register a collaborator
              </label>
              <div className=" flex gap-1 ">
                <input
                  className=" w-full focus:scale-95 transition-all duration-300 ease-in-out text-lg lg:text-[14px] placeholder:text-[12px] sm:w-10/12 md:w-10/12 lg:w-8/12 h-20 lg:h-12 py-1 rounded-sm outline-none px-2 bg-slate-500/20"
                  type="text"
                  placeholder="Eg. thatCoder@gmail.com"
                />
                <button className=" w-fit h-fit p-3 bg-white rounded-sm text-black">
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error while fetching user from db: ", error);

    return (
      <div className=" w-full h-screen flex justify-center items-center text-white text-xl ">
        Just a minute, we're setting up your user profile
      </div>
    );
  }

  // return (
  //   <div className=" w-full h-screen bg-slate-950 flex justify-center items-center ">
  //     <UserProfile />
  //   </div>
  // );
};

export default ProfilePage;
