const parser = require('changelog-parser')
const {execSync} = require('child_process')

const outputEnvVar = "RELEASE_NOTES"
let changelogFile = `${process.argv[2]}`

parseChangelog(changelogFile)

function parseChangelog(filePath) {
    parser(filePath)
        .then(content => {
            let releaseNotes = content['versions'][0]['body']
            execSync(`envman add --key ${outputEnvVar} --value "${format(releaseNotes)}"`)
            console.log(`* Wrote the environment variable ${outputEnvVar} successfully!`)
        })
        .catch(err => {
            console.e(err)
        })
}

function format(releaseNotes) {
    return releaseNotes.replace(/^###\s?(.*)$/mg,"$1")
}