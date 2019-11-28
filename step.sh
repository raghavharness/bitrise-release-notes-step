#!/bin/bash
set -ex

echo "* Changelog file path: $changelog_file_path"
echo "* Keeping the markdown output: $keep_markdown_output"

# Execute the extractor script
echo "* Executing the release notes extractor"
node release_notes_extractor.js $changelog_file_path $keep_markdown_output

exit 0