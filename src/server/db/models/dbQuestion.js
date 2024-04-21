import db from "../db.js"
import tables from "../enums/tables.js"

const table = db.table(tables.question)

export async function addQuestion({ fullName, email, text, participantId }) {
    return (await table
        .returning('questionId')
        .insert({ fullName, email, text, participantId }))[0]
}

export async function getById({ questionId }) {
    return (await table
        .where({ questionId })[0])
}

export async function getAllQuestions({ participantId }) {
    return (await table
        .select()
        .where({ participantId })) 
}