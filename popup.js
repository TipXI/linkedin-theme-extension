document.addEventListener("DOMContentLoaded", async () => {
    const radios = document.querySelectorAll("input[name='theme']");

    // 1. Load the current setting from storage
    const storage = await chrome.storage.sync.get(["theme"]);
    const currentTheme = storage.theme || "dark"; // Default to dark if nothing saved

    // 2. Select the correct radio button
    const radioToCheck = document.querySelector(`input[value='${currentTheme}']`);
    if (radioToCheck) {
        radioToCheck.checked = true;
    }

    // 3. Add event listeners to save changes
    radios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            // Save to storage
            chrome.storage.sync.set({ theme: e.target.value });

            // Visual feedback (optional: console log for debugging)
            console.log(`Theme changed to ${e.target.value}`);
        });
    });
});