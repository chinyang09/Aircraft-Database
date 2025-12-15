# Aircraft-Database

This repository contains a compressed aircraft reference dataset (NDJSON) 
suitable for CDN hosting (e.g., jsDelivr) and offline use in applications.

## Data Contents

Each NDJSON line has the following fields:

| Field         | Type     | Description |
|---------------|----------|-------------|
| `icao`        | string   | ICAO 24-bit hex address |
| `reg`         | string | Registration (may be null) |
| `icaotype`    | string | ICAO type designator |
| `short_type`  | string | Short type |
| `manufacturer`| string | Manufacturer name |
| `model`       | string | Aircraft model |
| `year`        | number | Year of manufacture |
| `ownop`       | string | Owner/operator |
| `mil`         | boolean | Military aircraft flag |
| `faa_pia`     | boolean | FAA PIA privacy indicator |
| `faa_ladd`    | boolean | FAA LADD privacy indicator |

## Usage

This file is NDJSON, suitable for line-by-line parsing in the browser.# Aircraft-Database

This repository contains a compressed aircraft reference dataset (NDJSON) 
suitable for CDN hosting (e.g., jsDelivr) and offline use in applications.

## Data Contents

Each NDJSON line has the following fields:

| Field         | Type     | Description |
|---------------|----------|-------------|
| `icao`        | string   | ICAO 24-bit hex address |
| `reg`         | string | Registration (may be null) |
| `icaotype`    | string | ICAO type designator |
| `short_type`  | string | Short type |
| `manufacturer`| string | Manufacturer name |
| `model`       | string | Aircraft model |
| `year`        | number | Year of manufacture |
| `ownop`       | string | Owner/operator |
| `mil`         | boolean | Military aircraft flag |
| `faa_pia`     | boolean | FAA PIA privacy indicator |
| `faa_ladd`    | boolean | FAA LADD privacy indicator |

## Usage

This file is NDJSON, suitable for line-by-line parsing in the browser.