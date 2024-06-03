#!/bin/bash

# Directory containing the migration files
MIGRATIONS_DIR="./migrations"

# Default path if --starts-with param is not provided
DEFAULT_STARTS_WITH="en-us/untranslated"

# Check if the directory exists
if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "Directory $MIGRATIONS_DIR does not exist."
  exit 1
fi

# Initialize the --starts-with parameter with the default value
STARTS_WITH="$DEFAULT_STARTS_WITH"

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --starts-with)
      if [ -n "$2" ]; then
        STARTS_WITH="$2"
        shift
      fi
      ;;
    *)
      echo "Unknown parameter passed: $1"
      exit 1
      ;;
  esac
  shift
done

# Loop through each file in the migrations directory
for FILE in "$MIGRATIONS_DIR"/*; do
  # Skip if it's not a regular file
  if [ ! -f "$FILE" ]; then
    continue
  fi

  # Extract the filename from the full file path
  FILENAME=$(basename "$FILE")

  # Check if the filename matches the expected pattern
  if [[ "$FILENAME" =~ change_([^_]*)_translate\.js ]]; then
    # Extract the part of the filename between two underscores
    COMPONENT_TO_TRANSLATE=${BASH_REMATCH[1]}

    echo $COMPONENT_TO_TRANSLATE

    # Run the npm command with the extracted component name
    npm run run run-migration -- --space 169502 --component $COMPONENT_TO_TRANSLATE --field translate --starts-with $STARTS_WITH
  else
    echo "Filename $FILENAME does not match the expected pattern."
  fi
done