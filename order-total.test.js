const orderTotal = require('./order-total');

// Quantity
it('Quantity', () => 
    expect(orderTotal({
        items: [
            { name: 'Dragon Candy', price: 2, quantity: 3 },
        ]
    })).toBe(6));

// No quantity specified
it('No quantity specified', () => 
    expect(orderTotal({
        items: [
            { name: 'Dragon  Food', price: 3 },
        ]
    })).toBe(3));

// Happy path! (Example 1)
it('Happy path! (Example 1)', () =>
    expect(orderTotal({
        items: [
            { name: 'Dragon Food', price: 8 },
            { name: 'Dragon Cage (small)', price: 800 }
        ]
    })).toBe(808));

// Happy path! (Example 2)
it('Happy path! (Example 2)', () => 
    expect(orderTotal({
        items: [
            { name: 'Dragon Collar', price: 20 },
            { name: 'Dragon Chew Toy', price: 40 }
        ]
    })).toBe(60));


