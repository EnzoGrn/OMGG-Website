# Node.js Dockerfile for front-end application
FROM node:20-alpine

# Set working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy application source code
COPY . .

# ARG PORT
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_STRAPI_API_TOKEN

# ENV PORT=$PORT
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_API_TOKEN=$NEXT_PUBLIC_STRAPI_API_TOKEN

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
