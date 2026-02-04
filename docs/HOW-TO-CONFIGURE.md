# How to Configure Your Instagram Grid Widget

Follow these steps to connect your Notion database to the Instagram Grid Planner widget.

---

## Part 1: Create a Notion Integration

The widget reads your posts from Notion using an **integration** (like an app connection).

### Step 1.1 — Go to Notion Integrations

1. Open your browser and go to: **https://www.notion.so/my-integrations**
2. Log in to Notion if prompted.

### Step 1.2 — Create a new integration

1. Click **"+ New integration"**.
2. Give it a name (e.g. **"Instagram Grid Planner"**).
3. Select the **workspace** where your database lives.
4. Under **Capabilities**, leave **Read content**, **Update content**, and **Insert content** as needed (at minimum, **Read content**).
5. Click **"Submit"**.

### Step 1.3 — Copy the integration token

1. On the integration page, find **"Internal Integration Secret"** or **"Token"**.
2. Click **"Show"** or **"Copy"** to reveal/copy it.
3. The token starts with `secret_` — **save it somewhere safe**. You will paste it into the Grid Planner when creating a widget.

![Notion integration token is shown on the integration's page after you create it.]

---

## Part 2: Create or Prepare Your Notion Database

Your grid is powered by a **Notion database**. The database must have specific property names and types.

### Step 2.1 — Create a new database (or use an existing one)

1. In Notion, open the page where you want the database (or create a new page).
2. Type **/table** and choose **"Table - Inline"** or **"Table - Full page"**.
3. Name the database (e.g. **"Instagram Posts"**).

### Step 2.2 — Add or rename the required properties

Your database must have these **exact property names** and types. For **Select** and **Status** properties, add the options listed in the last column.

| # | Property name in Notion | Type in Notion      | Required | What to add / Options |
|---|--------------------------|---------------------|----------|------------------------|
| 1 | **Name**                 | Title               | Yes      | Post title (e.g. "Week 1 Post"). One title per row. |
| 2 | **Files**                | Files & media       | Yes      | Upload one or more images or videos per row. Multiple files = carousel. |
| 3 | **Date**                 | Date                | Yes      | Date field for chronological sorting. Unpinned posts are sorted by date (most recent first). |
| 4 | **Status**               | **Status** (not Select) | No   | Add status options in Notion, e.g. **Planned**, **Scheduled**, **Posted**. Set colors in Notion; the widget shows them as colored badges. Do not use "Select" for Status. |
| 5 | **Caption**              | Text                | No       | Optional caption or description. Shown in the preview when you click a post. |
| 6 | **Pinned Placement**     | **Multi-select**    | No       | Add exactly three options: **1**, **2**, **3** (as strings). Posts with these values appear pinned in the first row. Only posts in the first row can be pinned. |
| 7 | **Platform**             | **Select**          | No       | Add exactly these two options: **instagram** and **tiktok** (lowercase). Use "instagram" for 4:5 grid, "tiktok" for 9:16 vertical. |
| 8 | **Source**               | URL or Text         | No       | Link or text (e.g. Canva link). Shown as a clickable "Source" link in the preview. No options to add. |

**Quick reference — Property Types:**
- **Status** — Use Notion property type **Status** (not Select). Add options such as Planned, Scheduled, Posted; set colors in Notion if you like.
- **Platform** — Use Notion property type **Select**. Add only these two options: **instagram** and **tiktok** (lowercase). The property name should be **Platform** (capitalized).
- **Pinned Placement** — Use Notion property type **Multi-select**. Add exactly three options: **1**, **2**, **3** (as strings). Posts with these values appear pinned in the first row.

**Important:**  
- **Name**, **Files**, and **Date** are required.  
- All property names start with capital letters (Name, Files, Date, Status, Caption, Platform, Source, Pinned Placement).  
- Use **Status** type (not Select) for colored status badges.  
- **Pinned Placement** determines which posts appear pinned (values 1, 2, or 3 = first row positions).  
- **Status**, **Caption**, **Platform**, and **Source** are optional but recommended.

### Step 2.3 — How to add or change a property

1. In the database, click the **+** at the right of the column headers (or the **⋯** on a column).
2. To **add** a property: choose the type (e.g. **Files & media**, **Select**, **Status**, **Number**, **Checkbox**, **Text**) and name it exactly as in the table above.
3. For **Status**: use the **Status** type (not Select). Click the property, then add options (e.g. Planned, Scheduled, Posted) and set colors if you like.
4. For **platform**: use the **Select** type. After creating it, add exactly two options: **instagram** and **tiktok** (lowercase).
5. To **rename**: click the current name and type the exact name from the table.

### Step 2.4 — Fill in a few rows

1. **Name** — type a title for each post.
2. **Files** — click the cell, then **"Upload"** or **"Embed"** to add one or more images or videos. Videos (MP4, WebM, MOV) are supported and will show with hover preview in the grid.
3. **Date** — set a date for each post. Posts are sorted chronologically by date (most recent first). When you manually reorder posts, their dates are automatically updated.
4. **Status** — use Notion's **Status** property type (not Select). Pick an option like "planned", "posted", etc. Status badges will display with colors matching Notion's status colors.
5. **Caption** — optional text.
6. **Pinned Placement** — to pin a post, select **1**, **2**, or **3** from the multi-select. Only posts in the first row (first 3 positions) can be pinned. Pinned posts cannot be moved by dragging.
7. **Platform** — choose "instagram" or "tiktok" (lowercase). Default is "instagram". Instagram posts display in a 4:5 aspect ratio grid; TikTok posts display in a 9:16 vertical grid.
8. **Source** — optional URL or text (e.g. Canva link). Shows as a clickable "Source" link in the preview overlay when viewing images/videos.

---

## Part 3: Connect the Integration to Your Database

Notion only allows an integration to read a database after you **connect** it.

### Step 3.1 — Open the database

1. Open the Notion page that **contains** the database (the table view).
2. If the database is inline in a page, click anywhere on the table. If it’s a full-page database, you’re already there.

### Step 3.2 — Add the connection

1. Click the **⋯** (three dots) at the top right of the database.
2. Click **"Connections"** or **"Add connections"**.
3. In the list, find your integration (e.g. **"Instagram Grid Planner"**).
4. Click it to connect. The integration name should now show as connected.

Your database is now readable by the Grid Planner.

---

## Part 4: Get Your Database ID

The Grid Planner needs the **database ID** to load the right table.

### Step 4.1 — Open the database as a full page

1. **Option A:** Click **"Open as full page"** (↗) on the database block so it opens in a new tab.  
2. **Option B:** If the database is already a full page, just make sure you’re on that page.

### Step 4.2 — Copy the ID from the URL

The URL in your browser will look like one of these:

- `https://www.notion.so/YourWorkspace/a1b2c3d4e5f6...?v=...`
- `https://www.notion.so/a1b2c3d4e5f6789012345678abcdef12?v=...`

The **database ID** is the long string of letters and numbers (32 characters), sometimes with hyphens, before `?` or `?v=`.

**Examples:**

- From: `https://www.notion.so/MyWorkspace/abc123def456789012345678901234ab?v=...`  
  **Database ID:** `abc123def456789012345678901234ab`

- From: `https://www.notion.so/abc123de-f456-7890-1234-5678901234ab?v=...`  
  You can copy with or without hyphens; the Grid Planner accepts both.

**Paste this** into the **"Database URL or ID"** field when creating your widget (you can paste the full URL — the app will extract the ID for you).

---

## Part 5: Create Your Widget in the Grid Planner

1. Log in to the **Grid Planner** app.
2. Go to the **Dashboard** → **"Create a widget"** tab.
3. Fill in:
   - **Widget name** — e.g. "My Instagram Grid".
   - **Notion integration token** — the `secret_...` token from Part 1.
   - **Database URL or ID** — the full database URL or the 32-character ID from Part 4.
4. Click **"Create widget"**.
5. Go to **"Active widgets"** and copy the **embed URL** (e.g. `https://yoursite.com/widget/abc123`).

---

## Part 6: Embed the Grid in Notion (or elsewhere)

### In Notion

1. Open the Notion page where you want the grid.
2. Type **/embed** and select **"Embed"**.
3. Paste your widget URL and confirm.
4. The grid will load inside the page.

### Elsewhere

Use the same URL in any tool that supports embeds (iframe or embed block).

---

## Features Overview

### Sorting & Ordering
- **Chronological sorting**: Posts are sorted by **Date** (most recent first)
- **Pinned posts**: Posts with **Pinned Placement** values 1, 2, or 3 appear in the first row and are sorted by their placement value
- **Manual reordering**: Drag and drop posts to reorder them. Their dates are automatically updated to reflect the new order
- **Pinned posts are fixed**: Pinned posts cannot be moved by dragging - they stay in their assigned positions

### Pinning Posts
- **Pin button**: Hover over the pin icon on pinned posts to see an "Unpin this post?" tooltip
- **First row only**: Only posts in the first row (first 3 positions) can be pinned
- **Pinned Placement**: Use the **Pinned Placement** multi-select field with values **1**, **2**, or **3** to pin posts
- **Unpinning**: Click "Unpin" in the tooltip to remove a post from the pinned positions

### Platform Toggle
- **Instagram view**: 3-column grid with **4:5 aspect ratio** (portrait rectangles) - matches Instagram's 2026 grid format
- **TikTok view**: 3-column grid with **9:16 aspect ratio** (vertical videos)
- Toggle between views using the platform buttons at the top of the widget

### Media Support
- **Images**: JPG, PNG, GIF, etc.
- **Videos**: MP4, WebM, MOV, OGG, M4V
- **Multi-image/video posts**: Multiple files in one row create a carousel (indicated by an icon on the grid item)
- **Hover preview**: Videos in the grid play on hover (muted)

### Status Colors
- Status badges display with colors matching Notion's status colors
- Colors include: gray (default), green, blue, red, orange, yellow, purple, pink, brown

### Source Links
- Add a **Source** field (URL or Text) to show a clickable source link in the preview overlay
- Only appears when viewing images/videos in the preview, not in the grid

---

## Quick reference: Database fields

| Notion property | Type          | Required | Options to add |
|-----------------|---------------|----------|-----------------|
| Name            | Title         | Yes      | —               |
| Files           | Files & media | Yes      | —               |
| Date            | Date          | Yes      | —               |
| Status          | **Status** (not Select) | No | e.g. Planned, Scheduled, Posted |
| Caption         | Text          | No       | —               |
| Pinned Placement| **Multi-select** | No   | **1**, **2**, **3** (exactly these three, as strings) |
| Platform        | **Select**    | No       | **instagram**, **tiktok** (exactly these two, lowercase) |
| Source          | URL or Text   | No       | —               |

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| "Invalid Notion credentials or database ID" | Token correct? Integration **connected** to the database? Database ID or URL correct? |
| Grid is empty | Database has rows? **Files** property has at least one image or video in some rows? Property names spelled exactly with capital letters? |
| Posts not sorting correctly | Make sure **Date** field is set for all posts. Posts are sorted by date (most recent first). |
| Status not showing colors | Use Notion's **Status** property type (not Select). Status badges will display with colors matching Notion's status colors. |
| Platform toggle not working | Make sure **Platform** property exists and options are exactly "instagram" or "tiktok" (lowercase). |
| Source link not showing | Make sure **Source** field has a value. The link only appears in the preview overlay when viewing images/videos, not in the grid. |
| Can't pin posts | Only posts in the first row can be pinned. Use **Pinned Placement** multi-select with values **1**, **2**, or **3**. |
| Pinned posts can be moved | Pinned posts should be fixed. Make sure **Pinned Placement** has values 1, 2, or 3 set. |
| Integration not in "Connections" list | Make sure the integration was created in the **same workspace** as the database. |

If you still have issues, double-check: integration token, database connection, and property names (all start with capital letters: **Name**, **Files**, **Date**, etc.).
