import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Make sure this path matches your supabase setup

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage(
          "Sign up successful! Check your email for confirmation or log in if confirmation is disabled locally.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/dashboard"; // Redirect on success
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>{isSignUp ? "Create Local Account" : "Local Developer Login"}</h2>
      <form
        onSubmit={handleAuth}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "15px",
            color: message.startsWith("Error") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        style={{
          marginTop: "15px",
          background: "none",
          border: "none",
          color: "#0070f3",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        {isSignUp
          ? "Already have an account? Log In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}
