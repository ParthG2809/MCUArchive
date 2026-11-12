/* Account page: sign in / create account, then account summary, merge of this browser's list, sign out.
   All account calls go through accountActions in core.js. */

renderChrome("account");

const cardBody = document.getElementById("cardBody");
const DISMISS_KEY = "marvel-archive:merge-dismissed";
let checked = false;  // first answer from the server received
let mode = "signin";  // or "signup"
let shownState = "";

const released = () => ALL_TITLES.filter((t) => isReleased(t));

function formHTML() {
  const signup = mode === "signup";
  return `
    <div class="card-tabs" role="group" aria-label="Choose">
      <button type="button" data-mode="signin" aria-pressed="${!signup}">Sign in</button>
      <button type="button" data-mode="signup" aria-pressed="${signup}">Create account</button>
    </div>
    <form class="auth-form" id="authForm" novalidate>
      <div class="field-row">
        <label for="username">Username</label>
        <input id="username" name="username" autocomplete="username" autocapitalize="none" spellcheck="false"
          required minlength="3" maxlength="30" aria-describedby="${signup ? "usernameHint " : ""}usernameError">
        ${signup ? '<p class="field-hint" id="usernameHint">3–30 letters, numbers, dots, dashes or underscores. No email needed.</p>' : ""}
        <p class="field-error" id="usernameError"></p>
      </div>
      <div class="field-row">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="${signup ? "new-password" : "current-password"}"
          required aria-describedby="${signup ? "passwordHint " : ""}passwordError">
        ${signup ? '<p class="field-hint" id="passwordHint">At least 8 characters, not a common password, not only numbers.</p>' : ""}
        <p class="field-error" id="passwordError"></p>
      </div>
      <p class="form-error" id="formError" role="alert"></p>
      <button class="btn red" type="submit">${signup ? "Create my account" : "Sign in"}</button>
    </form>
    <p class="card-note">${signup
      ? "Password reset isn't available yet, so keep your password somewhere safe."
      : "New here? Choose “Create account”. It takes a username and a password."}</p>`;
}

function signedInHTML() {
  const list = released();
  const done = list.filter((t) => watched.has(t.id)).length;
  const extra = accountActions.guestOnlyIds();
  let dismissed = false;
  try { dismissed = sessionStorage.getItem(DISMISS_KEY) === "1"; } catch { /* storage unavailable */ }
  return `
    <p class="card-hello">Signed in as <b>${escapeHTML(account.user)}</b></p>
    <dl class="card-stats">
      <div><dt>Watched</dt><dd>${done} of ${list.length} released titles</dd></div>
      <div><dt>Saved in</dt><dd>Your account, on every device you sign in on</dd></div>
    </dl>
    ${extra.length && !dismissed ? `
      <div class="merge">
        <p>This browser has <b>${extra.length}</b> watched title${extra.length === 1 ? "" : "s"} that ${extra.length === 1 ? "isn't" : "aren't"} in your account yet.</p>
        <div class="card-actions">
          <button class="btn red" type="button" data-act="merge">Add ${extra.length === 1 ? "it" : "them"} to my account</button>
          <button class="btn" type="button" data-act="dismiss">Not now</button>
        </div>
      </div>` : ""}
    <div class="card-actions">
      <a class="btn" href="tracker.html">Open My Gauntlet</a>
      <button class="btn" type="button" data-act="signout">Sign out</button>
    </div>`;
}

function render(force = false) {
  const state = !checked ? "loading" : !account.available ? "unavailable" : account.user ? `in:${account.user}` : `out:${mode}`;
  // Don't redraw the form (and lose what's typed) unless the state actually changed.
  if (!force && state === shownState && !state.startsWith("in:")) return;
  shownState = state;
  if (state === "loading") {
    cardBody.innerHTML = '<p class="card-note">Checking the records…</p>';
  } else if (state === "unavailable") {
    cardBody.innerHTML = `<p class="card-hello">Accounts aren't available right now.</p>
      <p class="card-note">Your progress is still saved in this browser. <a href="tracker.html">Open My Gauntlet</a></p>`;
  } else {
    cardBody.innerHTML = account.user ? signedInHTML() : formHTML();
  }
}

function showErrors(error) {
  ["username", "password"].forEach((name) => {
    const input = document.getElementById(name);
    const isBad = error?.field === name;
    input.setAttribute("aria-invalid", isBad);
    document.getElementById(`${name}Error`).textContent = isBad ? error.message : "";
  });
  document.getElementById("formError").textContent = error && !error.field ? error.message : "";
  if (error?.field) document.getElementById(error.field).focus();
}

cardBody.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const username = form.username.value.trim();
  const password = form.password.value;
  if (!username) return showErrors({ field: "username", message: "Enter a username." });
  if (!password) return showErrors({ field: "password", message: "Enter a password." });
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  showErrors(null);
  try {
    await (mode === "signup" ? accountActions.signUp(username, password) : accountActions.signIn(username, password));
    render(true);
    cardBody.querySelector(".card-hello")?.setAttribute("tabindex", "-1");
    cardBody.querySelector(".card-hello")?.focus();
  } catch (error) {
    showErrors(error);
  } finally {
    if (submit.isConnected) submit.disabled = false;
  }
});

cardBody.addEventListener("click", async (e) => {
  const tab = e.target.closest("[data-mode]");
  if (tab && tab.dataset.mode !== mode) {
    mode = tab.dataset.mode;
    render();
    cardBody.querySelector(`[data-mode="${mode}"]`).focus();
    return;
  }
  const action = e.target.closest("[data-act]");
  if (!action) return;
  action.disabled = true;
  try {
    if (action.dataset.act === "merge") await accountActions.mergeGuestList();
    if (action.dataset.act === "dismiss") { try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ } }
    if (action.dataset.act === "signout") { mode = "signin"; await accountActions.signOut(); }
    render(true);
  } catch (error) {
    showNotice(error.message);
    action.disabled = false;
  }
});

document.addEventListener("accountchange", () => { checked = true; render(); });
document.addEventListener("watchedchange", () => render());
render();
