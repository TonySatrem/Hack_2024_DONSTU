import * as dbTeam from "../db/dbTeam.js" 

export default async function (req, res) {
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
}