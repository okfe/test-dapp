#!/usr/bin/env bash

package_name="`date +%Y%m%d%H%M`-okxwallet-dapp-demo"

# build in main and send to release branch
echo "Start compile $package_name"

# export REACT_APP_PACKAGE_NAME=$package_name
# Compile
pnpm build

echo "End compile $package_name"

rm -rf docs/
# mkdir -p docs
mv dist docs
# cp -r dist/* docs/

# cache docs
git stash -u

# Checkout to release branch
git checkout release

# delete old docs
rm -rf docs/

git stash pop

git add .
git commit -m "Deploy for $package_name"

echo "Start push $package_name"

git push
git checkout main

clean
rimraf docs
