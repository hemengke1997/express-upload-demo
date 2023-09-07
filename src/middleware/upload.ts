import util from 'util'
import multer from 'multer'
import type { Request, Response } from 'express'
import { FILE_TARGET, MAX_SIZE } from '../../config'

const maxSize = MAX_SIZE * 1024 * 1024

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${global.__basedir}/${FILE_TARGET}/`)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
}).single('file')

type UploadMiddleare = (req: Request, res: Response) => Promise<void>

const uploadFileMiddleware = util.promisify(uploadFile) as unknown as UploadMiddleare

export { uploadFileMiddleware, MAX_SIZE }
