#!/bin/sh

sqlite3 /var/local/appreg.db "INSERT INTO handlerIds VALUES ('APP_ID')"
sqlite3 /var/local/appreg.db "DELETE FROM properties WHERE handlerId='APP_ID'"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','command','/usr/bin/mesquite -l APP_ID -c file:///mnt/us/extensions/APP_ID/waf/')"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','unloadPolicy','unloadOnPause');"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','framework','');"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('APP_ID','lipcId','APP_ID');"

lipc-set-prop com.lab126.appmgrd start app://APP_ID
