# SecureMessagingApp
This project implements a peer-to-peer chat application, created using React Native, designed for optimized security and user interaction. It adopts cryptographic techniques to preserve the confidentiality and authenticate the integrity of the messages exchanged. The application grants users the ability to register, log in, engage in private or group chats, and modify their personal settings.
The application architecture employs Redux for robust and consistent state management and React Navigation for a seamless navigation experience between different screens. The application leverages two local databases, SQLite and AsyncStorage, to manage and preserve the different characteristics of data.
SQLite, a SQL-based relational database, holds tables for user accounts, individual and group chats. The 'users' table comprises data like usernames, hashed passwords, and individualised settings. The 'chats' table associates user IDs with their corresponding message data and timestamps. The 'groups' table governs group chat data, including user IDs of the group members and shared messages. Each message, regardless of whether it belongs to a private or a group chat, is encrypted before being stored to preserve user confidentiality.
On the other side, AsyncStorage, a simplified key-value storage system, caters to the management of less complex, yet frequently accessed data. Session tokens for user authentication, for instance, are stored and retrieved for each user interaction with the application. Similarly, user personal settings such as preferred language or theme, are also stored via AsyncStorage for expedited access.
The interactions between these two databases are governed by an efficient strategy for data storage and retrieval, enabling a user experience that is seamless and engaging. Through the combined use of SQL-based and key-value databases for diverse data requisites, the application achieves a harmony in managing the varying complexities of real-time, secure messaging in a mobile environment. The application's architecture is modular, promoting easier maintenance, and continuous enhancements while adhering to top-notch coding practices.


	1.	MVC (Model-View-Controller): The foundational design pattern for React-based applications. This design pattern separates your application concerns into three components:
    	▪	Model: Reflected by your usage of SQLite and AsyncStorage databases.
    	▪	View: This involves the UI and is handled by React Native.
    	▪	Controller: Managed by the user interaction logic coded in Redux.
	2.	Module: Your mention of a modular architecture implies the usage of the Module pattern, enabling separation of concerns where different modules in your application handle specific functionality.
	3.	Observer (Pub-Sub): This pattern is used implicitly in Redux. When your application state changes, the subscribed components (observers) are notified to update the UI.
	4.	Singleton: If the instance of your database connection (for both SQLite and AsyncStorage) is being created only once and shared across the application, then you are using the Singleton pattern. This ensures that all components access the same database instance.
	5.	Strategy: You are strategizing the use of different databases(SQLite and AsyncStorage) based on the complexity of operations and frequency of data access.
	6.	Decorator: If you're enhancing the functionality of your components (like adding additional props or state), you are using a type of Decorator design pattern. An instance in React Native would be using Higher Order Components (HOC).
  7 .  The State Pattern is indeed used in this context:
    The State pattern allows an object to change its behavior based on its internal state. If your application is keeping track of the status of messages and the corresponding behavior of the application changes based on that          (such as sent, received, read, error), then you are absolutely employing the State pattern. 
    This pattern is particularly useful in cases where an object's behavior is a function of its state, and it must be able to change its behavior at run-time depending on that state.
    In the context of a messaging application, a message could have different states, with each state exhibiting a different behavior. For instance:
  	•	Draft: The system is waiting for the user to send the message.
  	•	Sent: The message has been sent but not yet delivered.
  	•	Delivered: The message has been delivered but not yet seen by the recipient.
  	•	Seen: The message has been seen by the recipient.
  	•	Error: Something went wrong in the message sending process.


 
