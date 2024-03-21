#!/bin/sh

echo "Start app container"
docker run -d -p 3000:3000 -e NODE_ENV=production -e PORT=3000 --name stylish_app_container stylish/stylish:v1