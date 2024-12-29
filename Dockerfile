# Dockerfile for frontend

# Use a Node.js base image for building
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code and build
COPY . .
RUN npm run build

# Use a lightweight Nginx image for serving the frontend
FROM nginx:alpine

# Copy built files from the previous stage to the Nginx container
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 3000

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
