import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";

import Landing from "@/pages/Landing";
import ProgressDashboard from "@/pages/ProgressDashboard";
import SwipeMatch from "@/pages/SwipeMatch";
import BrowseMentors from "@/pages/BrowseMentors";
import Sessions from "@/pages/Sessions";
import AppLayout from "@/components/layout/AppLayout";
import Chat from "@/pages/Chat";
import AuthPage from "@/pages/AuthPage";
import { ThemeProvider } from "@/lib/ThemeContext";
// Add page imports here

const AuthenticatedApp = () => {
  const {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
    user,
  } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    } else if (authError.type === "auth_required") {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/get-started" element={<AuthPage />} />
      <Route
        path="/*"
        element={
          <AppLayout>
            <Routes>
              <Route path="/matching" element={<SwipeMatch />} />
              <Route path="/dashboard" element={<ProgressDashboard />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/mentors" element={<BrowseMentors />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppLayout>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
