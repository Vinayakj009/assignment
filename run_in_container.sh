#!/bin/bash
command="npm install"
if [ "$#" -ne 0 ]; then
	command=$@
fi
docker container run -it --rm -v $(pwd):/code sugarbox_assignment $command
