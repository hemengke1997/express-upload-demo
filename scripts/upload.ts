#!/usr/bin/env tsx

import fs from 'fs'
import url from 'url'
import path from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { BASE_URL } from '../config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const argv = process.argv.slice(2)

const file = fs.createReadStream(path.resolve(__dirname, `../${argv[0] || 'temp.txt'}`))

const formData = new FormData()

formData.append('file', file)

fetch(`${BASE_URL}upload`, {
  method: 'POST',
  headers: formData.getHeaders(),
  body: formData,
})
  .then(async (res) => {
    return res.text()
  })
  .then(console.log)
