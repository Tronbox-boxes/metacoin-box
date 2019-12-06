#!/usr/bin/env bash

source .env
tronbox migrate --reset --network mainnet
node ./scripts/setup.js

