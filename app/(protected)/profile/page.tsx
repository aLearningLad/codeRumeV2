"use client";

import ProfileNav from "@/app/components/forProfile/ProfileNav";
import RegisterUserToDb from "@/app/components/forProfile/RegisterUserToDb";
import sql from "@/lib/db";
import client from "@/lib/db";
import { UserProfile, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
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
import DeleteNumberBtn from "@/app/components/forProfile/DeleteNumberBtn";
import EditProfileBtn from "@/app/components/forProfile/EditProfileBtn";
import ProfileCollabBtn from "@/app/components/forProfile/ProfileCollabBtn";
import CollabAdd from "@/app/components/forProfile/CollabAdd";
import ProfileSignOut from "@/app/components/forProfile/ProfileSignOut";
import { ChangeEvent, useEffect, useState } from "react";
import { GetCollaborators, GetUserInDB } from "@/app/actions";
import { IoTrashBin } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";

const ProfilePage = () => {
  // const [userId, setUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [DBProfile, setDBProfile] = useState();
  const { isLoaded, isSignedIn, user } = useUser();
  const [userDbData, setUserDbData] = useState<any>([]); //declare a type for this!!!
  const [collabsList, setCollabsList] = useState<Tcollaborator[]>([]);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>("");
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  // get user ID from clerk
  const userId = user?.id;

  // get user Info from NEON
  useEffect(() => {
    // getNeonData();
    const fetchUserData = async () => {
      try {
        const userData: any = await GetUserInDB(userId as string);
        setUserDbData(userData);
      } catch (error) {
        console.log("Error on the client while fetching userData: ", error);
      }
    };

    fetchUserData();
  }, [userId, fetchAgain]);

  // get collabs list for this user
  useEffect(() => {
    const fetchCollabsList = async () => {
      try {
        const collabsData: any = await GetCollaborators(userId as string);

        setCollabsList(collabsData);
      } catch (error) {
        console.log("Error while fetching collaborators: ", error);
      }
    };
  }, []);

  // declare user image from google account
  const userImg = user?.imageUrl;

  while (!isLoaded) {
    return (
      <div className=" w-full h-screen flex justify-center items-center text-2xl lg:text-xl ">
        Just a second while codeRume sets everything up . . .
      </div>
    );
  }

  if (isSignedIn) {
    if (userDbData.length < 1 || !userDbData) {
      return (
        <div className=" min-h-screen w-full bg-slate-950 flex justify-center items-center text-white flex-col p-2 sm:p-3 md:p-4 lg:p-5 ">
          <>
            <h1
              className={` text-2xl ${
                isNameEdit ? "hidden" : "flex"
              } font-semibold mb-4 `}
            >
              Welcome to codeRume!
            </h1>
            <h1
              className={` text-xl ${
                isNameEdit ? "hidden" : "flex text-center"
              } mb-2 `}
            >
              It seems codeRume has not captured your details yet
            </h1>

            <h3 className={` ${isNameEdit ? "hidden" : "flex text-center"} `}>
              We will keep it simple for now. The most important thing is to
              attach a display name for your profile.
            </h3>
          </>

          {isNameEdit ? (
            // to change to display name
            <div
              className={`${
                isNameEdit &&
                "flex w-full flex-col items-center justify-center "
              }`}
            >
              <span
                className={`${
                  isNameEdit &&
                  "flex w-full flex-col items-center justify-center"
                }`}
              >
                <label htmlFor="">Enter your display name</label>
                <input
                  name="editedName"
                  value={editedName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditedName(e.target.value)
                  }
                  type="text"
                  className=" bg-slate-500/40 w-full focus:scale-95 transition-all duration-300 ease-in-out sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mt-2 md:mt-3 rounded-md text-neutral-200 text-[14px] px-2 h-16 md:h-14 "
                  placeholder="Eg. codeSavant101"
                />
              </span>

              <RegisterUserToDb
                display_name={editedName}
                email={user.emailAddresses[0].emailAddress}
                user_id={user.id}
                isNameEdit={isNameEdit}
                setIsNameEdit={setIsNameEdit}
                setFetchAgain={setFetchAgain}
              />
            </div>
          ) : (
            // keep name from Google profile and just register
            <div className="w-full h-60 flex flex-col items-center justify-center gap-5">
              {" "}
              {/* if google acc has a username, use it. If not, allow manual entry */}
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
          )}

          <button
            className={`${
              isNameEdit
                ? "hidden"
                : "flex w-full py-1 text-center justify-center items-center hover:scale-95 transition-all duration-300 ease-in-out border-2 border-white hover:bg-transparent hover:text-white sm:w-10/12 md:w-8/12 lg:w-fit lg:px-4 h-14 rounded-md bg-white text-black text-lg"
            }`}
            onClick={() => setIsNameEdit(true)}
          >
            <IoTrashBin color="red" className=" mr-1" />
            No, edit my display name
          </button>
        </div>
      );
    } else {
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

            <ProfileSignOut />
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
                <EditProfileBtn />
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
                        This action is currently reserved for a selected group
                        of users running the beta program. After launch, premium
                        features such as LLM-based tutoring, multiple accounts,
                        and profile changes will be available to the general
                        public for subscription.
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
                {userDbData && userDbData[0].phone_number ? (
                  <div className=" flex h-12 gap-2 group items-center border-[3px] border-slate-500/10 rounded-md px-4 py-1">
                    <span>{userDbData[0].phone_number}</span>
                    <DeleteNumberBtn userId={user?.id as string} />
                  </div>
                ) : (
                  <>
                    {user?.phoneNumbers && user?.phoneNumbers.length > 0 ? (
                      user?.phoneNumbers.map((eachNumber) => (
                        <div key={eachNumber.id} className="">
                          {eachNumber.phoneNumber}
                        </div>
                      ))
                    ) : (
                      <ProfileNewPhoneNumber userId={user?.id as string} />
                    )}
                  </>
                )}
              </div>
            </section>

            {/* the pits */}
            <section className=" w-full flex lg:flex-row flex-col items-center justify-around lg:h-fit h-[20vh] ">
              <div className="lg:w-3/12 w-full flex items-center  gap-2">
                <p className=" text-xl lg:text-[14px] ">Collaborators</p>
                <FaLayerGroup />
              </div>

              <div className=" w-full h-full lg:w-9/12 flex gap-3 items-center justify-start">
                <span className=" h-full w-full sm:w-[95%] md:w-[90%] lg:w-[85%] bg-slate-500/30 p-2 rounded-md md:rounded-lg">
                  {collabsList && collabsList.length > 0 ? (
                    <div className=" w-full h-full flex overflow-auto gap-4 p-2 items-center">
                      {collabsList.map((card) => (
                        <div className=" w-fit h-full lg:h-[80%] px-3 flex items-center bg-slate-500 text-white rounded-md ">
                          {card.email}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" w-full h-full flex justify-center items-center text-center">
                      You don't currently have any collabs
                    </div>
                  )}
                </span>
              </div>
              <div className=" w-full md:w-8/12 lg:w-1/2 ">
                <label htmlFor="" className=" text-lg lg:text-[14px] ">
                  Register a collaborator
                </label>
                <CollabAdd userId={user?.id as string} />
              </div>
            </section>
          </div>
        </div>
      );
      // return (
      //   <div className=" w-full h-screen flex justify-center items-center ">
      //     You're in the db now!
      //   </div>
      // );
    }
  }
};

export default ProfilePage;
