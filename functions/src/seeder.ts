
import {onRequest, Request} from "firebase-functions/v2/https";
import {Response} from "express";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import {Pool} from "pg";

admin.initializeApp();

// Define a secret for the database password using the v2 API
const dbPassword = defineSecret("DB_PASSWORD");

// Seeder function should only be run in the emulator or a dev environment.
// It is not intended for production use.
export const seedDatabase = onRequest(
  {
    // Make the password available to the function
    secrets: [dbPassword],
    // Increase the timeout as seeding might take a while
    timeoutSeconds: 30,
  },
  async (request: Request, response: Response) => {
    // Basic security check: only allow GET requests
    if (request.method !== "GET") {
      response.status(405).send("Method Not Allowed");
      return;
    }

    // In a real production app, you would add more robust security,
    // e.g., checking for a specific auth token or IP address.
    logger.info("Database seeding process started.");

    try {
      const pool = new Pool({
        user: "postgres",
        password: dbPassword.value(),
        // The host is the full Cloud SQL connection name.
        host: process.env.DB_HOST,
        database: "postgres",
        // Use SSL for secure connections to Cloud SQL
        ssl: {
          rejectUnauthorized: false,
        },
      });

      // The SQL file is now located within the function's source directory
      const seedSqlPath = path.join(__dirname, "seed.sql");
      const seedSql = fs.readFileSync(seedSqlPath, "utf8");

      // Split the file into individual statements
      const statements = seedSql.split(";").filter((s) => s.trim().length > 0);

      const client = await pool.connect();
      try {
        await client.query("BEGIN"); // Start transaction
        for (const statement of statements) {
          logger.info("Executing statement:", statement);
          await client.query(statement);
        }
        await client.query("COMMIT"); // Commit transaction
        logger.info("Database seeding completed successfully.");
        response.status(200).send("Database seeded successfully!");
      } catch (e) {
        await client.query("ROLLBACK"); // Rollback on error
        throw e; // Re-throw the error to be caught by the outer catch block
      } finally {
        client.release();
      }
    } catch (error) {
      logger.error("Error seeding database:", error);
      response.status(500).send("Failed to seed database.");
    }
  },
);
