/* ==========================================================================
   Seventy-Two Tutoring — concept homepage behaviour (vanilla JavaScript)
     1. Menu button on small screens
     2. Exam picker tabs in the hero
     3. Contact form (opens the visitor's email app; no server needed)
     4. Footer year
   The page still works with JavaScript off: every exam is shown in full and
   the form falls back to a plain email.
   ========================================================================== */

(function () {
  "use strict";

  /* 1. Menu button -------------------------------------------------------- */
  (function menu() {
    var header = document.querySelector("[data-header]");
    if (!header) return;
    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  })();

  /* 2. Exam picker -------------------------------------------------------- */
  (function examPicker() {
    var tablist = document.querySelector("[role='tablist']");
    if (!tablist) return;
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll("[role='tab']"));
    var examField = document.getElementById("exam");

    function select(tab, moveFocus) {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
      });
      if (moveFocus) tab.focus();
      // Keep the contact form in step with the exam the visitor is reading about
      if (examField && tab.dataset.exam) examField.value = tab.dataset.exam;
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      // Arrow keys move between tabs, as in any desktop tab strip
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (event.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (event.key === "Home") next = tabs[0];
        if (event.key === "End") next = tabs[tabs.length - 1];
        if (next) { event.preventDefault(); select(next, true); }
      });
    });

    select(tabs[0], false);
    if (examField) examField.selectedIndex = 0;   // nothing pre-chosen until a tab is clicked
  })();

  /* 3. Contact form ------------------------------------------------------- */
  (function contact() {
    var form = document.querySelector("[data-contact]");
    if (!form) return;
    var statusEl = form.querySelector("[data-form-status]");
    var email = form.dataset.email;

    function setError(field, message) {
      var errorEl = document.getElementById(field.id + "-error");
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
      if (errorEl) { errorEl.textContent = message; errorEl.hidden = !message; }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.elements.name;
      var reply = form.elements.email;
      var checks = [
        [name, !name.value.trim() && "Enter your name."],
        [reply, (!reply.value.trim() && "Enter your email address.") ||
                (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(reply.value.trim()) && "Enter an email address like name@example.com.")]
      ];
      var firstBad = null;
      checks.forEach(function (check) {
        setError(check[0], check[1] || "");
        if (check[1] && !firstBad) firstBad = check[0];
      });
      if (firstBad) {
        firstBad.focus();
        statusEl.textContent = "Please fix the fields marked above.";
        return;
      }

      var lines = [
        "Name: " + name.value.trim(),
        "Email: " + reply.value.trim(),
        "Exam: " + form.elements.exam.value,
        "Exam date: " + (form.elements["exam-date"].value || "Not booked yet")
      ];
      var note = form.elements.message.value.trim();
      if (note) lines.push("", note);

      window.location.href = "mailto:" + email +
        "?subject=" + encodeURIComponent("Tutoring enquiry: " + form.elements.exam.value) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      statusEl.textContent = "Your email app is opening with the message filled in. Press send to reach us.";
    });
  })();

  /* 4. Footer year -------------------------------------------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
