import assert from 'assert/strict'
import { V } from './verticalize.min.js'


assert.equal( 3,
    V( [1, 2, 3],
    V .toReversed(),
    V .filter(n => n > 1),
    V .length,
    V (n => n + 0.7),
    V (Math.round),
    )
)

async function asyncInc(n) {
    return await new Promise(resolve => setTimeout(resolve(n + 1), 50))
}

assert.equal( 9,
    await
    V( 1,
    V (asyncInc),
    V (n => Promise.resolve([n -1, n, n + 1])),
    V .toReversed(),
    V .length,
    V (async p => await p),
    V (n => n * 3),
    )
)

// README examples

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

async function send(msg) {
    return await new Promise(resolve => setTimeout(resolve({ msg, status: 200 }), 50))
}

assert.equal( 200,
    await
    V( "hi",
    V (capitalize),
    V .concat("!"),
    V (send),
    V .status,
    )
)

assert.equal( "HELLO!",
    await
    V( Promise.resolve("Hello!"),
    V .toUpperCase(),
    )
)

assert.equal( "HELLO!",
    await
    Promise.resolve("Hello!")
    .then(s => s.toUpperCase())
)
