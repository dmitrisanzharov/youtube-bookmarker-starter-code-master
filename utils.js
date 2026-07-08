export async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

export function convertUrlParamsToObject(url) {
    if (!url.includes('?')) {
        throw new Error('URL does not contain query parameters');
    }

    return Object.fromEntries(new URL(url).searchParams.entries());
}
