#!/bin/bash
echo "Starting Cloudify Backend..."
echo "Python version:"
python --version
echo "Current directory:"
pwd
echo "Files in directory:"
ls -la
echo "Starting uvicorn..."
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --log-level debug
