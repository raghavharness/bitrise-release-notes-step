#!/bin/bash
set -ex

echo "* Changelog file path: $changelog_file_path"

# Execute the extractor script
echo "* $keep_markdown_output"
echo "* Executing the release notes extractor"
node release_notes_extractor.js $changelog_file_path $trim_markdown_output

exit 0