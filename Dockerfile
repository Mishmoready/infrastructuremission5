# Use an official lightweight Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /mission5/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the local app files to the container
COPY . .

# Set the API’s port number
EXPOSE 3000

# Specify the command to run on container start
CMD [ "node", "server.js" ]