import {
  FaBookOpenReader,
  FaClipboardList,
  FaBookMedical,
} from "react-icons/fa6";
import { TfiMoreAlt } from "react-icons/tfi";
import { MdMore } from "react-icons/md";
import { nanoid } from "nanoid";

// 1. open a room
// 2. prepare collaborator list
// 3. learning resources list (tuts: codecademy, freecodecamp, Ruby, SQL, typescript, C#, C++, java, python)
// 4. more ---> about this app,
//         ---> about developer(link to portfolio),
//         ---> github code,
//         ---> neon DB,
//         ---> vercel,
//         ---> react,
//         ---> npm,

export const newsquares: Tnewsquares[] = [
  {
    squareId: "dED78kdLnJ",
    squareTitle: "Open a codeRume",
    squareBlurb: "Start a new collaborative coding session",
    squareHoverPrompt: "Start Now",
    squareIcon: <FaBookOpenReader size={50} className=" text-cyan-400 " />,
    squarehref: `/collabroom/${nanoid()}`,
  },
  {
    squareId: "okJ92Hbs",
    squareTitle: "Curate Collaborator's List",
    squareBlurb: "Carefully manage your list of collaborators",
    squareHoverPrompt: "Open",
    squareIcon: <FaClipboardList size={50} color="orange" />,
  },
  {
    squareId: "ioOdn82bNW8d",
    squareTitle: "Learning Resources",
    squareBlurb: "Suggestions for additional learning resources",
    squareHoverPrompt: "See all",
    squareIcon: <FaBookMedical size={50} color="pink" />,
    squarehref: "/https://www.codecademy.com/articles",
  },
  {
    squareId: "jd7777181",
    squareTitle: "More",
    squareBlurb: "About this app, the developer, source code, and more.", //link to portfolio
    squareHoverPrompt: "See learning resources",
    squareIcon: <MdMore size={50} color="yellow" />,
    squarehref: "#", // link to profile
  },
];
