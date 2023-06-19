import { test, expect } from "vitest";

import { Some, None, Ok, Err } from "@bodil/opt";

import "./mod";

test("Option custom matchers", () => {
    const a = Some("frob");
    expect(a).isSome();
    expect(a).not.isNone();
    expect(a).isSome("frob");
    expect(a).not.isSome("frobozz");

    const e = None;
    expect(e).isNone();
    expect(e).not.isSome();

    expect("not an Option").not.isSome();
    expect("not an Option").not.isNone();
});

test("Result custom matchers", () => {
    const a = Ok("frob");
    expect(a).isOk();
    expect(a).not.isErr();
    expect(a).isOk("frob");
    expect(a).not.isOk("frobozz");

    const e = Err("frob");
    expect(e).isErr();
    expect(e).not.isOk();
    expect(e).isErr("frob");
    expect(e).not.isErr("frobozz");

    expect("not a Result").not.isOk();
    expect("not a Result").not.isErr();
});
