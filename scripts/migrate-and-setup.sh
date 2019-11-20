#!/usr/bin/env bash

source .env && tronbox migrate --reset --network shasta
node ./scripts/setup.js

