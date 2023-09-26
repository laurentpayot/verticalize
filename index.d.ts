type Fn = (...args: any[]) => any

type LastReturnType<L extends Fn[]> = L extends [...any, infer Last extends Fn]
    ? ReturnType<Last>
    : never

type GenericObject = Record<string, any>

export const V:
    (<Functions extends Fn[]>(value: any, ...functions: Functions) => LastReturnType<Functions>)
    & GenericObject
