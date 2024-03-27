#!/bin/sh

echo "Start docker engine"
sudo systemctl start docker

echo "Stopping existing app container"
docker stop stylish_app_container || true

echo "Cleaning up existing code"
docker rm stylish_app_container || true
docker rmi stylish/stylish:v1 || true
docker volume prune -f || true
docker network prune -f || true
rm -rf /home/ec2-user/stylish-back-end


echo "Installing/updating dependencies"
sudo yum update -y --skip-broken