# opt-vitest

[Vitest](https://vitest.dev/) matchers for [opt](https://github.com/bodil/opt).

## Usage

To install the new matchers, import this package into your test file:

```typescript
import "@bodil/opt-vitest";
```

This extends Vitest's `expect` object with four methods: `isSome()`, `isNone()`,
`isOk()` and `isErr()`.

All of these can be called without arguments, which will assert only that the
value under inspection is of the expected type. You can also pass an expected
value, which will be checked for equality with the value contained within the
`Result` or `Option`, or you can pass a function which will be passed the
contained value as its first and only argument, inside which you could do
further `expect`ing, or throw an error to fail the test.

## Example

```typescript
const okValue: Result<string, Error> = Ok("all good!");

expect(okValue).isOk();
expect(okValue).not.isErr();
expect(okValue).isOk("all good!");
expect(okValue).isOk((value) => expect(value).eq("all good!));
```

## Licence

Copyright 2023 Bodil Stokke

This software is subject to the terms of the Mozilla Public License, v. 2.0. If
a copy of the MPL was not distributed with this file, You can obtain one at
<http://mozilla.org/MPL/2.0/>.
