# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Create volume for persistent storage
VOLUME /app/data

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 