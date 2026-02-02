"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Widget {
  _id: string;
  name: string;
  widgetId: string;
  databaseId: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [widgetName, setWidgetName] = useState("");
  const [notionToken, setNotionToken] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchWidgets();
    }
  }, [session]);

  const fetchWidgets = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/widgets");
      if (response.ok) {
        const data = await response.json();
        setWidgets(data.widgets);
      }
    } catch (error) {
      console.error("Failed to fetch widgets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWidget = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setCreating(true);

    try {
      const response = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: widgetName,
          notionToken,
          databaseId: extractDatabaseId(databaseId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Failed to create widget");
        return;
      }

      // Reset form and switch to list
      setWidgetName("");
      setNotionToken("");
      setDatabaseId("");
      setActiveTab("list");
      fetchWidgets();
    } catch (error) {
      setFormError("An error occurred. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const extractDatabaseId = (input: string): string => {
    // If it's a URL, extract the database ID
    if (input.includes("notion.so")) {
      const match = input.match(/([a-f0-9]{32})/);
      return match ? match[1] : input;
    }
    return input.replace(/-/g, "");
  };

  const handleDeleteWidget = async (widgetId: string) => {
    if (!confirm("Are you sure you want to delete this widget?")) return;

    try {
      const response = await fetch(`/api/widgets/${widgetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchWidgets();
      }
    } catch (error) {
      console.error("Failed to delete widget:", error);
    }
  };

  const copyToClipboard = (widgetId: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(widgetId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getWidgetUrl = (widgetId: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/widget/${widgetId}`;
  };

  if (status === "loading") {
    return (
      <div className="planner-loading">
        <div className="planner-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <span className="dashboard-logo">Grid Planner</span>
          <div className="dashboard-user">
            <Link href="/help" className="dashboard-help-link">How to configure</Link>
            <span className="dashboard-email">{session.user?.email}</span>
            <button
              type="button"
              className="btn-logout"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <h1 className="dashboard-main-title">Your Widgets</h1>
        
        <div className="dashboard-tabs">
          <button
            type="button"
            className={`dashboard-tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create a widget
          </button>
          <button
            type="button"
            className={`dashboard-tab ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Active widgets ({widgets.length})
          </button>
        </div>

        {activeTab === "create" && (
          <div className="widget-form-card">
            <h2 className="widget-form-title">Create a widget</h2>
            <form onSubmit={handleCreateWidget} className="widget-form">
              {formError && <div className="auth-error">{formError}</div>}

              <div className="form-group">
                <label htmlFor="widgetName">Widget name *</label>
                <input
                  id="widgetName"
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="My Instagram Grid"
                  required
                  disabled={creating}
                />
                <p className="form-hint">Give your widget a name to identify it</p>
              </div>

              <div className="form-group">
                <label htmlFor="notionToken">Notion integration token *</label>
                <input
                  id="notionToken"
                  type="password"
                  value={notionToken}
                  onChange={(e) => setNotionToken(e.target.value)}
                  placeholder="secret_..."
                  required
                  disabled={creating}
                />
                <p className="form-hint">
                  Get this from{" "}
                  <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer">
                    notion.so/my-integrations
                  </a>
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="databaseId">Database URL or ID *</label>
                <input
                  id="databaseId"
                  type="text"
                  value={databaseId}
                  onChange={(e) => setDatabaseId(e.target.value)}
                  placeholder="https://notion.so/... or 32-character ID"
                  required
                  disabled={creating}
                />
                <p className="form-hint">
                  Paste the full Notion database URL or just the database ID
                </p>
              </div>

              <button type="submit" className="btn-create-widget" disabled={creating}>
                {creating ? "Creating widget..." : "Create widget"}
              </button>
            </form>
          </div>
        )}

        {activeTab === "list" && (
          <div className="widget-list">
            {loading ? (
              <div className="planner-loading" style={{ minHeight: "200px" }}>
                <div className="planner-spinner" />
              </div>
            ) : widgets.length === 0 ? (
              <div className="empty-widgets">
                <p>No widgets yet</p>
                <p className="hint">Create your first widget to get started</p>
              </div>
            ) : (
              widgets.map((widget) => (
                <div key={widget._id} className="widget-card">
                  <div className="widget-card-header">
                    <h3 className="widget-name">{widget.name}</h3>
                    <span className="widget-date">
                      {new Date(widget.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="widget-url-group">
                    <input
                      type="text"
                      className="widget-url-input"
                      value={getWidgetUrl(widget.widgetId)}
                      readOnly
                    />
                    <button
                      type="button"
                      className={`btn-copy ${copiedId === widget.widgetId ? "copied" : ""}`}
                      onClick={() => copyToClipboard(widget.widgetId, getWidgetUrl(widget.widgetId))}
                    >
                      {copiedId === widget.widgetId ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <div className="widget-actions">
                    <a
                      href={getWidgetUrl(widget.widgetId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-preview"
                    >
                      Preview
                    </a>
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => handleDeleteWidget(widget._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
