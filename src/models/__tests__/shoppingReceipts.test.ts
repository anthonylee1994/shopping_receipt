import 'jest';
import model from '@/models/shoppingReceipts';

describe('Shopping Receipts', () => {
    it('case one', () => {
        const json = {
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
        };
        expect(model.reducers.updateReceipt(model.state, {
            type: `${model.namespace}/updateReceipt`,
            json,
        })).toEqual({
            "items": [
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
            ],
            "subTotal": 21.98,
            "tax": 1.8,
            "total": 23.78
        });
    });
    it('case two', () => {
        const json = {
            "location": "NY",
            "products": [
                {
                    "name": "book",
                    "price": 17.99,
                    "quantity": 1
                },
                {
                    "name": "pencil",
                    "price": 2.99,
                    "quantity": 3
                }
            ]
        };
        expect(model.reducers.updateReceipt(model.state, {
            type: `${model.namespace}/updateReceipt`,
            json,
        })).toEqual({
            "items": [
                {
                    "name": "book",
                    "price": 17.99,
                    "quantity": 1
                },
                {
                    "name": "pencil",
                    "price": 2.99,
                    "quantity": 3
                }
            ],
            "subTotal": 26.96,
            "tax": 2.4,
            "total": 29.36
        });
    });
    it('case three', () => {
        const json = {
            "location": "NY",
            "products": [
                {
                    "name": "pencil",
                    "price": 2.99,
                    "quantity": 2
                },
                {
                    "name": "shirt",
                    "price": 29.99,
                    "quantity": 1
                }
            ]
        };
        expect(model.reducers.updateReceipt(model.state, {
            type: `${model.namespace}/updateReceipt`,
            json,
        })).toEqual({
            "items": [
                {
                    "name": "pencil",
                    "price": 2.99,
                    "quantity": 2
                },
                {
                    "name": "shirt",
                    "price": 29.99,
                    "quantity": 1
                }
            ],
            "subTotal": 35.97,
            "tax": 0.55,
            "total": 36.52
        });
    });
});
