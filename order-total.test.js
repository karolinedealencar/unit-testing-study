const orderTotal = require('./order-total');

// Calls vat API
it('Calls vatapi.com correctly', () => {
    const fakeProcess = {
        'apiKey': 'key123'
    }

    const fakeFetch = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            rates: {
                standard: {
                    value: 19
                }
            }
        })
    }));

    return orderTotal(fakeFetch, fakeProcess, {
        country: 'DE',
        items: [
            { name: 'Dragon Waffles', price: 20, quantity: 2 },
        ]
    }).then(result => {
        expect(result).toBe(20 * 2 * 1.19);
        expect(fakeFetch).toBeCalledWith('https://vatapi.com/v1/country-code-check?code=DE',
        { "headers": { "apiKey": "key123" } } );
    });
});

// Quantity
it('Quantity', () => 
    orderTotal(null, null, {
        items: [
            { name: 'Dragon Candy', price: 2, quantity: 3 },
        ]
    }).then(result => expect(result).toBe(6)));

// No quantity specified
it('No quantity specified', () => 
    orderTotal(null, null, {
        items: [
            { name: 'Dragon  Food', price: 3 },
        ]
    }).then(result => expect(result).toBe(3)));

// Happy path! (Example 1)
it('Happy path! (Example 1)', () =>
    orderTotal(null, null, {
        items: [
            { name: 'Dragon Food', price: 8 },
            { name: 'Dragon Cage (small)', price: 800 }
        ]
    }).then(result => expect(result).toBe(808)));

it('Happy path! (Example 2)', () => 
    orderTotal(null, null, {
        items: [
            { name: 'Dragon Collar', price: 20 },
            { name: 'Dragon Chew Toy', price: 40 }
        ]
    }).then(result => expect(result).toBe(60)));


