#!/bin/bash

# Create directories if they don't exist
mkdir -p src/components/figma src/components/ui

# Copy component files
cp -r components/figma/* src/components/figma/
cp -r components/ui/* src/components/ui/
cp components/*.tsx src/components/

echo "Component files copied to src/components/" 