#!/bin/sh

sqlite3 /var/local/appreg.db "INSERT INTO handlerIds VALUES ('com.ngxson.waf_demo')"
sqlite3 /var/local/appreg.db "DELETE FROM properties WHERE handlerId='com.ngxson.waf_demo'"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('com.ngxson.waf_demo','command','/usr/bin/mesquite -l com.ngxson.waf_demo -c file:///mnt/us/extensions/com.ngxson.waf_demo/')"
sqlite3 /var/local/appreg.db "INSERT INTO properties (handlerId, name, value) VALUES ('com.ngxson.waf_demo','unloadPolicy','unloadOnPause');"
