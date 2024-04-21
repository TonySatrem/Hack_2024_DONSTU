import * as dbParticipant from '../db/dbParticipant.js'

export default async function (req, res) {
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
}