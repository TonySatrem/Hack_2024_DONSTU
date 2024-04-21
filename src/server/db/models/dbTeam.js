import db from "../db.js"
import tables from "../enums/tables.js"

const table = db.table(tables.team)

export async function addTeam({ name, email, login, password, banner }) {
    return (await db.table(tables.team)
        .returning('teamId')
        .insert({ name, email, login, password, banner }))[0]
}

export async function getById({ teamId }) {
    return (await db.table(tables.team)
        .where({ teamId }))[0]
}

export async function getByLogin({ login }) {
    return (await db.table(tables.team)
        .where({ login }))[0]
}

export async function getIdByCredentials({ login, password }) {
    return (await db.table(tables.team)
        .where({ login, password }))[0]
}

export async function getAll() {
    return (await db.table(tables.team)
        .select())
}

export async function deleteTeam({ teamId }) {
    await db.table(tables.team)
        .where({ teamId })
        .del()
}

export async function changeBanner({ teamId, banner }) {
    await db.table(tables.team)
        .where({ teamId })
        .update({ banner })
}