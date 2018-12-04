#!/usr/bin/env bash

output=""
tronbox migrate --reset --network shasta | (
  while IFS= read -r line
  do
    echo "$line"
    output="$output
$line"
  done
  node ./scripts/setup.js "$output"
)
