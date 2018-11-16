#!/bin/bash

rm -rf dist
yarn build
mkdir dist/assets
cp src/assets/lunr_index.json dist/assets/lunr_index.json
cp src/assets/objects.json dist/assets/objects.json
firebase deploy
