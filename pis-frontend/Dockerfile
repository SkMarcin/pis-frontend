# Stage 1: Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Build the application
RUN REACT_APP_API_BASE_URL=http://192.168.162.223:8180 npm run build

# Stage 2: Serve the React app with "serve"
FROM node:18-alpine

# Install the "serve" package globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/build ./build

EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "build", "-l", "3000"]

