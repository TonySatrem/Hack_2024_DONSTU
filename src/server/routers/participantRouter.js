import express from "express"
import * as dbParticipant from "../db/dbParticipant.js"

const router = express.Router()

router.post('/add', async (req, res) => {
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

router.get('/team', async (req, res) => {
    res.send('alfj')
    const teamId = req.params.teamId
    
    try {
        const participants = await dbParticipant.getAllByTeamId({ teamId })
        res.send(participants)
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

router.get('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

export default router