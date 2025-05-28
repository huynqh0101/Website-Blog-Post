# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Global dependencies
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev python3

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build project và rebuild better-sqlite3
RUN npm run build
RUN npm rebuild better-sqlite3 --build-from-source

# Runtime configuration
ENV NODE_ENV=production
ENV PORT=1337

# Expose port
EXPOSE 1337

# Start command
CMD ["npm", "run", "start"]