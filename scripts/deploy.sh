#!/usr/bin/env sh

PROJECT_NAME=learntocode
URL=http://wyattpfeil.com/$PROJECT_NAME
SRC_DIR=/Users/brianpfeil/Dropbox/$PROJECT_NAME/

# sync changed local files to server
rsync -avz --exclude='.git/' -e ssh $SRC_DIR root@brianpfeil.com:/var/www/wyattpfeil-ghost/content/$PROJECT_NAME/

# visit URL
curl $URL > /dev/null 2>&1

# trigger page reload (live reload)
curl https://dbg.herokuapp.com/broadcast/reload > /dev/null 2>&1

MESSAGE="deploy completed at $(date +"%r")"
echo $MESSAGE

# send macOS user notification (top right corner notification)
echo $MESSAGE | terminal-notifier -title "$PROJECT_NAME" -sound default 