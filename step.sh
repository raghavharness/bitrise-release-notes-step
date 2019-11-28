#!/bin/bash
set -ex

echo "* Changelog file path: $changelog_file_path"

# Execute the extractor script
echo "* Executing the release notes extractor"
node release_notes_extractor.js $changelog_file_path

exit 0