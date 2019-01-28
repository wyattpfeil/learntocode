#!/usr/bin/env sh

#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

alias deploy='$DIR/deploy.sh'

# always do a deploy on first run
deploy

# deploy when there are any file changes
fswatch --one-per-batch . | while read filename;
do
	#echo $filename $event
	deploy;
done