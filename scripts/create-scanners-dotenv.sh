#!/bin/bash
# Note - you will need a GITHUB_TOKEN and manually create the .env for:
    # "github-octo-repo-check"
    
ENV_CONTENT='NATS_URL="nats://0.0.0.0:4222"'

DIRECTORIES=("endpoint-dispatcher" \
    "scanners/github-clone-repo" \
    "scanners/github-cloned-dockerignore-check"\
    "scanners/github-cloned-gitignore-check"\
    "scanners/github-cloned-has-dependabot-yaml-check"\
    "scanners/github-cloned-has-security-md-check"\
    "scanners/github-cloned-has-tests-directory-check"\
    "scanners/github-octo-languagues-check"\
    "scanners/github-octo-license-check"\
    "scanners/github-done-collector"\
    )
for dir in "${DIRECTORIES[@]}"; do
    # Check if the directory exists
    if [ -d "$dir" ]; then
        # Create or overwrite the .env file in the directory
        echo "$ENV_CONTENT" > "$dir/.env"
        echo "Created .env file in $dir"
    else
        echo "Directory $dir does not exist."
    fi
done