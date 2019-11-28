const parser = require('changelog-parser')
const {execSync} = require('child_process')

let changelogFile = `${process.argv[2]}`

parseChangelog(changelogFile)

function parseChangelog(filePath) {
    parser(filePath)
        .then(content => {
            let releaseNotes = content['versions'][0]['body']
            execSync(`envman add --key RELEASE_NOTES --value "${format(releaseNotes)}"`)
            console.log("* Wrote the environment variable RELEASE_NOTES successfully!")
        })
        .catch(err => {
            console.e(err)
        })
}

function format(releaseNotes) {
    return releaseNotes.replace(/^###\s?(.*)$/mg,"$1")
}