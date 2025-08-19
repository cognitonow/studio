
import {onRequest, Request} from "firebase-functions/v2/https";
import {Response} from "express";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import {Pool} from "pg";

// The Admin SDK is initialized in index.ts

const dbPassword = defineSecret("DB_PASSWORD");

// This seeder function is now only for populating data, not creating schema.
// It should only be run once after the initial 'firebase deploy'.
export const seedDatabase = onRequest(
  {secrets: [dbPassword], region: "europe-west1"},
  async (request: Request, response: Response) => {
    if (request.method !== "GET") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    logger.info("Database data seeding process started.");

    try {
      const dbHost = process.env.DB_HOST || "127.0.0.1";
      logger.info(`Connecting to database host: ${dbHost}`);

      const pool = new Pool({
        user: "postgres",
        password: dbPassword.value(),
        host: dbHost,
        database: "postgres",
        ssl: {
          rejectUnauthorized: false,
        },
      });
      
      const client = await pool.connect();
      try {
        // NOTE: The table creation is now handled by Data Connect.
        // This function will now only insert data.
        // We will add INSERT statements here in a future step.
        // For now, it just connects to verify the credentials.
        
        logger.info("Database connection successful. Data seeding will be implemented next.");
        response.status(200).send("Database connection successful. Seeding logic to be added.");

      } catch (e) {
        throw e;
      } finally {
        client.release();
      }
    } catch (error) {
      logger.error("Error connecting to or seeding database:", error);
      response.status(500).send("Failed to connect to or seed database.");
    }
  },
);
