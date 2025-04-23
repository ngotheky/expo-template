#!/bin/bash

# Script to create keystore for Android app
# Based on the README guide
#
# This script helps with creating a keystore for Android app builds
# It follows these steps:
# 1. Sets up the environment (.env file)
# 2. Creates credentials directory if needed
# 3. Runs EAS credentials utility for Android
# 4. Guides you through the process of creating and downloading keystore
#
# After running this script, your keystore will be:
# - Created on EAS server
# - Downloaded to your credentials/ directory
# - Added to credentials.json file
# - Ready for Android builds

# Color codes for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}==== Android Keystore Generator ====${NC}"
echo -e "${YELLOW}This script will help you create and configure a keystore for your Android app${NC}"
echo ""

# Copy production env file to .env if it exists
if [ -f .env.production ]; then
  cp .env.production .env
  echo -e "${GREEN}✓ Copied .env.production to .env${NC}"
else
  echo -e "${YELLOW}Warning: .env.production not found. Using existing .env file.${NC}"
fi

# Create credentials directory if it doesn't exist
mkdir -p credentials
echo -e "${GREEN}✓ Ensured credentials directory exists${NC}"

# Run EAS credentials command
echo -e "${GREEN}Starting EAS credentials tool...${NC}"
echo -e "${YELLOW}Please follow these steps:${NC}"
echo -e "1. Select platform: ${GREEN}Android${NC}"
echo -e "2. Choose profile: ${GREEN}production${NC}"
echo -e "3. Select: ${GREEN}Keystore: Manage everything needed to build your project${NC}"
echo -e "4. Choose: ${GREEN}Set up a new keystore${NC} and press enter"
echo -e "5. After creating keystore, press enter, then select ${GREEN}Go back${NC}"
echo -e "6. Select: ${GREEN}credentials.json: Upload/Download credentials between EAS servers and your local json${NC}"
echo -e "7. Choose: ${GREEN}Download credentials from EAS to credentials.json${NC}"
echo -e "8. Press enter to return to menu, then select ${GREEN}Upload credentials from credentials.json to EAS${NC}"
echo ""
echo -e "${YELLOW}Starting EAS credentials now...${NC}"
echo ""

# Run the EAS credentials command
npx eas credentials

echo ""
echo -e "${GREEN}✓ Keystore setup process completed${NC}"
echo -e "${YELLOW}If you followed all steps correctly, your keystore should be configured for Android builds.${NC}"
echo -e "${GREEN}You can now run Android production builds with: npm run build-android-prod${NC}" 