const form = document.getElementById("request-form");
const summary = document.getElementById("error-summary");
const status = document.getElementById("status");

function showErrors(errors) {
  const list = summary.querySelector("ul");
  list.replaceChildren();
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  form.querySelectorAll(".error").forEach((el) => { el.hidden = true; el.textContent = ""; });

  for (const [field, message] of Object.entries(errors)) {
    const input = document.getElementById(field);
    const msg = document.getElementById(`${field}-error`);
    input.setAttribute("aria-invalid", "true");
    msg.textContent = message;
    msg.hidden = false;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${field}`;
    a.textContent = message;
    li.append(a);
    list.append(li);
  }
  summary.hidden = false;
  summary.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.textContent = "";
  const body = Object.fromEntries(new FormData(form));
  const res = await fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) return showErrors(data.errors ?? {});
  summary.hidden = true;
  form.reset();
  status.textContent = `Request submitted. Your reference number is ${data.reference}.`;
});
