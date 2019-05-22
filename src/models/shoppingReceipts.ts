import get from 'lodash/get';
import config from '../config';

export default {
    namespace: 'shoppingReceipts',
    state: {
        items: [],
        subTotal: 0,
        tax: 0,
        total: 0,
    },
    reducers: {
        updateReceipt(state: any, action: any) {
            const json = get(action, 'json');
            const location = get(json, 'location');
            const products = get(json, 'products', []);
            return {
                ...state,
                ...products.reduce((acc: any, p: any) => {
                    const subTotal = Number(Number(acc.subTotal + p.price * p.quantity).toFixed(2));
                    const tax = (() => {
                        const category = Object.keys(config.productCategories).find((c) => (config.productCategories as any)[c].indexOf(p.name) !== -1);
                        const rate = get(config, `taxRates.${location}.rate`);
                        if (!category || !rate || get(config, `taxRates.${location}.exempt_categories`, []).indexOf(category) !== -1) {
                            return acc.tax;
                        }
                        return Number(Number(Math.ceil((acc.tax + p.price * p.quantity * rate) * 20) / 20).toFixed(2));
                    })();
                    return {
                        ...acc,
                        items: [...acc.items, p],
                        subTotal,
                        tax,
                        total: Number(Number(subTotal + tax).toFixed(2))
                    };
                }, {
                        items: [],
                        subTotal: 0,
                        tax: 0,
                        total: 0,
                    })
            };
        }
    },
}
