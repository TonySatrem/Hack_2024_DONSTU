import express from "express"
import * as dbTeam from "../db/dbTeam.js"

const router = express.Router()

router.post('/add', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const team = await dbTeam.getById({ id })
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

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        dbTeam.deleteTeam(id)
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
    const id = req.params.id
    const { banner } = req.body

    try {
        dbTeam.changeBanner({ id, banner })
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