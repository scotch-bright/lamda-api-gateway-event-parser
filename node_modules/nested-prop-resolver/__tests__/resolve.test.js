import { resolve } from '../src/index';

describe('Resolver tests', () => {
  test('nested prop test', () => {
    const obj = {
      user: {
        name: 'Hiran'
      }
    };
    const name = resolve(obj, 'user.name');
    expect(name).toBe('Hiran');
  });

  test('unpresent nested prop test', () => {
    const obj = {
      user: {
        name: 'Hiran'
      }
    };
    const name = resolve(obj, 'user.age');
    expect(name).toBe(undefined);
  });

  test('unpresent nested prop with defaultValue test', () => {
    const obj = {
      user: {
        name: 'Hiran'
      }
    };
    const name = resolve(obj, 'user.age', 'n/a');
    expect(name).toBe('n/a');
  });

  test('nested array prop test', () => {
    const obj = {
      users: [
        {
          name: 'Hiran'
        }
      ]
    };
    const name = resolve(obj, 'users[0].name');
    expect(name).toBe('Hiran');
  });

  test('complex nested array prop test', () => {
    const obj = [
      {
        users: [
          {
            name: 'Hiran'
          }
        ]
      }
    ];
    const name = resolve(obj, '[0].users[0].name');
    expect(name).toBe('Hiran');
  });

  test('unpresent nested array prop test', () => {
    const obj = {
      users: [
        {
          name: 'Hiran'
        }
      ]
    };
    const name = resolve(obj, 'users[0].age');
    expect(name).toBe(undefined);
  });

  test('unpresent nested array prop with defaultValue test', () => {
    const obj = {
      users: [
        {
          name: 'Hiran'
        }
      ]
    };
    const name = resolve(obj, 'users[0].age', 'none');
    expect(name).toBe('none');
  });
});
