#!/bin/sh

echo "Start app container"
docker run -d -p 3000:3000 -e PORT=3000 -e NODE_ENV=production --name stylish_app_container stylish/stylish:v1
docker run -d -p 3001:3001 -e PORT=3001 -e NODE_ENV=production --name stylish_app_container2 stylish/stylish:v1