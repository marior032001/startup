#!/bin/bash

# Parse input arguments
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;  # Path to PEM key file
        h) hostname=${OPTARG};;  # Target hostname
        s) service=${OPTARG};;  # Service name
    esac
done

# Validate input arguments
if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    echo -e "\nMissing required parameter."
    echo -e "Syntax: sudo ./deployService.sh -k <pem key file> -h <hostname> -s <service>\n"
    exit 1
fi

echo -e "\n----> Deploying service '$service' to '$hostname' using key '$key'\n"

# Step 1: Pre-deployment setup on the server
echo -e "\n----> Setting up server dependencies on $hostname\n"
ssh -t -i "$key" ubuntu@"$hostname" << 'ENDSSH'
    echo "Updating server and installing dependencies..."
    sudo apt update
    sudo apt install -y nodejs npm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    source ~/.nvm/nvm.sh
    nvm install 18
    nvm use 18
    sudo npm install -g pm2
    echo "Server setup complete!"
ENDSSH

# Step 2: Build and prepare the distribution package
echo -e "\n----> Preparing the distribution package\n"
rm -rf build
mkdir build
# Copy everything except node_modules and build artifacts
rsync -av --exclude="node_modules" --exclude="build" ./ build/
npm install --omit=dev
echo -e "Distribution package prepared successfully.\n"

# Step 3: Clear out the previous distribution on the target
echo -e "\n----> Clearing out previous distribution on the target\n"
ssh -t -i "$key" ubuntu@"$hostname" << ENDSSH
    echo "Removing old distribution..."
    rm -rf services/${service}
    mkdir -p services/${service}
    echo "Previous distribution cleared!"
ENDSSH

# Step 4: Copy the distribution package to the target
echo -e "\n----> Copying the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@"$hostname":services/"$service"
if [[ $? -ne 0 ]]; then
    echo -e "\nError: Failed to copy files to the server.\n"
    exit 1
fi
echo -e "Files copied successfully.\n"

# Step 5: Deploy the service on the target
echo -e "\n----> Deploying the service on the target\n"
ssh -t -i "$key" ubuntu@"$hostname" << ENDSSH
    echo "Starting deployment on the server..."
    cd services/${service}
    npm install
    pm2 restart ${service} || pm2 start service.js --name ${service}
    echo "Service deployed successfully!"
ENDSSH

# Step 6: Clean up local build files
echo -e "\n----> Cleaning up local build files\n"
rm -rf build
echo -e "Local cleanup completed."

echo -e "\n----> Deployment completed successfully!\n"
