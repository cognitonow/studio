
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

// Initialize the Admin SDK within this file to ensure it's always available.
// This is safe to call multiple times in different function files.
if (admin.apps.length === 0) {
  admin.initializeApp();
  logger.info("Firebase Admin SDK initialized in list-users.ts");
}


/**
 * A callable Cloud Function to securely list all users from Firebase Auth.
 */
export const listUsers = onCall({ region: "europe-west1" }, async (request) => {
  // For production, you would want to add a check here to ensure only
  // authenticated admins can call this function.
  // if (!request.auth || !request.auth.token.admin) {
  //   logger.warn("listUsers call rejected due to missing admin privileges.");
  //   throw new HttpsError(
  //     "permission-denied",
  //     "You must be an admin to list users."
  //   );
  // }

  logger.info("listUsers function invoked by a client.");

  try {
    logger.info("Attempting to call admin.auth().listUsers()...");
    const listUsersResult = await admin.auth().listUsers(1000); // Max 1000 users per page
    logger.info("Successfully received response from admin.auth().listUsers().");
    
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

    logger.info(`Successfully fetched and mapped ${users.length} users.`);
    return users;
  } catch (error: any) {
    logger.error("Error listing users:", {
        errorMessage: error.message,
        errorCode: error.code,
        stack: error.stack,
    });
    // Throwing an HttpsError will send a structured error to the client.
    throw new HttpsError(
        "internal", 
        "An unexpected error occurred while trying to list users.",
        error.message // Send back the underlying error message for better debugging
    );
  }
});
