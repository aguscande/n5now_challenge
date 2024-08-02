#!/bin/bash

# Build the docker image
docker build -t challenge_backend_fastapi_app:latest .

# Run the docker image
docker run -p 8000:8000 challenge_backend_fastapi_app:latest
