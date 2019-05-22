# Shopping Receipt Test

## How to Start
```bash
yarn build
npm install -g serve
serve ./dist
# Browse: http://localhost:5000
```

## How to run test case
```bash
yarn test
```

## Upload JSON file sample (See `/sample.json`)
```json
{
    "location": "CA",
    "products": [
        {
            "name": "book",
            "price": 17.99,
            "quantity": 1
        },
        {
            "name": "potato chips",
            "price": 3.99,
            "quantity": 1
        }
    ]
}
```