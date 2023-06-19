import { expect } from "vitest";
import { ExpectationResult, MatcherState } from "@vitest/expect";

import { None, Option, Some, Err, Ok, Result } from "@bodil/opt";

interface CustomMatchers<R = unknown> {
    isOk<A>(expected?: A): R;
    isErr<E>(expected?: E): R;
    isSome<A>(expected?: A): R;
    isNone(): R;
}

declare module "vitest" {
    interface Assertion<T = any> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
    isOk<A>(
        this: MatcherState,
        received: unknown,
        expected?: A | ((a: A) => void)
    ): ExpectationResult {
        const { equals, utils } = this;
        if (!(received instanceof Result.Class)) {
            return {
                pass: false,
                message: () => `expected a Result but got ${utils.printReceived(received)}`,
                actual: received,
            };
        }
        if (received.isErr()) {
            return {
                pass: false,
                message: () => `expected Ok but got Err(${utils.printReceived(received.value)})`,
                expected: Ok(undefined),
                actual: received,
            };
        }
        if (typeof expected === "function") {
            (expected as (a: A) => void)(received.value);
            return { pass: true, message: () => "" };
        }
        return {
            pass: expected === undefined || equals(received.value, expected),
            message: () =>
                `expected Ok(${utils.printExpected(expected)}) but got Ok(${utils.printReceived(
                    received.value
                )})`,
            expected,
            actual: received.value,
        };
    },

    isErr<E>(
        this: MatcherState,
        received: unknown,
        expected?: E | ((e: E) => void)
    ): ExpectationResult {
        const { equals, utils } = this;
        if (!(received instanceof Result.Class)) {
            return {
                pass: false,
                message: () => `expected a Result but got ${utils.printReceived(received)}`,
                actual: received,
            };
        }
        if (received.isOk()) {
            return {
                pass: false,
                message: () => `expected Err but got Ok(${utils.printReceived(received.value)})`,
                expected: Err(undefined),
                actual: received,
            };
        }
        if (typeof expected === "function") {
            (expected as (e: E) => void)(received.value);
            return { pass: true, message: () => "" };
        }
        return {
            pass: expected === undefined || equals(received.value, expected),
            message: () =>
                `expected Err(${utils.printExpected(expected)}) but got Err(${utils.printReceived(
                    received.value
                )})`,
            expected,
            actual: received.value,
        };
    },

    isSome<A>(
        this: MatcherState,
        received: unknown,
        expected?: A | ((a: A) => void)
    ): ExpectationResult {
        const { equals, utils } = this;
        if (!(received instanceof Option.Class)) {
            return {
                pass: false,
                message: () => `expected an Option but got ${utils.printReceived(received)}`,
                actual: received,
            };
        }
        if (received.isNone()) {
            return {
                pass: false,
                message: () => `expected Some but got None`,
                expected: Some(undefined),
                actual: received,
            };
        }
        if (typeof expected === "function") {
            (expected as (a: A) => void)(received.value);
            return { pass: true, message: () => "" };
        }
        return {
            pass: expected === undefined || equals(received.value, expected),
            message: () =>
                `expected Some(${utils.printExpected(expected)}) but got Some(${utils.printReceived(
                    received.value
                )})`,
            expected,
            actual: received.value,
        };
    },

    isNone(this: MatcherState, received: unknown): ExpectationResult {
        const { utils } = this;
        if (!(received instanceof Option.Class)) {
            return {
                pass: false,
                message: () => `expected an Option but got ${utils.printReceived(received)}`,
                actual: received,
            };
        }
        return {
            pass: received.isNone(),
            message: () => `expected None but got Some(${utils.printExpected(received.value)})`,
            expected: None,
            actual: received,
        };
    },
});
