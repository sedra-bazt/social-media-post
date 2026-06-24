# Interactive Social Media Web Application (API-Driven)

A dynamic and fully responsive social media client-side web application. This project demonstrates strong skills in modern front-end development and API integration, where I consumed an external RESTful API to implement full user interactions, authentication, and content management.

## 🚀 Live Demo
You can view the live project here: [Live Preview](https://sedra-bazt.github.io/social-media-post)

## ✨ Key Features & API Integration
* **User Authentication:** Integrated registration and login endpoints, handling secure token storage (Local Storage/Session) for persistence.
* **Dynamic CRUD Operations:** Utilized asynchronous JavaScript to allow authenticated users to Create, Read, Update, and Delete posts dynamically without reloading the page.
* **Interactive Features:** Consumed endpoints to fetch, display, and add comments on other users' posts in real-time.
* **State & UI Management:** Built user-friendly feedback loops (loading spinners, error handlings, and success alerts) based on API response statuses.

## 🛠️ Tech Stack
* **Frontend Logic:** JavaScript (ES6+) / Fetch API (or Axios) for handling asynchronous HTTP requests.
* **UI & Styling:** HTML5, CSS3, Responsive Design (Flexbox/Grid).
* **Backend:** External RESTful API (Third-Party Integration).

## 📂 Project Structure
```text
├── index.html        # Core layout & dynamic UI containers
├── css/
│   └── style.css     # Custom styles & cross-device responsiveness
├── js/
│   ├── auth.js       # Handles login, registration, and token management
│   ├── posts.js      # Handles fetching, creating, editing, and deleting posts
│   └── app.js        # Main initialization and UI event listeners
└── README.md         # Project documentation
