import {
  FaBookOpenReader,
  FaClipboardList,
  FaBookMedical,
} from "react-icons/fa6";
import { TfiMoreAlt } from "react-icons/tfi";

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
    squareIcon: <FaBookOpenReader />,
  },
  {
    squareId: "okJ92Hbs",
    squareTitle: "Curate Collaborator's List",
    squareBlurb: "Carefully manage your list of collaborators",
    squareHoverPrompt: "Open",
    squareIcon: <FaClipboardList />,
  },
  {
    squareId: "ioOdn82bNW8d",
    squareTitle: "Learning Resources",
    squareBlurb: "Suggestions for additional learning resources",
    squareHoverPrompt: "See all",
    squareIcon: <FaBookMedical />,
  },
  {
    squareId: "jd7777181",
    squareTitle: ". . . More",
    squareBlurb: "Start a new collaborative coding session",
    squareHoverPrompt: "See learning resources",
    squareIcon: <TfiMoreAlt />,
  },
];
