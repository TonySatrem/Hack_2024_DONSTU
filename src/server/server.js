import express from "express"
import cors from "cors"
import { getFile } from "./lib/getFile.js"
import getContentType from "./lib/getContentType.js"
import teamRouter from "./routers/teamRouter.js"
import participantRouter from "./routers/participantRouter.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get("/", (req, res) => {
  const { file, path } = getFile({
    isIndex: true
  })
  
  res.set({
      'Content-Type': getContentType(path),
      'Content-Length': Buffer.byteLength(file)
  })
  
  res.sendFile(path)
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

app.use('/api/teams', teamRouter)
app.use('/api/participants', participantRouter)

const PORT = process.env.HTTP_PORT || 8080
const HOSTNAME = process.env.HTTP_HOSTNAME || '127.0.0.1'

app.listen(PORT, HOSTNAME, () => 
  console.log(`server is listening at http://${HOSTNAME}:${PORT}`))