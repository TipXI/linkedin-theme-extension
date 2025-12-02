document.addEventListener("DOMContentLoaded", async () => {
    const radios = document.querySelectorAll("input[name='theme']");

    const storage = await chrome.storage.sync.get(["theme"]);
    const current = storage.theme || "dark";

    // Set the current value
    document.querySelector(`input[value='${current}']`).checked = true;

    // Save new value when user changes
    radios.forEach(r => {
        r.addEventListener("change", () => {
            chrome.storage.sync.set({ theme: r.value });
        });
    });
});
