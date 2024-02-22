#!/bin/sh

if docker ps | grep -q stylish_app_container; then
    echo "Docker container is running."
else
    echo "Docker container is not running."
    exit 1
fi