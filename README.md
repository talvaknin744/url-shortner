# URL Shortener
This is a simple URL shortener application built with Node.js, Express.js, and PostgreSQL.

Installation
To run the project locally, follow these steps:
Clone the repository:
git clone https://github.com/talvaknin744/url-shortner.git

# Install dependencies:

cd url-shortner
npm install
Create a .env file in the root directory of the project and add the following variables:

Copy code
USERNAME=<your-postgresql-user>
PASSWORD=<your-postgresql-password>
DATABASE=<your-postgresql-database>
PORT=<your-port>.
# Run the migrations:
Copy code
npm start
This will start the server at http://localhost:5000.

Usage
To shorten a URL, send a POST request to /api/shorten with a JSON payload:

```json
{
"url": "<long-url>"
}
```
The server will respond with a JSON payload containing the shortened URL:

```json
{
"shortUrl": "<short-url>"
}
```
To redirect to the original URL, simply visit the shortened URL in your browser.

License
This project is licensed under the MIT License.