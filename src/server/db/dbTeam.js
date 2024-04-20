import db from "./db.js"
import tables from "./enums/tables.js"

const table = db.table(tables.team)

export async function addTeam({ name, email, login, passsword, banner}) {
    await table
        .insert({ name, email, login, passsword, banner})
}

export async function getById({ id }) {
    return (await table
        .where({ id }))[0]
}

export async function getByLogin({ login }) {
    return (await table
        .where({ login }))[0]
}

export async function deleteTeam({ id }) {
    await table
        .where({ id })
        .del()
}

export async function changeBanner({ id, banner }) {
    await table
        .where({ id })
        .update({ banner })
}

