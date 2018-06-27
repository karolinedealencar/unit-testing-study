const orderTotal = require('./order-total');

const emptyFunction = () => {};

// Calls vat API
it('Calls vatapi.com correctly', () => {
    let isFakeFetchCalled = false;
    const fakeFetch = (url) => {
        expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE');
        isFakeFetchCalled = true;
    }
    orderTotal(fakeFetch, {
        country: 'DE',
        items: [
            { name: 'Dragon Waffles', price: 20, quantity: 2 },
        ]
    }).then(result => {
        expect(isFakeFetchCalled).toBe(true);
    });
});

// Quantity
it('Quantity', () => 
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon Candy', price: 2, quantity: 3 },
        ]
    }).then(result => expect(result).toBe(6)));

// No quantity specified
it('No quantity specified', () => 
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon  Food', price: 3 },
        ]
    }).then(result => expect(result).toBe(3)));

// Happy path! (Example 1)
it('Happy path! (Example 1)', () =>
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon Food', price: 8 },
            { name: 'Dragon Cage (small)', price: 800 }
        ]
    }).then(result => expect(result).toBe(808)));

it('Happy path! (Example 2)', () => 
    orderTotal(emptyFunction, {
        items: [
            { name: 'Dragon Collar', price: 20 },
            { name: 'Dragon Chew Toy', price: 40 }
        ]
    }).then(result => expect(result).toBe(60)));


