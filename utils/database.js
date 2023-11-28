import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let pool;

export async function connect() {
  let cString =
    "mysql://" +
    process.env.MYSQL_USER +
    ":" +
    process.env.MYSQL_PASSWORD +
    "@" +
    process.env.MYSQL_HOST +
    ":" +
    process.env.MYSQL_PORT +
    "/" +
    process.env.MYSQL_DATABASE;
  pool = mysql
    .createPool(
      // cString  //digital ocean sql server
      {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      }
    )
    .promise();
}

export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}
