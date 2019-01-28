#!/usr/bin/env sh

#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

alias deploy='$DIR/deploy.sh'
deploy; fswatch -o . | while read f; do deploy; done