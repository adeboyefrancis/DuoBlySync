// This file sets up an Axios client that points to your Express backend API.
import axios from "axios";

const DuoBlySyncClient = axios.create({
  // Directs traffic to http://localhost:5005/api via your .env.local file
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Keep your main default wrapper export
export default DuoBlySyncClient;

// 2. Add the named export so your components can grab the raw axios instance from this module path
export { axios };
