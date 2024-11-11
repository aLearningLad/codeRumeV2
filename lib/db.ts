import { Client } from "@neondatabase/serverless";

// create my new client instance. Use neon's url for posgresql
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default client;
