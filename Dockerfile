# Stage 1: Build the application
FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application with SSR
RUN npm run build

# Stage 2: Setup production environment
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist/meteo-front ./dist/meteo-front
COPY --from=builder /app/package*.json ./

# Installer uniquement les dépendances nécessaires pour la production
RUN npm ci --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose port 4000 (default SSR port)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:4000/ || exit 1

# Start the SSR server
CMD ["npm", "run", "serve:ssr:meteo-front"]
