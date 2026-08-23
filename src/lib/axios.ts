import axios from 'axios'

const URL = 'https://uzze-bk-weld.vercel.app'

/* http://localhost:5000 */

/* https://uzze-bk-weld.vercel.app */

export default axios.create({
  baseURL: URL,
})
