# search-query-benchmark

## Install dependencies

```
yarn install
```

## Generate dummy data

```
yarn gen <--mongo (default) | --firebase>
```

## Test query time

```
yarn start <options>
```

- `--mongo` to query with MongoDB (default)
- `--firebase` or `--firestore` to query with Firestore
- `--size` followed by a number to set the size of the query (5 as default)

e.g.

> yarn start --size 500

> yarn start --mongo --size 5

## Setup

### Firestore

To test Firestore query time, first, initialise a project in Firebase console. Then, create a `.env` file with your own keys, for example:

```
apiKey=YOUR_FIREBASE_API_KEY,
projectId=YOUR_FIREBASE_PROJECT_ID,
```

### MongoDB

Create a `.env` file with the mongodb url, for example:

```
MONGO_DB_URL=mongodb://localhost:27017/brenchmark
```
