# About

Nine Coding Challenge App

## Requirements

- Node.js v8 or higher

## Installation

```bash
npm install
```

## Usage

#### Run locally

```bash
npm run start
```

#### Run public server

```bash
lt --port 8000 --subdomain <domain name>
```
The API can be accessed by POST to 
```bash
<domain name>/test
```
##### API Request body standard
request body should be json and follow this format

```
{
  "payload": [
    {
      drm: true,
      episodeCount: 1,
      slug: "slug",
      title: "title",
      image: {
        showImage: "image_url",
      },
      ...
    }
  ]
}
```

## Running tests

#### Unit tests

Unit tests sit next to source files.

```bash
npm run test:unit
```

## API Response Standard

API responses should follow this format.

```
{
    "response": [
        {
          image: "image_url",
          slug: "slug",
          title: "title",
        },
      ],
}
```
