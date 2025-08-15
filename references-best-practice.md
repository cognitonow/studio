# References & Best Practices

This document outlines the key coding patterns, architectural decisions, and debugging best practices we have established for this project. Following these guidelines will help ensure our code remains clean, consistent, and functional.

## 1. Core Principle: Full-Circle Communication

Whenever an action is performed by one user that affects another (e.g., booking, cancellation, update), the system must notify **all** relevant parties.

- **Dual Notification System:** For every key event, we must trigger:
    1.  A **Push Notification** (`addNotification`) for immediate, high-visibility alerts.
    2.  An **AI-Generated Message** (`sendAutomatedMessage`) to provide context directly within the relevant chat conversation.

- **Centralized Triggers:** All notifications and AI messages should be triggered from within the core data-updating functions in `src/lib/data.ts` (e.g., `updateBookingStatus`, `addBooking`, `updateBooking`). This creates a single source of truth and prevents logic from being scattered across UI components.

## 2. State Management & Data Flow

- **Single Source of Truth:** `src/lib/data.ts` acts as our mock database and is the single source of truth for all application data. All data mutations must go through the functions exposed by this file.
- **Client-Side Actions:** UI components should call functions from `data.ts` to mutate state. They should not modify state directly.
- **Keeping Data Fresh:** To ensure data consistency across browser tabs, components that display dynamic data (like booking lists or dashboards) should use a `useEffect` hook to re-fetch data when the window gains focus.
    ```javascript
    useEffect(() => {
        const fetchData = () => { /* ... fetch data ... */ };
        fetchData();
        window.addEventListener('focus', fetchData);
        return () => window.removeEventListener('focus', fetchData);
    }, []);
    ```

## 3. AI Integration Patterns

- **Dedicated AI Flows:** Each distinct AI task (e.g., drafting a cancellation message, suggesting a badge) must be encapsulated in its own dedicated flow file within `src/ai/flows/`.
- **Flow Naming Convention:** Use the pattern `draft-[action-name].ts` for message drafting flows (e.g., `draft-booking-cancellation.ts`).
- **Clear Inputs/Outputs:** Every flow must have clearly defined input and output schemas using Zod. This ensures type safety and makes the AI's task unambiguous.
- **Provider/Client Context:** For flows that generate messages, the prompt must be aware of the recipient (`provider` or `client`) to tailor the message content and tone appropriately.

## 4. Component-Driven UI & Logic

- **Role-Specific Rendering:** Components should use the `useUserRole` hook to conditionally render UI elements and enable/disable actions based on whether the user is a `client` or a `provider`.
- **Isolate Complex UI:** Complex, stateful UI sections (like `ServiceManagementCard` or `BadgeProgress`) should be encapsulated in their own components to keep the main page files clean and focused.
- **Dialogs for Confirmation:** For destructive actions (like cancellations) or complex inputs (like adding/editing services), use a dialog (`AlertDialog`, `Dialog`) to confirm user intent and provide a focused interface.

## 5. Debugging Checklist

When a feature is not working as expected, follow this checklist:

1.  **Check the UI Trigger:** Is the button's `onClick` handler being called correctly? Use `console.log` to verify.
2.  **Trace the Data Function:** Does the UI handler call the correct function in `src/lib/data.ts`? Are the correct parameters being passed?
3.  **Inspect the Data Mutation:** Inside the `data.ts` function, verify that the application state (e.g., the `bookings` array) is being updated as expected.
4.  **Verify Notification/Message Triggers:** Confirm that `addNotification` and `sendAutomatedMessage` are being called from within the data mutation function.
5.  **Check AI Flow Registration:** Ensure the relevant AI flow is registered in `src/ai/dev.ts`.
6.  **Verify Component Re-rendering:** Make sure the component displaying the data is re-rendering after the data changes (see State Management section above).
7.  **Check Conditional Rendering Logic:** Review the logic that shows/hides UI elements. Is the `useUserRole` hook being used correctly? Is the logic checking the correct booking `status`?
