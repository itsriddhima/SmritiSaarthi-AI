import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[SmritiSaarthi] ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, fontFamily: "sans-serif", maxWidth: 640, margin: "40px auto", background: "#FFF", borderRadius: 20, border: "2px solid #E11D48", color: "#881337", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>⚠️ Application Encountered an Issue</h2>
          <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16 }}>An error occurred while rendering the page. Click below to clear stored cache and restore the application.</p>
          <pre style={{ background: "#FFF1F2", padding: 14, borderRadius: 12, overflowX: "auto", fontSize: 12, lineHeight: 1.5, border: "1px solid #FECDD3" }}>
            {this.state.error?.toString() || "Unknown error"}
          </pre>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{ marginTop: 16, padding: "10px 20px", background: "#E11D48", color: "#FFF", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: "bold", fontSize: 13 }}
          >
            Clear Cache & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Register PWA Service Worker
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("[SmritiSaarthi PWA] Service Worker registered with scope:", reg.scope);
      })
      .catch((err) => {
        console.warn("[SmritiSaarthi PWA] Service Worker registration note:", err);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
