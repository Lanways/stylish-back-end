#!/bin/sh

echo "Build app image"
cd /home/ec2-user/stylish-back-end
docker build -t stylish/stylish:v1 .