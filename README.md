# Matrixreq attachments downloader

A simple Node.js app to download files from matrixreq project using fetch.

## Prerequisites

- Node.js (version 18 recommended)

## Installation

1. Clone the repository or download the `index.js` file.
2. Install the required dependencies:

```bash
npm install node-fetch
```

# Usage
Run the app using the following command:
```bash
node app.js <BASE_URL> <PROJECT> <TOKEN>
```


Replace <BASE_URL> with the base URL, <PROJECT> with the project label, and <TOKEN> with the authentication token.

The app will download the files into a folder named after the provided PROJECT value.

# Example
```bash
node app.js https://demo.matrixreq.com QMS_FILES abcd1234efgh5678
```
In this example, the base URL is https://demo.matrixreq.com, the project value is QMS_FILES, and the authentication token is abcd1234efgh5678. The downloaded files will be saved in a folder named QMS_FILES.
