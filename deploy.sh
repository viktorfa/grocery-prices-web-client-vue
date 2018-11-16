#!/bin/bash

rm -rf dist
yarn build
firebase deploy
