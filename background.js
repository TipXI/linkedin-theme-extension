// Default setting
const DEFAULT_THEME = "dark"; // dark | light | system

// Map extension theme → LinkedIn li_theme cookie values
const THEME_MAP = {
    dark: "dark",
    light: "light",
    system: "system"
};

async function applyThemeCookie() {
    const storage = await chrome.storage.sync.get(["theme"]);
    const theme = storage.theme || DEFAULT_THEME;

    const cookieValue = THEME_MAP[theme];

    // Create expiration: 1 year from now
    const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;

    // Set the LinkedIn cookie
    chrome.cookies.set({
        url: "https://www.linkedin.com/",
        name: "li_theme",
        value: cookieValue,
        domain: ".www.linkedin.com",
        path: "/",
        secure: true,
        httpOnly: false,
        sameSite: "no_restriction",
        expirationDate: expiration
    });
}

// On browser startup
chrome.runtime.onStartup.addListener(() => {
    applyThemeCookie();
});

// On extension install or update
chrome.runtime.onInstalled.addListener(() => {
    applyThemeCookie();
});

// When user changes theme in options page
chrome.storage.onChanged.addListener((changes) => {
    if (changes.theme) {
        applyThemeCookie();
    }
});
