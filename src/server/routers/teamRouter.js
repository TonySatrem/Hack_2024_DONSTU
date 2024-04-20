import express from "express"
import * as dbTeam from "../db/dbTeam.js"

const router = express.Router()

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        await dbTeam.addTeam(req.body)
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