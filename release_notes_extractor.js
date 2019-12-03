const parser = require('changelog-parser')
const {execSync} = require('child_process')

const outputEnvVar = "RELEASE_NOTES"
let changelogFile = process.argv[2]
let trimOutput = process.argv[3].toLowerCase() == "yes"

parseChangelog(changelogFile)

function parseChangelog(filePath) {
    parser(filePath)
        .then(content => {
            var releaseNotes = content['versions'][0]['body']
            if (trimOutput) {
                releaseNotes = trimChangeTypePrefixes(releaseNotes)
            }
            writeOutputEnvironmentVariable(releaseNotes)
        })
        .catch(err => {
            console.e(err)
        })
}

function writeOutputEnvironmentVariable(releaseNotes) {
    execSync(`envman add --key ${outputEnvVar} --value "${releaseNotes}"`)
    console.log(`* Wrote the environment variable ${outputEnvVar} successfully!`)
}

function trimChangeTypePrefixes(releaseNotes) {
    return releaseNotes.replace(/^###\s?(.*)$/mg,"$1")
}