# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install

# Copy source code
COPY . .
COPY .env.server .env


RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built assets
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/

# Install a lightweight server (serve)
RUN npm install -g serve

EXPOSE ${PORT:-3001}
# Use shell form to allow environment variable expansion
CMD serve -s dist -l ${PORT:-3001}