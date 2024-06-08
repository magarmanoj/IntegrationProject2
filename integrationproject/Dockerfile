# Stage 1: Build Ionic app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install additional dependencies if needed
RUN npm install axios chart.js

# Copy the rest of the application code
COPY . .

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Build the Ionic app
RUN ionic build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built files from the previous stage to the NGINX static content directory

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80 to allow communication to/from the Nginx server
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
