#!/bin/bash

# Build the docker image
docker build -t challenge_frontend_fastapi_app:latest .

# Run the docker image
docker run -p 4173:4173 challenge_frontend_fastapi_app:latest
