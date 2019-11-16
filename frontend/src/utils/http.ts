import axios from 'axios'

const onFullfiled = (response: any) => {
  return response
}

const onRejected = (error: any) => {
  return error
}

console.log(process.env.BACKEND_URI)

const HTTP = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  },
})

HTTP.interceptors.response.use(onFullfiled, onRejected)

export default HTTP
