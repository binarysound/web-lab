#!/bin/bash
export PATH="/root/.yarn/bin:/root/.config/yarn/global/node_modules/.bin:$PATH"

cd /code

if [ -d "node_modules" ]; then
    echo "node_modules already exists. Verifying tree..."
    yarn check --verify-tree
    if [ $? -ne 0 ]; then
        echo "node_modules does not match package.json. Removing..."
        rm -rf node_modules
        echo "Copying node_modules..."
        cp -r /build/node_modules .
    fi
else
    echo "Coyping node_modules..."
    cp -r /build/node_modules .
fi

yarn run dev
