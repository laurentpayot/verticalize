// Cannot use `...functions: Function[]` because `V .length` would create the following error:
// Argument of type 'number' is not assignable to parameter of type 'Function'.
export const V: (value: any, ...functions: any[]) => any
