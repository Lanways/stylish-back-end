#!/bin/sh

echo "Start app container"
docker run -d -p 8000:80 -v /home/ec2-user/.env:/src/app/.env --name stylish_app_container stylish/stylish:v1