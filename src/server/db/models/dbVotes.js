import db from "../db.js"
import tables from "../enums/tables.js"

const table = db.table(tables.vote)

export async function addVote({ votingTeamId, voteType, count = 0}) {
    return (await db.table(tables.vote)
        .returning('voteId')
        .insert({ votingTeamId, voteType, count }))[0]
}

export async function getByVoteId({ voteId }) {
    return (await db.table(tables.vote)
        .where({ voteId })[0])
}

export async function getByTeamId({ teamId }) {
    return (await db.table(tables.vote)
        .select()
        .where({ teamId })) 
}

export async function getByVotingTeamId ({ votingTeamId }) {
    return (await db.table(tables.vote) 
        .select()
        .where({ votingTeamId }))
}