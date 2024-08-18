# feinstaub.app Frontend

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Changelog

We use [changelogen](https://github.com/unjs/changelogen) to generate our changelogs.

```
npx changelogen@latest
npx changelogen@latest --bump
npx changelogen@latest --release
```

## Docker
We provide a Dockerfile to build a Docker image for the frontend. You can build the image with the following command:
```bash
docker build -t feinstaub-frontend .
docker run -p 3000:3000 feinstaub-frontend
```