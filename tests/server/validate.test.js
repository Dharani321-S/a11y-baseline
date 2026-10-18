import test from "node:test";
import assert from "node:assert/strict";
import { validateRequest } from "../../server/src/validate.js";

test("empty body returns an error for every field", () => {
  assert.deepEqual(Object.keys(validateRequest({})).sort(), ["category", "details", "email", "name"]);
});

test("valid body returns no errors", () => {
  const errors = validateRequest({ name: "Asha", email: "asha@example.com", category: "ration", details: "Need to update address" });
  assert.deepEqual(errors, {});
});

test("email message explains how to fix it", () => {
  const { email } = validateRequest({ email: "nope" });
  assert.match(email, /like name@example\.com/);
});
