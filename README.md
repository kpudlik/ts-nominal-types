# ts-nominal-types

>"If it walks like a duck and it quacks like a duck, then it must be a duck."

Set of guards to mimic nominal types and type kinds in TypeScript

## TypeScript and duck-typing

TypeScript is based on duck-typing (aka structural typing). Consider following example:

```typescript
interface A {
  prop: string
}

interface B {
  prop: string
}

function doSthWithA(a: A) {
  console.log(a)
}

const b = {
  prop: 'b'
}

doSthWithA(b) // OK!

```

For TypeScript these interfaces are equal because of same structures.
Such behavior has a lot of advantages but sometimes it is not what we want:

```typescript
type Age = number
type Speed = number

function isAdult(age: Age): boolean {
  return age >= 18
}

const speed: Speed = 100

isAdult(speed) // OK!
```

There are cases where you want to distinguish two aliases of native type.
Another example can be entities with unique ids:

```typescript
type UserId = number
class User {
  public readonly id: UserId
}

type FooId = number
class Foo {
  public readonly id: FooId
}

function getSthByUserId(userId: UserId): any {/* ... */}

const foo = new Foo()

getSthByUserId(foo.id) // OK!
```

If such case the logic is not type safe enough because we want to restrict
our method to get only special type of string which is UserId.

## String\<K>, Number\<K> - built in types with kinds

```typescript
import { Number } from 'ts-nominal-types'

type Age = Number<'Age'>
type Speed = Number<'Speed'>

function isAdult(age: Age): boolean {
  return age >= 18
}

const speed: Speed = 100

isAdult(speed) // Compile error! Speed is not assignable to Age!
```

```typescript
type UserId = Number<User> // class can also be a type-kind
class User {
  public readonly id: UserId
}

type FooId = Number<Foo>
class Foo {
  public readonly id: FooId
}

function getSthByUserId(userId: UserId): any {/* ... */}

const foo = new Foo()

getSthByUserId(foo.id) // Compile error! FooId is not assignable to UserId
```

### NominalTypeGuard<T, K> - generic type for providing type-kind.

```typescript
type MyUniqueBooleanA = NominalTypeGuard<boolean, 'A'>
type MyUniqueBooleanB = NominalTypeGuard<boolean, 'B'>

const a: MyUniqueBooleanA = true as MyUniqueBooleanB // Compile error! MyUniqueBooleanA is not assignable to MyUniqueBooleanB
```