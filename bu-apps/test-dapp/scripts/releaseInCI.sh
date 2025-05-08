#!/usr/bin/env bash

package_name="`date +%Y%m%d`-okxwallet-test-dapp"

# build in main and send to release branch
echo "Start compile $package_name"

# export REACT_APP_PACKAGE_NAME=$package_name
# Compile
npm run maxBuild

echo "End compile $package_name"

rm -rf docs/
# mkdir -p docs
mv dist docs
mv docs/index.html docs/404.html

cp tonconnect-manifest.json docs/tonconnect-manifest.json
