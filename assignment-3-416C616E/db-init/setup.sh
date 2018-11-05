#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p admin --eval "db.createUser({user: "user",pwd: "hunter2", roles:[{role:"readWrite",db:"users"]})"
echo "Mongo users created."
