#!/bin/bash
set -e

echo "* Changelog file path: $changelog_file_path"

THIS_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo $THIS_SCRIPT_DIR

# Install node module dependencies
npm install --prefix $THIS_SCRIPT_DIR changelog-parser --save
npm install --prefix $THIS_SCRIPT_DIR child-process --save

# Execute the extractor script
echo "* Executing the release notes extractor"

set -x
node $THIS_SCRIPT_DIR/release_notes_extractor.js $changelog_file_path $trim_markdown_output

exit 0