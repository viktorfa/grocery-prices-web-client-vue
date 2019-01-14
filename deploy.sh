#!/bin/bash

rm -rf dist
yarn
yarn build
firebase deploy
