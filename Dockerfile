FROM node:22-bookworm-slim AS build

WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY contracts/ contracts/
COPY catalog.json ./
COPY bin/ bin/
COPY tests/ tests/
RUN npm run build \
    && npm test

FROM node:22-bookworm-slim
WORKDIR /app
COPY --from=build --chown=node:node /workspace/catalog.json ./catalog.json
COPY --from=build --chown=node:node /workspace/bin/ ./bin/
USER node
ENTRYPOINT ["node", "bin/stakeholder.mjs"]
