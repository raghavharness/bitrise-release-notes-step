#!/bin/bash
set -ex

echo "* Changelog file path: $changelog_file_path"

# Install node module dependencies
npm install changelog-parser
npm install child-process

# Execute the extractor script
node release_notes_extractor.js $changelog_file_path

exit 0