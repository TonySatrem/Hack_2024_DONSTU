import db from "./db.js"
import tables from "./enums/tables.js"

const table = db.table(tables.participant)

export async function addParticipant({ fullName, teamId, info, photo, email }) {
    return (await table 
        .returning('participantId')
        .insert({ fullName, teamId, info, photo, email }))[0]
}

export async function getById({ participantId }) {
    return (await table
        .where({ participantId }))[0]
}

export async function deleteParticipant({ participantId }) {
    await table
        .where({ participantId })
        .del()
}

export async function changePhoto({ participantId, photo }) {
    await table
        .where({ participantId })
        .update({ photo })
}

export async function changeInfo({ participantId, info }) {
    await table
        .where({ participantId })
        .update({ info })
}