#!/usr/bin/env sh

PROJECT_NAME=learntocode
URL=http://wyattpfeil.com/$PROJECT_NAME
SRC_DIR=/Users/brianpfeil/Dropbox/$PROJECT_NAME/

pushd $SRC_DIR
open http://localhost:8000
python -m SimpleHTTPServer 8000
popd
