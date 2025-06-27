# Notifications TypeScript Library

A TypeScript library for managing notifications with support for auto-removal, pinning, and chronological sorting.

## Overview

The Notifications library is designed to manage a list of notifications with features like adding, deleting, and auto-removing notifications. It supports pinning important notifications so they remain visible, and ensures notifications are sorted by recency.

## Features

- 🔔 **Add Notifications**: Add notifications and sort them chronologically
- ⏲️ **Auto-Remove**: Automatically remove notifications after a set delay
- 📌 **Pin/Unpin**: Pin important notifications to keep them visible
- 🗑️ **Delete**: Remove specific notifications or clear all non-pinned notifications
- 📅 **Sorting**: Maintain a sorted list based on time and importance

## Project Structure

```
src/
├── Interfaces.ts               # Interface for NotificationManager
├── Models/
│   └── NotificationManager.ts  # Core notification management logic
└── Types.ts                    # Type definitions for notifications

tests/
└── Notification.spec.ts        # Jest test suites for notification management
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Notifications
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Adding and Managing Notifications

```typescript
import { NotificationManager } from './src/Models/NotificationManager';
import { Notification } from './src/Types';

// Create a notification manager with a default auto-remove delay of 5 seconds
const notificationManager = new NotificationManager(5000);

// Define some notifications
const notification: Notification = {
  title: 'Meeting Reminder',
  description: 'Team meeting at 3 PM.',
  timestamp: new Date(),
  pinned: false,
};

// Add a notification
notificationManager.addNotification(notification);

// Get all notifications
const notifications = notificationManager.getNotifications();

// Pin a notification
notificationManager.pinNotification(notification);

// Unpin a notification
notificationManager.unpinNotification(notification);

// Delete a notification
notificationManager.deleteNotification(notification);

// Delete all non-pinned notifications
notificationManager.deleteAllNotifications();
```

### Auto-Remove Notifications

```typescript
// Add a notification with auto-remove
notificationManager.addNotification(notification, true);

// Add a notification with custom auto-remove delay
notificationManager.addNotification(notification, { delay: 10000 });
```

## API Reference

### NotificationManager

| Method | Description |
|--------|-------------|
| `addNotification(notification, autoRemove?)` | Adds a notification, optionally with auto-remove |
| `deleteNotification(notification)` | Deletes a specific notification |
| `deleteAllNotifications()` | Deletes all non-pinned notifications |
| `getNotifications()` | Retrieves the list of notifications |
| `pinNotification(notification)` | Pins a notification |
| `unpinNotification(notification)` | Unpins a notification |

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building

Compile TypeScript to JavaScript:

```bash
npx tsc
```

## Testing

The library includes comprehensive Jest tests for all major functionality:

- Adding and removing notifications
- Auto-removal with timers
- Pinning and unpinning logic

All tests are located in the `tests/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

ISC License

## Design Principles

- **Object-Oriented**: Encapsulated logic within the NotificationManager class
- **Type Safety**: Utilizes TypeScript for type safety and clearer interfaces
- **Modular**: Easily extendable and maintainable code structure
