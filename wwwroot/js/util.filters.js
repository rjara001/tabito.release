// ---- helpers ---------------------------------------------------------------
function isClickInsideVisibleCalendar(evt) {
  // 1) composedPath: resilient to re-renders/shadow DOM
  if (typeof evt.composedPath === "function") {
    const path = evt.composedPath();
    for (const el of path) {
      if (el instanceof Element &&
          el.classList &&
          el.classList.contains("daterangepicker") &&
          getComputedStyle(el).display !== "none") {
        return true;
      }
    }
  }

  // 2) coordinate hit-test against any visible calendars
  const cals = document.querySelectorAll(".daterangepicker");
  for (const cal of cals) {
    const style = getComputedStyle(cal);
    if (style.display === "none" || style.visibility === "hidden") continue;

    const r = cal.getBoundingClientRect();
    if (evt.clientX >= r.left && evt.clientX <= r.right &&
        evt.clientY >= r.top  && evt.clientY <= r.bottom) {
      return true;
    }

    // 3) fallback contains (works when node not yet detached)
    if (cal.contains(evt.target)) return true;
  }

  return false;
}

// ---- state to remember where the interaction began ------------------------
let _downInsideCalendar = false;

// Mark pointerdowns that start inside the calendar (capture phase = true)
document.addEventListener("pointerdown", function (event) {
  _downInsideCalendar = isClickInsideVisibleCalendar(event);
}, true);

// Main click handler to manage dropdowns
document.addEventListener("click", function (event) {
  // If pointer started inside calendar OR this click is inside calendar, ignore
  if (_downInsideCalendar || isClickInsideVisibleCalendar(event)) {
    _downInsideCalendar = false; // reset for next interaction
    return;
  }
  _downInsideCalendar = false;

  const allFilters = document.querySelectorAll(".dropdown-menu.popup-filter.show");

  let clickedInsideFilter = false;
  allFilters.forEach(filter => {
    if (filter.contains(event.target)) {
      filter.classList.add("show");        // keep this one open
      clickedInsideFilter = true;
    } else {
      filter.classList.remove("show");     // close others
    }
  });

  if (!clickedInsideFilter) {
    allFilters.forEach(f => f.classList.remove("show")); // clicked outside everything
  }
});
