# <sub><img src="verticalize.svg" alt="triple chevron down" width="48" height="48"></sub> Verticalize

A pipe-like function to verticalize your JavaScript code

<!-- [![dependencies](https://badgen.net/bundlephobia/dependency-count/verticalize)](https://bundlephobia.com/package/verticalize) -->
[![dependencies](https://badgen.net/static/dependencies/None/green)](https://github.com/laurentpayot/verticalize/blob/main/package.json#L56)
![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/verticalize/main/verticalize.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/verticalize/main/verticalize.min.js)

[![types](https://badgen.net/npm/types/verticalize)](https://github.com/laurentpayot/verticalize/blob/main/index.d.ts)
[![npm](https://badgen.net/npm/v/verticalize)](https://www.npmjs.com/package/verticalize)
[![license](https://badgen.net/github/license/laurentpayot/verticalize)](https://github.com/laurentpayot/verticalize/blob/main/LICENSE)

## Gist

Make the following example code

```js
const { status } = await send(capitalize(greeting) + "!")
console.log(status)
```

more readable by using the `V` pipe-like function:

```js
V( greeting,     // pipe entrance ➡ "hi"
V (capitalize),  // custom function call ➡ "Hi"
V .concat("!"),  // String method call ➡ "Hi!"
V (send),        // custom async function call ➡ Promise {<pending>}
V .status,       // automatic promise chaining + getting property value ➡ 200
V (console.log), // global function call ➡ logs 200 to the console
)
```

The `V` function of Verticalize is only [20 lines of code](https://github.com/laurentpayot/verticalize/blob/main/verticalize.js) long, without dependencies, and around 200 bytes minified and compressed so it won’t bloat your bundle.

## NodeJS

### Installation

```bash
npm install verticalize
```

### Import

```js
import { V } from 'verticalize'
```

## Browser

Verticalize uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers. Import the `V` function from the `verticalize.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance and to be GDPR compliant, since you don’t have to connect to a third party server).

```html
<script type="module">
  import { V } from 'https://cdn.jsdelivr.net/npm/verticalize@0.1.0/verticalize.min.js'
</script>
```

## `V` function usage

The gist example above covers pretty much everything.

Just call the `V` function with the initial *value* as the first argument, followed the other arguments, each one wrapped by another `V` at the beginning of a new line.
These different types of wrapped arguments can be unary functions, methods or properties, but not values.

### Unary function call

A unary function is a function that takes only one argument. Add a new line and wrap your function with a `V` call to get a nice <sub><img src="verticalize.svg" alt="triple chevron down" width="18" height="18"></sub> syntax.

You can use an anonymous ("arrow") function to turn multi-argument functions into unary ones.

```js
V( 1.9,
V (Math.round),          // unary function
V (n => Math.pow(n, 3)), // binary function turned into unary
) // returns 8
```

### Method call

TO DO

```js
V .fn(x, y, z)
```

### Get property value

TO DO

```js
V .prop
```

### Promises

When a `V` function or method or property returns a promise, or the initial value is a Promise, the next `V` will automatically chain it so you don’t need to write many `.then()` yourself.

```js
const greeting =
  await
  V( Promise.resolve("Hello!")
  V .toUpperCase()
  ) // returns "HELLO!"
```
is the same as
```js
const greeting =
  await Promise.resolve("Hello!")
    .then(s => s.toUpperCase())
```

## Note

[A pipe operator `|>` TC39 proposal](https://github.com/tc39/proposal-pipeline-operator) was created in 2021 and is currently in stage 2. It may or may not be included in the official JavaScript specs in a few years. If so, then it will take a few more years to be adopted by all the major browsers and runtimes. But you can use Verticalize *right now* :wink:

## License

[MIT](https://github.com/laurentpayot/verticalize/blob/main/LICENSE)

## Stargazers :heart:

[![Stargazers repo roster for @laurentpayot/verticalize](https://reporoster.com/stars/laurentpayot/verticalize)](https://github.com/laurentpayot/verticalize/stargazers)
