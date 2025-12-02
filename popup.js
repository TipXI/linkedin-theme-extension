// Helper to support Firefox (callback) and Chrome (promise)
function getStorage(keys) {
    return new Promise((resolve) => {
        // CHANGED: .sync -> .local
        chrome.storage.local.get(keys, (result) => {
            resolve(result || {});
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const radios = document.querySelectorAll("input[name='theme']");

    // 1. Load the current setting using our safe helper
    const storage = await getStorage(["theme"]);
    const currentTheme = storage.theme || "dark";

    // 2. Select the correct radio button
    const radioToCheck = document.querySelector(`input[value='${currentTheme}']`);
    if (radioToCheck) {
        radioToCheck.checked = true;
    }

    // 3. Add event listeners to save changes
    radios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            // Save to storage (LOCAL)
            chrome.storage.local.set({ theme: e.target.value });
            console.log(`Theme changed to ${e.target.value}`);
        });
    });
});