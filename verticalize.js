/**
 * @type {import('.').V}
 */
export const V = new Proxy(
  (...args) => args.reduce( (out, fn) => {
    if (typeof fn !== 'function')
      throw new TypeError(`Verticalize: ${fn?.constructor.name ?? fn} value is not a function`)
    if (out instanceof Promise)
      return out.then(fn._Vprop ? result => result[fn._Vprop] : fn)
    return fn._Vprop ? out[fn._Vprop] : fn(out)
  }),
  { get(_, prop) {
    const toFn = (...args) => out => {
      if (typeof out[prop] !== 'function')
        throw new Error(`Verticalize: ${out?.constructor.name ?? out} value has no method .${prop}()`)
      return out[prop].apply(out, args)
    }
    toFn._Vprop = prop
    return toFn
  }}
)
