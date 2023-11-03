# React Native Peer-to-Peer Chat Application

This project implements a peer-to-peer chat application, developed with React Native, and designed for optimized security and user interaction. It adopts cryptographic techniques to safeguard confidentiality and ensure message integrity. The application allows users to register, log in, engage in private or group chats, and modify their personal settings.

## Table of Contents
-  [Architecture](#architecture)
-  [Database Description](#database-description)
-  [Design Patterns](#design-patterns)

## Architecture

Our architecture utilizes Redux for robust and consistent state management and React Navigation for seamless navigation between different screens. It leverages two local databases, SQLite and AsyncStorage, to manage and preserve different data characteristics.

## Database Description
SQLite, a SQL-based relational database, holds tables for user accounts, chat records, chat member records, message records, and contact records. The following details what each table comprises:

-    **Users Table**: Contains user data such as unique identifiers (UserID), usernames, hashed passwords, and individualized settings.
    
-    **Chats Table**: Holds chat data, including unique identifiers (ChatID), and chat names (Chat_Name).

-    **ChatUsers (Chat Members) Table**: Associates users with chats. It holds fields like ChatID and UserID, which are foreign keys linked to their respective entities. 
    
-    **Messages Table**: Maintains message data, including unique identifiers (MessageID), ChatID (foreign key), SenderUserID (foreign key), message content, timestamps, and status.
    
-    **Contacts Table**: This table helps to manage user contacts. It includes fields like UserID, and ContactID, which are foreign keys referring to the User’s unique identifier.

>Every single message, regardless of whether it belongs to a private chat or a group chat, gets encrypted before being stored to preserve user confidentiality.
>

On the other side, AsyncStorage, a simplified key-value storage system, manages less complex but frequently accessed data. Session tokens for user authentication are stored and retrieved for each user interaction with the application. User personal settings, like preferred language or theme, are also stored via AsyncStorage for speedy access.

## Design Patterns

The application incorporates the following design patterns:

1. **MVC (Model-View-Controller)**
    - Model: Uses SQLite and AsyncStorage databases.
    - View: Handles UI with React Native.
    - Controller: Manages user interaction logic with Redux.

2. **Module**: This pattern is implied by the modular architecture of the application.

3. **Observer (Pub-Sub)**: Implicitly used in Redux. When an application state changes, subscriber components are notified to update the UI.

4. **Singleton**: If a database connection instance is created once and shared across the application, then it uses the Singleton pattern.

5. **Strategy**: The use of different databases (SQLite and AsyncStorage) based on operational complexity and data access frequency follows the Strategy pattern.

6. **Decorator**: Enhancing component functionality (like adding additional props or state) uses a type of Decorator design pattern. In React Native, this is accomplished using Higher Order Components (HOC).

7. **State Pattern**: Employed in tracking message statuses. Each message state (draft, sent, delivered, read, error) prompts a different corresponding behavior in the application.



## Authors

-  **Joel Carlson**  - [Joel Carlson](https://github.com/JtxCo)
-  **Davis Lapkin**  - [Davis Lapkin](https://github.com/Smileydavisl)

