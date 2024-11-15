// import { Client } from "@neondatabase/serverless";

// // create my new client instance. Use neon's url for posgresql
// const createClient = () => {
//   return new Client({
//     connectionString: process.env.DATABASE_URL,
//   });
// };

// export default createClient;

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export default sql;
