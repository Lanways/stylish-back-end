#!/bin/sh

echo "Start app container"
docker run -d -p 8000:80 -e NODE_ENV=production --name stylish_app_container stylish/stylish:v1