Here's a README file for your project:

---

# URL Metadata Fetcher

The application allows users to input a list of URLs, fetch metadata (title, description, and an image) for each URL, and display the results on the front-end. The project involves both front-end (React) and back-end (Node.js) components and includes security measures, rate limiting, and documentation.

## Features

- **Front-End (React)**
  - A user-friendly form for inputting multiple URLs (minimum 3).
  - A visually appealing display of fetched metadata (title, description, image).
  - Error handling for invalid URLs or cases where metadata cannot be retrieved.
  - Responsive design with support for up to 10 URL inputs.

- **Back-End (Node.js)**
  - An API endpoint `/api/dataweb` that accepts a list of URLs and fetches metadata.
  - Error handling for cases where metadata cannot be retrieved (e.g., invalid URL, network issues).
  - Rate limiting to handle a maximum of 5 requests per second.

- **Security**
  - Protection against common web vulnerabilities (e.g., XSS, CSRF).
  - Sanitization of metadata to ensure security.

- **Testing**
  - Unit tests for both the front-end and back-end with at least 5 test cases.

## Prerequisites

- Node.js and npm installed on your machine.
- React setup for front-end development.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/url-metadata-fetcher.git
cd url-metadata-fetcher
```

### 2. Set Up the Server

1. **Install server dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Create a `.env` file in the root of the server directory:**

   The `.env` file should include the following variables:

   ```bash
   PORT=4500
   ```

   **Note:** The `.env` file is not included in the repository for security reasons. You must create this file manually.

3. **Run the server:**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:4500`.

### 3. Set Up the Client

1. **Install client dependencies:**

   ```bash
   cd client
   npm install
   ```

2. **Run the client:**

   ```bash
   npm start
   ```

   The client will start on `http://localhost:3000`.

### 4. Run the Application

Visit `http://localhost:3000` in your browser. You can input a list of URLs in the form, and the application will fetch and display the metadata for each URL.

## Testing

To run the tests, navigate to the client and server directories and use the following commands:

- **Client Tests:**

  ```bash
  cd client
  npm test
  ```

- **Server Tests:**

  ```bash
  cd server
  npm test
  ```

## Design Choices and Trade-offs

- **Rate Limiting:** Implemented on the server to ensure the application can handle a maximum of 5 requests per second, which prevents abuse of the API.
- **Security:** Careful attention was given to protect against XSS and CSRF vulnerabilities. Sanitization of metadata ensures that any potentially harmful content is neutralized.
- **Validation:** The URL input form uses Joi for validation to ensure that users enter valid URLs, enhancing user experience and security.
- **Error Handling:** Both front-end and back-end include comprehensive error handling to manage invalid inputs and network issues.

## License

This project is licensed under the MIT License.

## Screenshots

Here are some screenshots of the project:



---
