import db from "./db.js"
import tables from "./enums/tables.js"

const table = db.table(tables.team)

export async function addTeam({ name, email, login, password, banner }) {
    return (await table
        .returning('teamId')
        .insert({ name, email, login, password, banner }))[0]
}

export async function getById({ teamId }) {
    return (await table
        .where({ teamId }))[0]
}

export async function getByLogin({ login }) {
    return (await table
        .where({ login }))[0]
}

export async function deleteTeam({ teamId }) {
    await table
        .where({ teamId })
        .del()
}

export async function changeBanner({ teamId, banner }) {
    await table
        .where({ teamId })
        .update({ banner })
}

