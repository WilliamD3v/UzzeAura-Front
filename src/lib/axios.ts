import axios from "axios";

const URL = "https://portfolio-bk-flame.vercel.app";

/* https://portfolio-bk-flame.vercel.app */
/* http://localhost:5000 */
export default axios.create({
  baseURL: URL,
});
