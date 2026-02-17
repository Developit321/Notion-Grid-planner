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
          <p>Your database must have these properties. Names and types must match. For Select and Status, add the options listed below.</p>
          <div className="help-table-wrap">
            <table className="help-table">
              <thead>
                <tr>
                  <th>Property name</th>
                  <th>Type in Notion</th>
                  <th>Required</th>
                  <th>What to add / Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>Title</td>
                  <td>Yes</td>
                  <td>Post title (e.g. &quot;Week 1 Post&quot;). One title per row.</td>
                </tr>
                <tr>
                  <td><strong>Content</strong></td>
                  <td>Files &amp; media</td>
                  <td>Yes</td>
                  <td>Upload one or more images or videos per row. Multiple items = carousel in the grid.</td>
                </tr>
                <tr>
                  <td><strong>Date</strong></td>
                  <td>Date</td>
                  <td>Yes</td>
                  <td>Date field for chronological sorting. Posts are sorted by date (most recent first). When you manually reorder posts, their dates are automatically updated.</td>
                </tr>
                <tr>
                  <td><strong>Status</strong></td>
                  <td><strong>Status</strong> (not Select)</td>
                  <td>No</td>
                  <td>Add status options in Notion, e.g. <strong>Planned</strong>, <strong>Scheduled</strong>, <strong>Posted</strong>. You can set colors in Notion; the widget shows them as colored badges.</td>
                </tr>
                <tr>
                  <td><strong>Caption</strong></td>
                  <td>Text</td>
                  <td>No</td>
                  <td>Optional caption or description. Shown in the preview when you click a post.</td>
                </tr>
                <tr>
                  <td><strong>Pinned Placement</strong></td>
                  <td><strong>Multi-select</strong></td>
                  <td>No</td>
                  <td>Add exactly three options: <strong>1</strong>, <strong>2</strong>, <strong>3</strong> (as strings). Posts with these values appear pinned in the first row. Only posts in the first row can be pinned. Pinned posts cannot be moved.</td>
                </tr>
                <tr>
                  <td><strong>Platform</strong></td>
                  <td><strong>Select</strong></td>
                  <td>No</td>
                  <td>Add exactly these two options: <strong>instagram</strong> and <strong>tiktok</strong> (lowercase). Use &quot;instagram&quot; for 4:5 grid posts, &quot;tiktok&quot; for 9:16 vertical posts.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="help-callout">
            <h3>Quick reference: Property Types</h3>
            <ul>
              <li><strong>Status</strong> — In Notion, use property type <strong>Status</strong>. Add options such as Planned, Scheduled, Posted (and set colors if you like). Do not use &quot;Select&quot; for Status.</li>
              <li><strong>Platform</strong> — In Notion, use property type <strong>Select</strong>. Add only these two options: <strong>instagram</strong> and <strong>tiktok</strong> (lowercase). The property name should be <strong>Platform</strong> (capitalized).</li>
              <li><strong>Pinned Placement</strong> — In Notion, use property type <strong>Multi-select</strong>. Add exactly three options: <strong>1</strong>, <strong>2</strong>, <strong>3</strong> (as strings). Posts with these values appear pinned in the first row.</li>
            </ul>
            <div className="help-status-image">
              <p className="help-image-caption">Example: <strong>Status</strong> property in Notion with options like &quot;planned&quot;, &quot;In progress&quot;, and &quot;posted&quot; organized into categories</p>
              <img src="/images/statusfield.png" alt="Notion Status property: Status type with options planned, In progress, and posted" className="help-screenshot" />
            </div>
            <div className="help-platform-image">
              <p className="help-image-caption">Example: <strong>platform</strong> property in Notion with Options &quot;instagram&quot; and &quot;tiktok&quot;</p>
              <img src="/images/platformfield.png" alt="Notion platform property: Select type with options instagram and tiktok" className="help-screenshot" />
            </div>
          </div>
          <p className="help-note">
            <strong>Tips:</strong>
            <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
              <li>All property names start with capital letters: <strong>Name</strong>, <strong>Content</strong>, <strong>Date</strong>, <strong>Status</strong>, <strong>Caption</strong>, <strong>Platform</strong>, <strong>Pinned Placement</strong>.</li>
              <li><strong>Date</strong> is required for chronological sorting. Posts are sorted by date (most recent first).</li>
              <li>Use <strong>Status</strong> (the Status type), not Select, so the widget can show colored badges.</li>
              <li>For <strong>Platform</strong>, add only &quot;instagram&quot; and &quot;tiktok&quot; (lowercase) as options.</li>
              <li><strong>Pinned Placement</strong> determines which posts appear pinned. Only posts in the first row can be pinned (values 1, 2, or 3).</li>
              <li>Pinned posts cannot be moved by dragging - they stay fixed in their positions.</li>
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
            <li><strong>Empty grid:</strong> Make sure the database has rows and the <strong>Content</strong> property has at least one image or video in some rows.</li>
            <li><strong>Posts not sorting correctly:</strong> Make sure <strong>Date</strong> field is set for all posts. Posts are sorted by date (most recent first).</li>
            <li><strong>Status not showing:</strong> Use the <strong>Status</strong> property type (not Select) in Notion. Status badges will display with colors matching Notion&apos;s status colors.</li>
            <li><strong>Platform toggle not working:</strong> Make sure <strong>Platform</strong> property exists and options are exactly &quot;instagram&quot; or &quot;tiktok&quot; (lowercase).</li>
            <li><strong>Can&apos;t pin posts:</strong> Only posts in the first row can be pinned. Use <strong>Pinned Placement</strong> multi-select with values <strong>1</strong>, <strong>2</strong>, or <strong>3</strong>.</li>
            <li><strong>Pinned posts can be moved:</strong> Pinned posts should be fixed. Make sure <strong>Pinned Placement</strong> has values 1, 2, or 3 set.</li>
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
