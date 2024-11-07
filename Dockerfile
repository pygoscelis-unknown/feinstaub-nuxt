FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

# Needs to be removed because otherwise pnpm tries to install a rollup package for arm64 which is not available
RUN rm pnpm-lock.yaml

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]