// Validation lives on the server (source of truth). Messages are written to be
// shown verbatim in the UI: they say what is wrong AND how to fix it (WCAG 3.3.1, 3.3.3).
export function validateRequest(body = {}) {
  const errors = {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const category = String(body.category ?? "").trim();
  const details = String(body.details ?? "").trim();

  if (!name) errors.name = "Enter your full name";
  if (!email) errors.email = "Enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter an email address in the correct format, like name@example.com";
  if (!["ration", "patta", "certificate"].includes(category))
    errors.category = "Select a service category";
  if (details.length < 10) errors.details = "Describe your request in at least 10 characters";

  return errors;
}
