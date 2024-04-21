import db from "../db.js"
import tables from "../enums/tables.js"


export async function addQuestion({ fullName, email, text, participantId }) {
    return (await db.table(tables.question)
        .returning('questionId')
        .insert({ fullName, email, text, participantId }))[0]
}

export async function getById({ questionId }) {
    return (await db.table(tables.question)
        .where({ questionId })[0])
}

export async function getAllQuestions({ participantId }) {
    return (await db.table(tables.question)
        .select()
        .where({ participantId })) 
}