import { config } from 'dotenv'
import app from './app/App'
import { PORT } from './constants/db'

config()

const app_port = process.env.EXPRESS_PORT || PORT

app.listen(app_port, () => console.log(`Listening on port ${app_port}`))
