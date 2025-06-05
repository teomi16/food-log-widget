let currentMeal = "";


function showOnlyFrame(frameId) {
  document.querySelectorAll(".frame").forEach(f => {
    f.classList.add("hidden");
    f.classList.remove("active");
  });
  const target = document.getElementById(frameId);
  if (target) {
    target.classList.remove("hidden");
    target.classList.add("active");
  }
}

// Time & Date
function updateDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const isPM = hours >= 12;
  hours = hours % 12 || 12;
  const ampm = isPM ? "PM" : "AM";
  const pad = n => n.toString().padStart(2, '0');
  const timeStr = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}   ${ampm}`;

  const datetimeElement = document.getElementById("datetime");
  if (datetimeElement) {
    datetimeElement.innerHTML = `${dateStr}<br>${timeStr}`;
  }
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Event Listeners
window.addEventListener("DOMContentLoaded", () => {
  const ethan = document.getElementById("ethan-img");
  if (ethan) {
    ethan.addEventListener("click", () => {
      ethan.classList.add("bounce");
      ethan.addEventListener("animationend", () => {
        ethan.classList.remove("bounce");
        showOnlyFrame("frame-2");
      }, { once: true });
    });
  }

  document.querySelectorAll(".meal-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentMeal = btn.innerText; // capture clicked meal
    showOnlyFrame("frame-3");
  });
});


  document.getElementById("to-frame-4")?.addEventListener("click", () => showOnlyFrame("frame-4"));
  document.getElementById("back-to-frame-2")?.addEventListener("click", () => showOnlyFrame("frame-2"));
  document.getElementById("back-to-frame-3")?.addEventListener("click", () => showOnlyFrame("frame-3"));
  document.getElementById("back-to-frame-1")?.addEventListener("click", () => showOnlyFrame("frame-1"));

  document.querySelectorAll(".exit-btn").forEach(btn => {
    btn.addEventListener("click", () => window.close());
  });

  document.getElementById("final-log")?.addEventListener("click", () => {
  const whatYouAte = document.querySelector('#feeling-text-3')?.value || '';
  const whatYouChecked = Array.from(document.querySelectorAll('input[name="allergen1"]:checked')).map(cb => cb.value);

  const howYouFelt = document.querySelector('#feeling-text-4')?.value || '';
  const symptoms = Array.from(document.querySelectorAll('input[name="symptom2"]:checked')).map(cb => cb.value);

  const now = new Date();
  const timestamp = now.toISOString();
  const fileTimestamp = now.toISOString().replace(/[:.]/g, '-');

  const headers = [
    "timestamp",
    "meal",
    "what_you_ate",
    "what_you_checked_off",
    "how_you_felt",
    "symptoms"
  ];

  const row = [
    `"${timestamp}"`,
    `"${currentMeal}"`,
    `"${whatYouAte.replace(/"/g, '""')}"`,
    `"${whatYouChecked.join('; ')}"`,
    `"${howYouFelt.replace(/"/g, '""')}"`,
    `"${symptoms.join('; ')}"`
  ];

  const csvContent = `${headers.join(',')}\n${row.join(',')}`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const filename = `ethan_log_${fileTimestamp}.csv`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert("Log saved as CSV!");
  showOnlyFrame("frame-1");
});
});