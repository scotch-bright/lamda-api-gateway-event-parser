## Nested Prop Resolver
This library helps you to find and get a nested property from a complex json object without any runtime error.
You can use this to resolve json properties from an api response.

eg:

```js
const responseObj = {
  user: {
    name: 'Hiran'
  }
};


const officeAddress = responseObj.office.address; // This will give you a runtime error since there is no 'office' property in api response object.
```

So, use the 'nested-prop-resolver' to prevent runtime errors.

```js

// With the default value
const officeAddress = resolve(responseObj, 'office.address', 'N/A'); // Output is 'N/A'. No runtime error.

// Without the default value
const officeAddress = resolve(responseObj, 'office.address'); // Output is 'undefined'. No runtime error.

// Note: Default value is optional

const userName = resolve(responseObj, 'user.name'); // Output is 'Hiran'.
```


## Install
```sh
yarn nested-prop-resolver
```
or
```sh
npm install nested-prop-resolver --save

```

### Example

```js
import { resolve } from 'nested-prop-resolver';

// For nested props
const responseObj = {
  user: {
    name: 'Hiran'
  }
};

const name = resolve(responseObj, 'user.name'); // Output is 'Hiran'.


// For nested arrays
const responseObj = {
  users: [
    {
      name: 'Hiran'
    }
  ]
};

const name = resolve(responseObj, 'users[0].name'); // Output is 'Hiran'.


// For complex nested arrays
const responseObj = [
  {
    users: [
      {
        name: 'Hiran'
      }
    ]
  }
];

const name = resolve(responseObj, '[0].users[0].name'); // Output is 'Hiran'.


// For unpresent nested props.
const responseObj = {
  user: {
    name: 'Hiran'
  }
};

// With default value
const age = resolve(responseObj, 'user.age', 'Not Given'); // Output is 'Not Given'.

// Without default value.
const age = resolve(responseObj, 'user.age'); // Output is 'undefined'.

```


## License

MIT © [H.R. Hiran Peiris](https://github.com/hiranpeiris)
