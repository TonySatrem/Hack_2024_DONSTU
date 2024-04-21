import db from "./db.js"
import tables from "./enums/tables.js"

const table = db.table(tables.vote)

export async function addVote({ team, voteType, count }) {
    return (await table
        .returning('voteId')
        .insert({ team, voteType, count }))[0]
}

export async function getById({ voteId }) {
    return (await table
        .where({ voteId })[0])
}

export async function getAllVotes() {
    return (await table
        .select()) 
}