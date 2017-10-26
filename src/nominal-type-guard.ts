export declare class Opaque<T> {
  private _opaqueBrand: T
}

/**
 * Base type for emulating nominal typing.
 *
 * T - type you want to make nominal
 * K - unique kind which is used for distinguishing
 *
 * Example:
 *
 * type NumberA = NominalTypeGuard<number, 'NumberA'>
 * type NumberB = NominalTypeGuard<number, 'NumberB'>
 *
 * const a = 1 as NumberA
 * const b: NumberB = a // Type error!
 */
export type NominalTypeGuard<T, K> = T & Opaque<K>
