import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "todo";

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  return await SQLite.openDatabaseAsync(DATABASE_NAME);
};

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    console.log("Getting database");
    if (!db) {
      console.log("Initializing database");
      db = await initDB();
    }
    return db;
  } catch (error) {
    console.error("Error getting database:", error);
    throw error;
  }
};
