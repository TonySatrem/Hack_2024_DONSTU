import db from "../db.js"
import tables from "../enums/tables.js"

export async function addParticipant({ fullName, teamId, info, photo, email }) {
    return (await db.table(tables.participant) 
        .returning('participantId')
        .insert({ fullName, teamId, info, photo, email }))[0]
}

export async function getAllByTeamId({ teamId }) {
    return await db.table(tables.participant)
        .select('participantId')
        .where({ teamId })
        .then(r => r.map(i => i.participantId))
}

export async function getById({ participantId }) {
    return (await db.table(tables.participant)
        .where({ participantId }))[0]
}

export async function deleteParticipant({ participantId }) {
    await db.table(tables.participant)
        .where({ participantId })
        .del()
}

export async function changePhoto({ participantId, photo }) {
    await db.table(tables.participant)
        .where({ participantId })
        .update({ photo })
}

export async function changeInfo({ participantId, info }) {
    await db.table(tables.participant)
        .where({ participantId })
        .update({ info })
}