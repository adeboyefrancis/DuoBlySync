import React, { createContext, useState, useContext, useEffect } from "react";
import { axios } from "@/api/DuoBlySyncClient";
import { appParams } from "@/lib/app-params";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState({
    id: "local",
    public_settings: {},
  });

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    // 🚀 Short-circuit platform configuration requests cleanly for local dev
    setIsLoadingPublicSettings(true);
    setAuthError(null);

    // Mock successful public settings resolution instantly
    setAppPublicSettings({
      id: appParams.appId || "local-duoblysync-id",
      public_settings: {},
    });
    setIsLoadingPublicSettings(false);

    // Check your local Express authentication session if a token exists
    if (appParams.token) {
      await checkUserAuth();
    } else {
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);

      // Hits your local Express endpoint (e.g., http://localhost:5005/api/auth/me)
      const currentUser = await axios.get("/auth/me");

      setUser(currentUser?.data || currentUser);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
      setAuthChecked(true);
    } catch (error) {
      console.error("User auth check failed locally:", error);
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      setAuthChecked(true);

      // Trigger standard auth required fallback patterns if token is dead/absent
      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.status === 401
      ) {
        setAuthError({
          type: "auth_required",
          message: "Authentication required",
        });
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Clear out fallback token caches locally
    localStorage.removeItem("base44_access_token");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navigateToLogin = () => {
    // Cleanly push unauthenticated users back to your local login page
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
