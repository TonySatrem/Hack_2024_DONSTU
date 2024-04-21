import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from "node:fs"

export const _dirname = dirname(fileURLToPath(import.meta.url)).slice(0, -10).replace(/\\/g, '\/')

export const getFileLink = url => `${_dirname}client/build${url}`

export function getFile (obj) {
    const path = obj.isIndex ? getFileLink(`/index.html`) :
                obj.req ? getFileLink(obj.req.url) : 
                "Not Found"

    return {
        file: fs.readFileSync(path, "utf-8"),
        path
    }
}