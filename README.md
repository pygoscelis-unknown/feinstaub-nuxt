# feinstaub.app Frontend

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Changelog

We use [changelogen](https://github.com/unjs/changelogen) to generate our changelogs.

```
npx changelogen@latest
npx changelogen@latest --bump
npx changelogen@latest --release
```

<<<<<<< Updated upstream
=======
## Docker
We provide a Dockerfile to build a Docker image for the frontend. You can build the image with the following command:
```bash
docker build -t feinstaub-frontend .
docker run -p 3000:3000 feinstaub-frontend
```

## About the project

### Available Sensor Types
- bme280
- bmp280
- bmp180
- dht22
- ds18b20
- hpm
- htu21d
- pms1003
- pms3003
- pms5003
- pms6003
- pms7003
- ppd42ns
- sds011


#### BME280
- **Description:** A sensor that measures temperature, humidity, and atmospheric pressure.
- **Key Features:**
    - Combines three sensors in one package.
    - High accuracy and low power consumption.
    - Ideal for environmental monitoring.

#### BMP280
- **Description:** A sensor that measures atmospheric pressure and temperature.
- **Key Features:**
    - Optimized for low power consumption.
    - High accuracy for altitude measurement.
    - Suitable for wearable devices and GPS enhancement.

#### BMP180
- **Description:** An older generation sensor for measuring atmospheric pressure and temperature.
- **Key Features:**
    - High precision in pressure measurement.
    - Low power consumption.
    - Commonly used in mobile phones and GPS devices.

#### DHT22
- **Description:** A digital sensor that measures temperature and humidity.
- **Key Features:**
    - Low cost and easy to use.
    - Higher accuracy than the DHT11.
    - Suitable for indoor climate monitoring.

#### DS18B20
- **Description:** A digital temperature sensor.
- **Key Features:**
    - High precision temperature readings.
    - Operates over a wide temperature range.
    - Uses the 1-Wire protocol for communication.

#### HPM (Honeywell HPM Series)
- **Description:** A series of particulate matter sensors for detecting PM2.5 and PM10.
- **Key Features:**
    - Laser-based sensor for accurate particle detection.
    - Measures air quality with high precision.
    - Suitable for indoor and outdoor air quality monitoring.

#### HTU21D
- **Description:** A sensor that measures temperature and humidity.
- **Key Features:**
    - High accuracy and low power consumption.
    - Digital output with I2C interface.
    - Suitable for consumer products and weather stations.

#### PMS1003
- **Description:** A particulate matter sensor for measuring PM1.0, PM2.5, and PM10.
- **Key Features:**
    - Compact design.
    - Suitable for portable air quality monitors.
    - Laser-based particle counting.

#### PMS3003
- **Description:** A particulate matter sensor similar to the PMS1003 but with improved features.
- **Key Features:**
    - Measures PM1.0, PM2.5, and PM10.
    - Higher sensitivity and accuracy.
    - Laser-based detection technology.

#### PMS5003
- **Description:** A popular particulate matter sensor for measuring PM1.0, PM2.5, and PM10.
- **Key Features:**
    - High accuracy and consistency.
    - Widely used in air quality monitoring projects.
    - Laser-based measurement technology.

#### PMS6003
- **Description:** A particulate matter sensor for measuring PM1.0, PM2.5, and PM10.
- **Key Features:**
    - Compact and lightweight.
    - Low noise operation.
    - Ideal for portable and compact devices.

#### PMS7003
- **Description:** A particulate matter sensor similar to PMS5003 with enhanced features.
- **Key Features:**
    - High precision and sensitivity.
    - Low power consumption.
    - Suitable for indoor and outdoor use.

#### PPD42NS
- **Description:** An optical dust sensor that measures particulate matter.
- **Key Features:**
    - Low-cost sensor for PM2.5 detection.
    - Uses light scattering to measure dust particles.
    - Suitable for air purifiers and air quality monitors.

#### SDS011
- **Description:** A particulate matter sensor that measures PM2.5 and PM10.
- **Key Features:**
    - High sensitivity and accuracy.
    - Uses laser scattering for particle detection.
    - Ideal for air quality monitoring applications.
>>>>>>> Stashed changes
