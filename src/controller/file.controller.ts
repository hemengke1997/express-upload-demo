import fs from 'fs'
import type { Request, Response } from 'express'
import { MAX_SIZE, uploadFileMiddleware } from '../middleware/upload'
import { BASE_URL, FILE_TARGET } from '../../config'

const upload = async (req: Request, res: Response) => {
  try {
    await uploadFileMiddleware(req, res)

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }

    res.status(200).send({
      message: `Uploaded the file successfully: ${req.file.originalname}`,
    })
  } catch (err) {
    console.log(err)

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: `File size cannot be larger than ${MAX_SIZE}MB!`,
      })
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    })
  }
}

const getListFiles = (req: Request, res: Response) => {
  const directoryPath = `${global.__basedir}/${FILE_TARGET}/`

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      })
    }

    let fileInfos = []

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: `${BASE_URL}files/${file}`,
      })
    })

    res.status(200).send(fileInfos)
  })
}

const download = (req: Request, res: Response) => {
  const fileName = req.params.name
  const directoryPath = `${global.__basedir}/${FILE_TARGET}/`

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: `Could not download the file. ${err}`,
      })
    }
  })
}

const remove = (req: Request, res: Response) => {
  const fileName = req.params.name
  const directoryPath = `${global.__basedir}/${FILE_TARGET}/`

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: `Could not delete the file. ${err}`,
      })
    }

    res.status(200).send({
      message: 'File is deleted.',
    })
  })
}

const removeSync = (req: Request, res: Response) => {
  const fileName = req.params.name
  const directoryPath = `${global.__basedir}/${FILE_TARGET}/`

  try {
    fs.unlinkSync(directoryPath + fileName)

    res.status(200).send({
      message: 'File is deleted.',
    })
  } catch (err) {
    res.status(500).send({
      message: `Could not delete the file. ${err}`,
    })
  }
}

export { upload, getListFiles, download, remove, removeSync }
