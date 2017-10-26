import { NominalTypeGuard } from './nominal-type-guard'

/**
 * Nominal versions of number and string types.
 * You can distinguish two numbers/strings by providing different construction as K parameter.
 *
 * Example:
 *
 * type Age = Number<'Age'>
 * type Speed = Number<'Speed'>
 *
 * const age: Age = 18
 *
 * function run(speed: Speed) {
 *   console.log(`Running with speed ${speed}`)
 * }
 *
 * run(age) // Compile time error, because Age is not Speed even if both are technically numbers.
 */
export type Number<K> = NominalTypeGuard<number, K>

export type String<K> = NominalTypeGuard<string, K>
