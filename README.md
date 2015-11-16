# Redux Nest

> Redux middleware for wrapping store in a Proxy to help with complex nested states.

## Getting Started

You need to `import` the module and then include it in the `applyMiddleware` invocation.

```javascript
import {createStore, applyMiddleware} from 'redux';
import {nest} from 'redux-nest';

// ...

const createStoreWithMiddleware = applyMiddleware(nest)(createStore);
```

From there any data that passes through the store will be wrapped in a `Proxy` that will prevent `undefined` from causing issues when you chain properties.

In the following case, even if `person` is undefined it will still succeed and simply print nothing:

```html
<label>
    {store.person.name}
</label>
```

### Is Defined?

As the data is wrapped in a `Proxy` you cannot do the usual check of `typeof x === 'undefined'` because now `x` is an instance of `Proxy` &mdash; to allow you to check if `x` is `undefined`, `redux-nest` provides two functions.

```javascript
import {isDefined, isUndefined} from 'redux-nest';

// ...

if (isDefined(x)) {

}
