const isNode = typeof window === "undefined";
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

const getAppParamValue = (
  paramName,
  { defaultValue = undefined, removeFromUrl = false } = {},
) => {
  if (isNode) {
    return defaultValue;
  }
  const storageKey = `base44_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);
  if (removeFromUrl) {
    urlParams.delete(paramName);
    const newUrl = `${window.location.pathname}${
      urlParams.toString() ? `?${urlParams.toString()}` : ""
    }${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
  }
  if (searchParam) {
    storage.setItem(storageKey, searchParam);
    return searchParam;
  }
  if (defaultValue) {
    storage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  const storedValue = storage.getItem(storageKey);
  if (storedValue) {
    return storedValue;
  }
  return null;
};

const getAppParams = () => {
  if (getAppParamValue("clear_access_token") === "true") {
    storage.removeItem("base44_access_token");
    storage.removeItem("token");
  }
  return {
    appId: getAppParamValue("app_id", {
      defaultValue: import.meta.env.VITE_BASE44_APP_ID,
    }),
    token: getAppParamValue("access_token", { removeFromUrl: true }),
    fromUrl: getAppParamValue("from_url", {
      defaultValue: window.location.href,
    }),
    functionsVersion: getAppParamValue("functions_version", {
      defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION,
    }),
    appBaseUrl: getAppParamValue("app_base_url", {
      defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL,
    }),
  };
};

// ⚡ Extract the parameters from the platform wrapper once
const defaultParams = getAppParams();

// 🚀 Export the single unified configuration object safely
export const appParams = {
  ...defaultParams,
  // Fallback to local placeholders if the cloud platform parameters don't exist
  appId: defaultParams.appId || "local-duoblysync-id",

  // Dynamically uses your exact browser origin URL (handles changes to your Vite port seamlessly)
  appBaseUrl:
    defaultParams.appBaseUrl ||
    (!isNode ? window.location.origin : "http://localhost:3000"),

  // 🔥 UPDATED: Look for your local Supabase token if Base44 parameters are missing!
  token:
    defaultParams.token ||
    (!isNode
      ? (() => {
          // Check old Base44 fallback first
          const legacyToken = localStorage.getItem("base44_access_token");
          if (legacyToken) return legacyToken;

          // Otherwise, dynamically find your local Supabase JWT from localStorage keys
          const supabaseKey = Object.keys(localStorage).find(
            (key) => key.startsWith("sb-") && key.endsWith("-auth-token"),
          );
          if (supabaseKey) {
            try {
              const sessionData = JSON.parse(localStorage.getItem(supabaseKey));
              return sessionData?.access_token || null;
            } catch (e) {
              return null;
            }
          }
          return null;
        })()
      : null),
};
