import db from "./db.js"
import tables from "./enums/tables.js"

const table = db.table(tables.participant)

export async function addParticipant({ fullName, teamId, info, photo, email }) {
    await table 
        .insert({ fullName, teamId, info, photo, email })
}

export async function getById({ id }) {
    return (await table
        .where({ id }))[0]
}

export async function deleteParticipant({ id }) {
    await table
        .where({ id })
        .del()
}

export async function changePhoto({ id, photo }) {
    await table
        .where({ id })
        .update({ photo })
}

export async function changeInfo({ id, info }) {
    await table
        .where({ id })
        .update({ info })
}