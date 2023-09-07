import url from 'url'
import cors from 'cors'
import express from 'express'
import initRoutes from './src/routes'
import { PORT } from './config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

global.__basedir = __dirname

app.use(cors())

app.use(express.urlencoded({ extended: true }))

initRoutes(app)

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
})
