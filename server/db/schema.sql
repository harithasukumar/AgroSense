import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'agrosense',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.warn('MySQL connection unavailable. Demo mode will be used instead.', error.message);
    return false;
  }
};

export default pool;
