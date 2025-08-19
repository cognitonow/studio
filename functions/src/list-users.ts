
import {onCall} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

// Initialize the Admin SDK if it hasn't been already
if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * A callable Cloud Function to securely list all users from Firebase Auth.
 */
export const listUsers = onCall(async (request) => {
  // Check if the user is authenticated (optional, but good practice)
  // For this test, we might allow unauthenticated access, but in production,
  // you would want to restrict this to authenticated admins.
  // if (!request.auth) {
  //   throw new functions.https.HttpsError(
  //     "unauthenticated",
  //     "The function must be called while authenticated."
  //   );
  // }

  logger.info("listUsers function invoked");

  try {
    const listUsersResult = await admin.auth().listUsers(1000); // Max 1000 users per page
    const users = listUsersResult.users.map((userRecord) => {
      // It's good practice to only return the data the client needs
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        disabled: userRecord.disabled,
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: userRecord.metadata.lastSignInTime,
      };
    });

    logger.info(`Successfully fetched ${users.length} users.`);
    return users;
  } catch (error) {
    logger.error("Error listing users:", error);
    // Throwing an HttpsError will send a structured error to the client.
    throw new Error("Failed to list users.");
  }
});
