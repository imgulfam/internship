# Stage 1: The 'Builder' stage
# This stage installs dependencies and builds our Next.js app.
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Stage 2: The 'Runner' stage
# This stage creates the final, lean image with only the necessary files to run the app.
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built application from the 'builder' stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# The command to start the app
CMD ["npm", "start"]