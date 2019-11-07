# Magazine Example

This is an open-source demo magazine for developers working with the Livingdocs service.
By default it will run with mock data from the `mocks` folder. An online version can be found on https://magazine-example.livingdocs.io

In order to run it locally with your own data, you will need to create an access token in Livingdocs and add it to `conf/environments/local.js`.

The design is written in scss and you find the sources in `design/source/stylesheets`. This is a good place to start making the magazine look like yours.

Before starting to develop make sure to check out our SDK: https://github.com/livingdocsIO/livingdocs-node-sdk

## Prerequisites
Node v8.x.x

## Getting Started

### First of all

```
npm install
```

### Running the demo magazine locally (dev mode with mocks)

Start the server:

```
ENVIRONMENT=local npm start
```

To automatically open the magazine in the browser run:

```
ENVIRONMENT=local npm run start:open
```

### Running the demo magazine locally (dev mode with backend data source, no mocks)

Open `conf/environments/local.js` and set your target data source, e.g. see client:

```js
module.exports = {
  client: {
    url: 'https://server.livingdocs.io', // we take the production livingdocs service server here
    accessToken: 'your access token' // the access token to your magazine project
  },
  imageServices: {
    imgix: {
      host: 'https://livingdocs-dev.imgix.net'
    }
  }
}
```

Start the server:

```
ENVIRONMENT=local npm run design:dev
```

To automatically open the magazine in the browser run:

```
ENVIRONMENT=local npm run design:dev:open
```

### Running the demo magazine for production (no dev helpers and watchers)

Build the design:

```
npm run design:build
```

Start the server:

```
ENVIRONMENT=local npm run start:magazine
```
(or use your custom environment e.g. `production`, make sure to create a corresponding file under `conf/environments`, learn more about this on the "Deploy to now.sh" section)

To run the demo magazine with mocks in production mode:

```
ENVIRONMENT=local npm run start:magazine -- --mocked
```

### Deploy to now.sh

The deployment to now.sh serves as a sample deployment.

1. Create an account on https://zeit.co/now
2. Add a file `now.js` to `conf/environments` with the following content:

```js
/* eslint-disable max-len */

module.exports = {
  client: {
    url: 'https://server.livingdocs.io',
    accessToken: 'your access token'
  },
  imageServices: {
    imgix: {
      host: 'https://livingdocs-dev.imgix.net'
    }
  }
}
```
(make sure to replace `'your access token'`)

3. From your command line at the root directory of this repository run `rm -rf node_modules && npm install && now`
