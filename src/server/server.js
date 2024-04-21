import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { getFile } from "./lib/getFile.js"
import getContentType from "./lib/getContentType.js"
import * as dbTeam from "./db/models/dbTeam.js"
import * as dbParticipant from "./db/models/dbParticipant.js"
import * as dbVote from "./db/models/dbVotes.js"

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

app.route('/api/teams')
  .get(async (req, res) => {
    const teamId = req.query.id

    try {
      if (!teamId) {
        const teams = await dbTeam.getAll()
        res.send(teams)
      }
      else {
        const team = await dbTeam.getById({teamId})
        res.send(team)
      }
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
      const teamId = req.query.id
      
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
      const teamId = req.query.id
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

app.route('/api/participants')
    .get(async (req, res) => {
        const participantId = req.query.participantId
        const teamId = req.query.teamId
    
        try {
          if (teamId) {
            const participants = await dbParticipant.getAllByTeamId({ teamId })
            res.send(participants)
          }
          else if (participantId){
          const participant = await dbParticipant.getById({ participantId })
          res.send(participant)
          } 
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
        const participantId = req.query.participantId
    
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
        const participantId = req.query.participantId
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


// Votes

app.get("/api/votes", async (req, res) => {
  const teamId = req.query.teamId
  const voteId = req.params.voteId

  try {
      if (teamId) {
        const votes = await dbVote.getByTeamId({ teamId })
        res.send(votes)
      } 
      else if (voteId) {
        const vote = await dbParticipant.getById({ voteId })
        res.send(vote)
      }
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

app.post("/api/votes/add", async (req, res) => {
  try {
    const a = await dbVote.addVote(req.body)
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

const PORT = process.env.HTTP_PORT || 8080
const HOSTNAME = process.env.HTTP_HOSTNAME || '127.0.0.1'

app.listen(PORT, HOSTNAME, () => 
  console.log(`server is listening at http://${HOSTNAME}:${PORT}`))