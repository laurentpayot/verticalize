import assert from 'assert/strict'
import { V } from './verticalize.min.js'


// README examples

const greeting = "hi"

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1)
}

async function send(msg) {
    return await new Promise(resolve => setTimeout(resolve({ msg, status: 200 }), 50))
}

const { status } = await send(capitalize(greeting) + "!")
assert.equal(200, status)

assert.equal(200,
    await
        V(greeting,
            V(capitalize),
            V.concat("!"),
            V(send),
            V.status,
        )
)

assert.equal(8,
    V(1.9,
        V(Math.round),
        V(n => Math.pow(n, 3)),
    )
)

assert.equal(6,
    V([1, 2, 3],
        V.concat([4, 5, 6]),
        V.length,
    )
)

assert.equal("HELLO!",
    await
        V(Promise.resolve("Hello!"),
            V.toUpperCase(),
        )
)

assert.equal("HELLO!",
    await
        Promise.resolve("Hello!")
            .then(s => s.toUpperCase())
)


// Other examples

assert.equal(
    V( [1, 2, 3],
    V .toReversed(),
    V .filter(n => n > 1),
    V .length,
    V (n => n + 0.7),
    V (Math.round),
    ),
    3
)

async function asyncInc(n) {
    return await new Promise(resolve => setTimeout(resolve(n + 1), 50))
}

assert.equal(
    await
    V( 1,
    V (asyncInc),
    V (n => Promise.resolve([n -1, n, n + 1])),
    V .toReversed(),
    V .length,
    V (async p => await p),
    V (n => n * 3),
    ),
    9
)

assert.equal(
    V (1,
    V.length,
    ),
    undefined
)


// Errors

assert.throws(
    () => {
        V( [1, 2, 3],
        V .length(),
        )
    },
    {
        name: 'Error',
        message: "Verticalize: Array value has no method .length()"
    }
)

assert.throws(
    () => {
        V( undefined,
        V .length,
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of undefined (reading 'length')"
    }
)

assert.throws(
    () => {
        V( undefined,
        V .length(),
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of undefined (reading 'length')"
    }
)

assert.throws(
    () => {
        V( 1,
        V (x => undefined),
        V .length,
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of undefined (reading 'length')"
    }
)

assert.throws(
    () => {
        V( null,
        V .length,
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of null (reading 'length')"
    }
)

assert.throws(
    () => {
        V( null,
        V .length(),
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of null (reading 'length')"
    }
)

assert.throws(
    () => {
        V( 1,
        V (x => null),
        V .length,
        )
    },
    {
        name: 'TypeError',
        message: "Cannot read properties of null (reading 'length')"
    }
)


assert.throws(
    () => {
        V( [1, 2, 3],
        V (undefined),
        )
    },
    {
        name: 'TypeError',
        message: 'Verticalize: undefined value is not a function'
    }
    )

assert.throws(
    () => {
        V( [1, 2, 3],
        V (null),
        )
    },
    {
        name: 'TypeError',
        message: 'Verticalize: null value is not a function'
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V ("foo"),
        )
    },
    {
        name: 'TypeError',
        message: 'Verticalize: String value is not a function'
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V (""),
        )
    },
    {
        name: 'TypeError',
        message: 'Verticalize: String value is not a function'
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V (0),
        )
    },
    {
        name: 'TypeError',
        message: "Verticalize: Number value is not a function"
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V (1),
        )
    },
    {
        name: 'TypeError',
        message: "Verticalize: Number value is not a function"
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V ([4, 5, 6]),
        )
    },
    {
        name: 'TypeError',
        message: "Verticalize: Array value is not a function"
    }
)

assert.throws(
    () => {
        V( [1, 2, 3],
        V ({a: 1, b: 2}),
        )
    },
    {
        name: 'TypeError',
        message: 'Verticalize: Object value is not a function'
    }
)


console.log("All tests passed.")
