# V-pipe <sub><img src="v-pipe.svg" alt="triple chevron down" width="48" height="48"></sub>

A delightful pipe operator for JavaScript

![minified + brotlied size](https://badgen.net/badgesize/brotli/laurentpayot/v-pipe/main/v-pipe.min.js)
![minified + zipped size](https://badgen.net/badgesize/gzip/laurentpayot/v-pipe/main/v-pipe.min.js)

<!-- [![dependencies](https://badgen.net/bundlephobia/dependency-count/v-pipe)](https://bundlephobia.com/package/v-pipe) -->
[![dependencies](https://img.shields.io/badge/dependencies-None-green)](https://github.com/laurentpayot/v-pipe/blob/main/package.json#L60)
[![types](https://badgen.net/npm/types/v-pipe)](https://github.com/laurentpayot/v-pipe/blob/main/index.d.ts)
[![npm](https://badgen.net/npm/v/v-pipe)](https://www.npmjs.com/package/v-pipe)
[![license](https://badgen.net/github/license/laurentpayot/v-pipe)](https://github.com/laurentpayot/v-pipe/blob/main/LICENSE)

## Why

Make the following code

```js
const { status } = await send(capitalize(greeting) + "!")
console.log(status)
```

easier to understand by using the `V` pipe:

```js
V( greeting,    // pipe entrance ➡ "hi"
V (capitalize), // custom function call ➡ "Hi"
V .concat("!"), // String method call ➡ "Hi!"
V (send),       // custom async function call ➡ Promise {<pending>}
V .status,      // automatic promise chaining + getting property value ➡ 200
V (console.log) // global function call ➡ logs 200 to the console
)
```

## NodeJS

### Installation

```bash
npm install v-pipe
```

### Import

```js
import { V } from 'v-pipe'
```

## Browser

V-pipe uses [ES modules](https://jakearchibald.com/2017/es-modules-in-browsers/), now [widely supported](https://caniuse.com/es6-module) in browsers. Import the `V` function from the `v-pipe.min.js` file. This file can be located in a CDN (example below) or copied in any directory of your website (for better performance and to be GDPR compliant, since you don’t have to connect to a third party server).

```html
<script type="module">
  import { V } from 'https://cdn.jsdelivr.net/npm/v-pipe@0.1.0/v-pipe.min.js'
</script>
```

## V() function arguments

### Unary function call `fn(x)`

```js
V (fn)
```

### Anonymous unary function call `x => x + 1`

```js
V (x => x + 1)
```

### Method call `obj.fn(x, y, z)`

```js
V .fn(x, y, z)
```

### Get property value `obj.prop`

```js
V .prop
```

### Promises

When the output of a pipe is a promise, the next pipe automatically chains it so you don’t need to use a `.then()`.

```js
const greeting =
  await
  V( Promise.resolve("Hello!")
  V .toUpperCase()
  )
```
is the same as
```js
const greeting =
  await Promise.resolve("Hello!")
    .then(s => s.toUpperCase())
```

## License

[MIT](https://github.com/laurentpayot/v-pipe/blob/main/LICENSE)

## Stargazers :heart:

[![Stargazers repo roster for @laurentpayot/v-pipe](https://reporoster.com/stars/laurentpayot/v-pipe)](https://github.com/laurentpayot/v-pipe/stargazers)
