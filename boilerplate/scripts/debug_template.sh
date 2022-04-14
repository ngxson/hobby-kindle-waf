#!/bin/sh

sqlite3 /var/local/appreg.db "INSERT INTO handlerIds VALUES ('APP_ID')"
sqlite3 /var/local/appreg.db "DELETE FROM properties WHERE handlerId='APP_ID'"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','command','/usr/bin/mesquite -l APP_ID -c http://LOCAL_COMPUTER_IP:3000')"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','unloadPolicy','unloadOnPause');"

# run this via terminal: curl http://LOCAL_COMPUTER_IP:3000/debug.sh | sh
# then: lipc-set-prop com.lab126.appmgrd start app://APP_ID
