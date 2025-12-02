// Default setting
const DEFAULT_THEME = "dark"; // dark | light | system

// Map extension theme → LinkedIn li_theme cookie values
const THEME_MAP = {
    dark: "dark",
    light: "light",
    system: "system"
};

// URL patterns to identify LinkedIn tabs
const COOKIE_DOMAIN = ".linkedin.com";
const LINKEDIN_URL = "https://www.linkedin.com/";
const URL_PATTERNS = ["https://www.linkedin.com/*", "https://*.linkedin.com/*"];

// 1. Wrapper to make Storage work in Firefox (Callback) and Chrome (Promise)
function getStorage(keys) {
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => {
            if (chrome.runtime.lastError) {
                console.warn("Storage warning:", chrome.runtime.lastError);
                resolve({});
            } else {
                resolve(result || {});
            }
        });
    });
}

// 2. Wrapper to make Cookies work in Firefox (Callback) and Chrome (Promise)
function setCookie(details) {
    return new Promise((resolve, reject) => {
        chrome.cookies.set(details, (cookie) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(cookie);
            }
        });
    });
}


async function applyThemeCookie(shouldReload) {
    try {
        const storage = await getStorage(["theme"]);
        const theme = storage.theme || DEFAULT_THEME;

        const cookieValue = THEME_MAP[theme];

        // Create expiration: 1 year from now
        const expiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
        console.log(`Attempting to set cookie: ${cookieValue} on ${COOKIE_DOMAIN}`);
        // 1. Set the LinkedIn cookie and WAIT for it to finish
        await setCookie({
            url: LINKEDIN_URL,
            name: "li_theme",
            value: cookieValue,
            domain: COOKIE_DOMAIN,
            path: "/",
            secure: true,
            httpOnly: false,
            sameSite: "no_restriction",
            expirationDate: expiration
        });

        console.log("Cookie Success!");
        // 2. Only reload tabs if this was triggered by a user change (not startup)
        if (shouldReload) {
            reloadLinkedInTabs();
        }
    } catch (error) {
        console.error("LinkedIn Theme Restorer Error:", error);
    }
}

function reloadLinkedInTabs() {
    // Query all tabs that match LinkedIn URLs
    chrome.tabs.query({ url: URL_PATTERNS }, (tabs) => {
        for (const tab of tabs) {
            chrome.tabs.reload(tab.id);
        }
    });
}

// On browser startup: Set cookie (No reload needed, user hasn't opened tabs yet)
chrome.runtime.onStartup.addListener(() => {
    applyThemeCookie(false);
});

// On extension install: Set cookie
chrome.runtime.onInstalled.addListener(() => {
    applyThemeCookie(false);
});

// On user change in Popup: Set cookie AND Reload
chrome.storage.onChanged.addListener((changes) => {
    if (changes.theme) {
        applyThemeCookie(true); // Pass true to trigger reload
    }
});
