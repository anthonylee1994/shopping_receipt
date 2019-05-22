export default {
    productCategories: {
        food: [
            "potato chips"
        ],
        clothing: [
            "shirt"
        ],
        others: [
            "pencil",
            "book"
        ]
    },
    taxRates: {
        CA: {
            rate: 0.0975,
            exempt_categories: [
                "food"
            ]
        },
        NY: {
            rate: 0.08875,
            exempt_categories: [
                "food",
                "clothing"
            ]
        }
    }
}
