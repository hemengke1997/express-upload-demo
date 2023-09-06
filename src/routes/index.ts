import express from 'express'
import type { Express } from 'express'
import * as controller from '../controller/file.controller'
const router = express.Router()

const routes = (app: Express) => {
  router.post('/upload', controller.upload)
  router.get('/files', controller.getListFiles)
  router.get('/files/:name', controller.download)
  router.delete('/files/:name', controller.remove)
  app.use(router)
}

export default routes
