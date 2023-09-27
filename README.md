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

The following example code is a bit hard to read:

```js
const { status } = await send(capitalize(greeting) + "!")
console.log(status)
```

Make it less nested, more *vertical*, by using the `V` "pipe":

```js
V( greeting,     // initial value ➡ "hi"
V (capitalize),  // custom function call ➡ "Hi"
V .concat("!"),  // String method `concat` call ➡ "Hi!"
V (send),        // custom async function call ➡ Promise { <pending> }
V .status,       // automatic promise chaining + getting property ➡ Promise { 200 }
V (console.log), // automatic promise chaining + global function call ➡ logs 200
)
```

If your IDE or a tool like Prettier automatically formats the code for you, it may result in the following syntax (still working):

```js
V(greeting,
  V(capitalize),
  V.concat("!"),
  V(send),
  V.status,
  V(console.log),
)
```

Verticalize’s `V` function is around 200 bytes minified and compressed, without dependencies. It won’t bloat your web app.

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

Verticalize uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), [widely supported](https://caniuse.com/es6-module) in browsers nowadays. Import the `V` function from the `verticalize.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance and to be GDPR compliant, since you don’t have to connect to a third party server).

```html
<script type="module">
  import { V } from 'https://cdn.jsdelivr.net/npm/verticalize@0.1.2/verticalize.min.js'
</script>
```

## `V` function usage

The gist example above covers pretty much everything. Just call the `V` function with the initial *value* as the first argument, followed by the other arguments wrapped by another `V` at the beginning of the line to get a nice <sub><img src="verticalize.svg" alt="triple chevron down" width="18" height="18"></sub> syntax. All these `V`-prefixed lines will then act like a pipeline, the output of a pipe being the input of the following pipe. Pipes can use unary functions, methods and properties, but not values (except for the initial value).

### Unary functions

A unary function is a function that takes only one argument. You can use an anonymous ("arrow") function to turn a multi-argument function into a unary one.

```js
V( 1.9,                  // initial value
V (Math.round),          // unary function
V (n => Math.pow(n, 3)), // binary function turned into unary
) // returns 8
```

### Methods and properties

To call a method or to get a property of the previous pipe output (or of the initial value), you can use an anonymous function like `count => count.add(1)`, but or convenience Verticalize allows you to use a direct dot syntax.

```js
V ( [1, 2, 3],        // initial Array value
V .concat([4, 5, 6]), // calling the Array method `concat()` (returning an Array)
V .length,            // getting the Array property `length`
) // returns 6
```

### Promises

When the previous pipe output (or the initial value) is a promise, the next pipe will automatically chain it so you don’t have to write many `.then()` yourself.

```js
const greeting =
  await
  V( Promise.resolve("Hello!"),
  V .toUpperCase(),
  )
```
is the same as
```js
const greeting =
  await Promise.resolve("Hello!")
    .then(s => s.toUpperCase())
```

## Note

[A TC39 proposal](https://github.com/tc39/proposal-pipeline-operator) for the pipe operator `|>` was created in 2021 and is currently in stage 2. It may or may not be included in the official JavaScript specs in a few years. If so, then it will take a few more years to be adopted by all the major browsers and runtimes. But you can use Verticalize *right now* and enjoy its unique dot syntax and automatic promise chaining features :wink:

## License

[MIT](https://github.com/laurentpayot/verticalize/blob/main/LICENSE)

## Stargazers :heart:

[![Stargazers repo roster for @laurentpayot/verticalize](https://reporoster.com/stars/laurentpayot/verticalize)](https://github.com/laurentpayot/verticalize/stargazers)
