import axios from 'axios'

const URL = 'http://localhost:5001'

/* http://localhost:5000 */

/* https://uzze-bk-weld.vercel.app */

export default axios.create({
  baseURL: URL,
})
