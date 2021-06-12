#!/bin/bash

#On error no such file entrypoint.sh, execute in terminal - dos2unix .docker\entrypoint.sh

### WWW
chown -R node:node .

### BACKE-END
npm install

npm run start