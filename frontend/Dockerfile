# Base image
FROM node:20-slim AS base
RUN corepack enable
COPY . /app
WORKDIR /app

# Expose
EXPOSE 4173

# Set the timezone
ENV TZ=America/Buenos_Aires
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create a new image for production dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Create build image for building the TypeScript code
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

# Production Stage
FROM base AS prod
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN rm -rf /app/src /app/public /app/Dockerfile /app/start.sh

CMD ["pnpm", "preview"]
