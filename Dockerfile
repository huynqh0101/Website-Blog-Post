# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy environment variables
COPY .env .env

# Copy the rest of the project
COPY . .

# Thiết lập biến môi trường để bỏ qua TypeScript
ENV NEXT_DISABLE_TYPE_CHECKING=1

# Build app (Next.js sẽ tạo .next folder)
RUN npm run build --no-lint

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]