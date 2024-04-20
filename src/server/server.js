import express from "express"
import cors from "cors"

const app = express()

app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

const clientEndpoints = /.+\.(html|css|js|png|svg|ico|ttf|oft|woff|woff2)/

app.get(clientEndpoints, (req, res) => {
  try {
    const { file, path } = getFile({
      req
    })

    res.set({
      'Content-Type': getContentType(path),
      'Content-Length': Buffer.byteLength(file)
    })

    res.sendFile(path)
  }
  catch (err) {
    console.error(err)
    res.sendStatus(404)
    res.end()
  }
})