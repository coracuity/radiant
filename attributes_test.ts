import { describe, it } from "jsr:@std/testing/bdd";
import { h } from "./html_tags.ts";
import { assertEquals, assertObjectMatch } from "jsr:@std/assert";
import { renderElement } from "./render_html.ts";

describe("attributes", () => {
  it("html element attributes", () => {
    const p = h.p({ class: "blah", id: "it" }, "Hello, world!");

    assertObjectMatch(p.attributes, { class: "blah", id: "it" });
  });

  it("global attributes", () => {
    const a = h.a({ hidden: true, href: "/abc" }, "Hello, world!");

    assertObjectMatch(a.attributes, { hidden: true, href: "/abc" });
  });

  it("types correctly", () => {
    h.p({ "data-attr": "attr" }, "Hello, world!");
    // @ts-expect-error invalid attribute name
    h.p({ "invalid-attr": "attr" }, "Hello, world!");
    // @ts-expect-error href is not an attribute on `<p>`
    h.p({ "href": "attr" }, "Hello, world!");
  });

  it("attributes works", () => {
    const input = h.input({ type: "text", disabled: true });
    assertEquals(renderElement(input), `<input type="text" disabled>`);
  });
});
