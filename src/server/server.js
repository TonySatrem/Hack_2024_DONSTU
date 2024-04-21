import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { getFile } from "./lib/getFile.js"
import getContentType from "./lib/getContentType.js"
import * as dbTeam from "./db/dbTeam.js"
import * as dbParticipant from "./db/dbParticipant.js"
import getParticipantsByTeamHandler from "./routers/getParticipantsByTeamHandler.js"
import authHandler from "./routers/authHandler.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(cors())

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


// API
// teams

app.get('/api/teams', async (req, res) => {
  try {
      const teams = await dbTeam.getAll()
      res.send(teams)
  }
  catch (e) {
      console.log(e)
      res.sendStatus(400)
      res.send(e.message)
  } 
  finally {
      res.end()
  }
})

app.post('/api/teams/add', async (req, res) => {
  try {
      const teamId = await dbTeam.addTeam(req.body)
      res.send(teamId)
  }
  catch (e) {
      console.log(e)
      res.sendStatus(400)
      res.send(e.message)
  } 
  finally {
      res.end()
  }
})

app.route('/api/teams/:id(\d+)')
.get(async (req, res) => {
    const teamId = req.params
    console.log(teamId)
    console.log(typeof teamId)

    try {
        const team = await dbTeam.getById({ teamId })
        res.send(team)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
        res.send(e.message)
    } 
    finally {
        res.end()
    }
})
.delete(async (req, res) => {
    const teamId = req.params.id
    
    try {
        dbTeam.deleteTeam({ teamId })
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
        res.send(e.message)
    } 
    finally {
        res.end()
    }
})
.put(async (req, res) => {
    const teamId = req.params.id
    const { banner } = req.body

    try {
        dbTeam.changeBanner({ teamId, banner })
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(400)
        res.send(e.message)
    } 
    finally {
        res.end()
    }
})

app.post('/api/teams/auth', async (req, res) =>{
  const { login, password } = req.body

  try {
      const team = await dbTeam.getIdByCredentials({ login, password })
      res.send(team)
  }
  catch (e) {
      console.log(e)
      res.sendStatus(400)
      res.send(e.message)
  } 
  finally {
      res.end()
  }
})

// participants

app.post('/api/participants/add', async (req, res) => {
  try {
      const participantId = await dbParticipant.addParticipant(req.body)
      res.send(participantId)
  }
  catch (e) {
      console.log(e)
      res.sendStatus(400)
      res.send(e.message)
  } 
  finally {
      res.end()
  }
})

app.route('/api/participants/:id(\d+)')
    .get(async (req, res) => {
        const participantId = req.params.id
    
        try {
            const participant = await dbParticipant.getById({ participantId })
            res.send(participant)
        }
        catch (e) {
            console.log(e)
            res.sendStatus(400)
            res.send(e.message)
        } 
        finally {
            res.end()
        }
    })
    .delete(async (req, res) => {
        const participantId = req.params.id
    
        try {
            dbParticipant.deleteParticipant({ participantId })
            res.sendStatus(200)
        }
        catch (e) {
            console.log(e)
            res.sendStatus(400)
            res.send(e.message)
        } 
        finally {
            res.end()
        }
    })
    .put(async (req, res) => {
        const participantId = req.params.id
        const { info, photo } = req.body
    
        try {
            if (!!info) await dbParticipant.changeInfo({ participantId, info})
            if (!!photo) await dbParticipant.changePhoto({ participantId, photo})
            res.sendStatus(200)
        }
        catch (e) {
            console.log(e)
            res.sendStatus(400)
            res.send(e.message)
        } 
        finally {
            res.end()
        }
    })

app.get('/api/participants/team/:teamId(\d+)', getParticipantsByTeamHandler)

const PORT = process.env.HTTP_PORT || 8080
const HOSTNAME = process.env.HTTP_HOSTNAME || '127.0.0.1'

app.listen(PORT, HOSTNAME, () => 
  console.log(`server is listening at http://${HOSTNAME}:${PORT}`))