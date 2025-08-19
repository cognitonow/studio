
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

// The Admin SDK is initialized in index.ts

/**
 * A callable Cloud Function to securely list all users from Firebase Auth.
 */
export const listUsers = onCall(async (request) => {
  // For production, you would want to add a check here to ensure only
  // authenticated admins can call this function.
  // if (!request.auth || !request.auth.token.admin) {
  //   throw new HttpsError(
  //     "permission-denied",
  //     "You must be an admin to list users."
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
    throw new HttpsError(
        "internal", 
        "An unexpected error occurred while trying to list users.",
        error
    );
  }
});
