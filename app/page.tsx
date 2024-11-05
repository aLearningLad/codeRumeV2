import Link from "next/link";
import { randomUUID } from "crypto";

export default function Home() {
  const randomId = randomUUID();
  return (
    <main className=" min-h-screen w-full bg-slate-900 text-white flex justify-center items-center ">
      <Link
        className=" bg-white text-black h-16 w-3/12 rounded-md flex justify-center items-center"
        href={`/collabroom/${randomId}`}
      >
        Create & enter random codeRume
      </Link>
    </main>
  );
}
