import parser from 'changelog-parser'
import { execSync } from 'child_process'

const releaseNotesOutEnvVar = "EXTRACTED_RELEASE_NOTES"
const versionNameOutEnvVar = "EXTRACTED_VERSION_NAME"

let changelogFile = process.argv[2]
let trimOutput = process.argv[3].toLowerCase() == "yes"

parseChangelog(changelogFile)

function parseChangelog(filePath) {
    parser(filePath)
        .then(content => {
            let entry = content['versions'][0]
            let versionName = entry['version']
            var releaseNotes = entry['body']
            if (trimOutput) {
                releaseNotes = trimChangeTypePrefixes(releaseNotes)
            }
            writeOutputEnvironmentVariable(releaseNotesOutEnvVar, releaseNotes)
            writeOutputEnvironmentVariable(versionNameOutEnvVar, versionName)
        })
        .catch(err => {
            console.e(err)
        })
}

function writeOutputEnvironmentVariable(outputEnvVar, value) {
    execSync(`envman add --key ${outputEnvVar} --value "${value}"`)
    console.log(`* Wrote the environment variable ${outputEnvVar} successfully!`)
}

function trimChangeTypePrefixes(releaseNotes) {
    return releaseNotes.replace(/^###\s?(.*)$/mg,"$1")
}