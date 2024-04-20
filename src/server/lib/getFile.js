export default function getFileLink (req) { 
    const referer = getReferer(req)
    const projectPath = getProjectPath(referer)
    return getFileLink(`/${projectPath}/${req.url}`)
}

function getProjectPath (s) {
    const projectPath = !s || s === '' || s.includes('.') ? 'main' : s
    return projectPath
}

function getReferer (req) {
    const ref = req.headers.referer?.split('/')?.at(-1)
    return ref
} 