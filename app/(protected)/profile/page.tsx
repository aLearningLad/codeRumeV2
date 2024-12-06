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
import { useEffect, useState } from "react";

const ProfilePage = async () => {
  const [userId, setUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [DBProfile, setDBProfile] = useState();

  // get id from Clerk
  useEffect(() => {
    const getUserId = async () => {
      const { isLoaded, isSignedIn, user } = useUser();
    };
  }, []);

  // get user Info from NEON
  useEffect(() => {}, [userId]);

  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      This needs to be a client component. Fetch data within useEffect, have
      states for loading.
    </div>
  );
};

export default ProfilePage;
