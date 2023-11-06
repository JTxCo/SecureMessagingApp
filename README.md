# React Native Peer-to-Peer Chat Application

This final project for our Object Orientated Design class and implements a peer-to-peer chat application, developed with React Native, and designed for optimized security and user interaction. It adopts cryptographic techniques to safeguard confidentiality and ensure message integrity. The application allows users to register, log in, engage in private or group chats, and modify their personal settings.

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

1. **Model-View-Controller (MVC)**
- _Model_: Adopts a Strategy Pattern using SQLite and AsyncStorage as interchangeable DB systems based on data complexity.
- _View_: Applies a Composite Pattern, allowing various UI screens to be uniformly managed.
- _Controller_: Manages user interaction and navigation logic, and employs a Facade Pattern with the 'Security' class to simplify access to complex security tasks.

2. **Observer Pattern**: Broadly utilized throughout the system via various `Observer` interfaces, facilitating automatic updates in dependent components when the state of observed objects changes.

3. **State Pattern**: Used for tracking the status of messages. Each message state (draft, sent, delivered, read, error) prompts a different corresponding behavior in the application.

4. **Singleton Pattern**: Ensures only one instance of the SQLite and AsyncStorage databases is created and shared across the application.


## Authors

-  **Joel Carlson**  - [Joel Carlson](https://github.com/JtxCo)
-  **Davis Lapkin**  - [Davis Lapkin](https://github.com/Smileydavisl)

