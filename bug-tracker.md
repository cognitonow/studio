## Bug Tracker

- **Issue**: Unread message indicators (bolding, color change, numeric badge) in the conversation list on the `/messages` page are not updating correctly.
  - **Symptoms**: Indicators appear for unread messages but do not disappear after a conversation is viewed and the messages are marked as read.
  - **Last Known State**: Console logging confirms that the functions to mark messages as read are being triggered correctly on click. The underlying data appears to be updated, but the React component is not re-rendering its state to reflect the change visually. The issue is likely related to state management within the `MessagesPage` component and ensuring React detects the state change to trigger a re-render of the conversation list.
