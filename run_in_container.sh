#!/bin/bash
command="npm install"
if [ "$#" -ne 0 ]; then
	command=$@
fi
network_available=$(docker network ls | grep $(basename $(pwd))_default)
network="--net $(basename $(pwd))_default"
if [ -z "$network_available" ]; then
  network=""
fi
docker container run -it --rm -v $(pwd):/code $network assignment $command
