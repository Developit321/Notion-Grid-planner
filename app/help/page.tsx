"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function HelpPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="planner-loading">
        <div className="planner-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <main className="help-page">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <Link href="/dashboard" className="dashboard-logo">
            ← Grid Planner
          </Link>
        </div>
      </header>

      <div className="help-content">
        <h1 className="help-title">How to Configure Your Widget</h1>
        <p className="help-intro">
          Follow these steps to connect your Notion database to the Grid Planner and create embeddable widgets for Instagram and TikTok.
        </p>

        <section className="help-section">
          <h2>Part 1: Create a Notion Integration</h2>
          <ol className="help-steps">
            <li>
              Go to <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer">notion.so/my-integrations</a> and sign in.
            </li>
            <li>
              Click <strong>+ New integration</strong>. Name it (e.g. &quot;Instagram Grid Planner&quot;) and select your workspace.
            </li>
            <li>
              Click <strong>Submit</strong>, then copy the <strong>Internal Integration Secret</strong> (starts with <code>secret_</code>). You will paste this when creating a widget.
            </li>
          </ol>
        </section>

        <section className="help-section">
          <h2>Part 2: Set Up Your Notion Database</h2>
          <p>Your database must have these properties. Names must match exactly.</p>
          <div className="help-table-wrap">
            <table className="help-table">
              <thead>
                <tr>
                  <th>Property name</th>
                  <th>Type in Notion</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>Title</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td><strong>files</strong></td>
                  <td>Files &amp; media</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td>Status</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>Caption</strong></td>
                  <td>Text</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>Order</strong></td>
                  <td>Number</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>Pinned</strong></td>
                  <td>Checkbox</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>platform</strong></td>
                  <td>Select</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><strong>Source</strong></td>
                  <td>URL or Text</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="help-note">
            <strong>Tips:</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>Use <strong>files</strong> (lowercase) for images and videos. Multiple files in one row create a carousel.</li>
              <li>Use <strong>Status</strong> type (not Select) for colored status badges. Options like &quot;planned&quot;, &quot;posted&quot; will show with different colors.</li>
              <li>Use <strong>platform</strong> (lowercase) with options &quot;instagram&quot; or &quot;tiktok&quot; to toggle between views in the widget.</li>
              <li>Add <strong>Source</strong> (URL or Text) to show a source link when viewing images/videos in the preview.</li>
            </ul>
          </p>
        </section>

        <section className="help-section">
          <h2>Part 3: Connect the Integration to Your Database</h2>
          <ol className="help-steps">
            <li>Open the Notion page that contains your database.</li>
            <li>Click the <strong>⋯</strong> (three dots) at the top right of the database.</li>
            <li>Click <strong>Connections</strong> or <strong>Add connections</strong>.</li>
            <li>Select your integration (e.g. &quot;Instagram Grid Planner&quot;) to connect it.</li>
          </ol>
        </section>

        <section className="help-section">
          <h2>Part 4: Get Your Database ID</h2>
          <ol className="help-steps">
            <li>Open the database as a full page (click &quot;Open as full page&quot; if it’s inline).</li>
            <li>Look at the URL in your browser. It looks like: <code>https://www.notion.so/workspace/DATABASE_ID?v=...</code></li>
            <li>The <strong>Database ID</strong> is the 32-character string (letters and numbers, sometimes with hyphens) before <code>?v=</code>.</li>
            <li>Copy either the full URL or just the ID. When creating a widget, you can paste either — the app will use the ID.</li>
          </ol>
        </section>

        <section className="help-section">
          <h2>Part 5: Create Your Widget</h2>
          <ol className="help-steps">
            <li>In the app, go to <strong>Dashboard</strong> → <strong>Create Widget</strong>.</li>
            <li>Enter a <strong>Widget name</strong>, your <strong>Notion integration token</strong>, and the <strong>Database URL or ID</strong>.</li>
            <li>Click <strong>Create widget</strong>.</li>
            <li>Go to <strong>Your Widgets</strong> and copy the embed URL (e.g. <code>/widget/abc123</code>).</li>
          </ol>
        </section>

        <section className="help-section">
          <h2>Part 6: Embed in Notion</h2>
          <ol className="help-steps">
            <li>In Notion, type <strong>/embed</strong> and choose <strong>Embed</strong>.</li>
            <li>Paste your widget URL and confirm. The grid will load in the page.</li>
          </ol>
        </section>

        <section className="help-section help-troubleshooting">
          <h2>Troubleshooting</h2>
          <ul>
            <li><strong>Invalid Notion credentials:</strong> Check that the token is correct and the integration is <strong>connected</strong> to the database (Part 3).</li>
            <li><strong>Empty grid:</strong> Make sure the database has rows and the <strong>files</strong> property (lowercase) has at least one image or video in some rows.</li>
            <li><strong>Status not showing:</strong> Use the <strong>Status</strong> property type (not Select) in Notion. Status badges will display with colors matching Notion&apos;s status colors.</li>
            <li><strong>Platform toggle not working:</strong> Make sure <strong>platform</strong> is lowercase and options are exactly &quot;instagram&quot; or &quot;tiktok&quot; (case-insensitive).</li>
            <li><strong>Integration not in the list:</strong> Create the integration in the same Notion workspace as the database.</li>
          </ul>
        </section>

        <p className="help-back">
          <Link href="/dashboard">← Back to Dashboard</Link>
        </p>
      </div>
    </main>
  );
}
