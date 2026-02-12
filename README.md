# Instagram Grid Planner

A multi-user web app that lets you connect a Notion database to an embeddable Instagram-style grid widget. Sign up, add your Notion credentials, and get a URL to embed in Notion or anywhere else.

## Features

- **Sign up / Log in** with email and password
- **Create widgets** by connecting your Notion integration token and database ID
- **Embeddable URLs** — each widget gets a unique URL (e.g. `https://yoursite.com/widget/abc123`) you can embed in Notion
- **3-column Instagram-style grid** with drag-and-drop reordering
- **Multi-image/video posts** — carousel support for posts with multiple images or videos; hover to preview videos in the grid
- **Platform toggle** — switch between Instagram (3-column grid) and TikTok (vertical 9:16 grid) views using the `platform` field
- **Image preview** — click any post to view full size with caption and status

## Prerequisites

- **Node.js** 18 or later
- **MongoDB Atlas** account (free tier is fine)
- **Notion** account and a database with the right structure

---

## 1. Clone and install

```bash
cd Insta_grid
npm install --legacy-peer-deps
```

Use `--legacy-peer-deps` if you see dependency conflicts.

---

## 2. Environment variables

Create a file named `.env.local` in the project root with:

```env
# MongoDB Atlas connection string
# Replace <db_password> with your database user password
# If the password has special characters ($, %, @, etc.), URL-encode them:
#   $ → %24   % → %25   @ → %40
MONGODB_URI=mongodb+srv://YOUR_USERNAME:<db_password>@YOUR_CLUSTER.mongodb.net/instagram_grid_planner?retryWrites=true&w=majority

# Generate a random string (e.g. run: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-here

# Your app URL (use http://localhost:3000 for local dev)
NEXTAUTH_URL=http://localhost:3000
```

### Getting your MongoDB URI

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and sign in.
2. Create a free cluster if you don’t have one.
3. **Database Access** → **Add New Database User**  
   - Set a username and password (save the password).  
   - Or use **Autogenerate Secure Password** and copy it.
4. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (or add your server IP).
5. **Database** → **Connect** → **Drivers** → copy the connection string.
6. Replace `<password>` in that string with your actual password (URL-encode special characters).
7. Paste the result into `MONGODB_URI` in `.env.local`.

**If you get "bad auth : authentication failed"**, your password likely has special characters (`$`, `%`). Use separate env vars instead — add to `.env.local`:
`MONGODB_USER=your_username`, `MONGODB_PASSWORD=your_raw_password`, `MONGODB_CLUSTER=yourcluster.vyjvmsk.mongodb.net` (your cluster hostname from the connection string). The app will URL-encode the password for you.

---

## 3. Notion setup

**For a full step-by-step guide (Notion integration, database fields, connections, database ID), see:**

- **In the app:** After logging in, click **"How to configure"** in the dashboard header, or go to `/help`.
- **In the repo:** [docs/HOW-TO-CONFIGURE.md](docs/HOW-TO-CONFIGURE.md) — share this file with clients.

### Create an integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations).
2. **New integration** → name it (e.g. “Grid Planner”).
3. Copy the **Internal Integration Token** (starts with `secret_`).

### Create or use a database

Your Notion database should have these properties:

| Property name | Type     | Notes                          |
|---------------|----------|---------------------------------|
| **Name**      | Title    | Post name                       |
| **Content**   | Files & media | One or more images or videos per row (upload or embed link) |
| **Status**    | Select   | e.g. planned, scheduled, posted |
| **Caption**   | Text     | Optional                        |
| **Order**     | Number   | For grid order                  |
| **Pinned**    | Checkbox | Optional, for pinning posts     |
| **platform**  | Select   | "instagram" or "tiktok" (default: instagram) |

### Connect the integration to the database

1. Open your Notion database page.
2. Click **⋯** (top right) → **Connections** or **Add connections**.
3. Select your integration so it can read (and optionally write) the database.

### Get the database ID

- **From the database URL:**  
  `https://www.notion.so/workspace/DATABASE_ID?v=...`  
  The **DATABASE_ID** is the 32-character string (sometimes with hyphens; remove hyphens when pasting if needed).

- Or open the database as a full page and copy the ID from the URL.

---

## 4. Run the app

**Development:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm start
```

---

## 5. How to use

1. **Open the app** (e.g. `http://localhost:3000`).
2. **Sign up** with your email and a password (or log in if you already have an account).
3. **Dashboard** → **Create Widget** tab:
   - **Widget name** — e.g. “My Instagram Grid”.
   - **Notion integration token** — the `secret_...` from Notion.
   - **Database URL or ID** — full database URL or just the 32-character ID.
4. Click **Create widget**.
5. **Your Widgets** tab shows your widgets. Copy the **embed URL** (e.g. `http://localhost:3000/widget/abc123`).

### Embed in Notion

1. In Notion, type `/embed` and choose **Embed**.
2. Paste your widget URL.
3. The grid will load inside the page.

### Embed elsewhere

Use the same URL in any iframe or embed block that supports URLs.

---

## Project structure

```
Insta_grid/
├── app/
│   ├── page.tsx              # Landing (redirects to login or dashboard)
│   ├── login/page.tsx        # Login
│   ├── signup/page.tsx       # Sign up
│   ├── dashboard/page.tsx    # Create and manage widgets
│   ├── widget/[id]/page.tsx  # Embeddable grid (public)
│   └── api/
│       ├── auth/             # NextAuth + signup
│       └── widgets/           # Widget CRUD and posts
├── components/               # Grid, GridItem, SessionProvider
├── lib/                      # MongoDB, auth, encryption, Notion
└── types/
```

---

## Security notes

- Notion tokens are encrypted in the database.
- Passwords are hashed with bcrypt.
- Change your MongoDB password if it was ever shared or exposed.
- In production, use HTTPS and set `NEXTAUTH_URL` to your real domain.

---

## Troubleshooting

| Issue | What to try |
|-------|-------------|
| “Invalid Notion credentials” | Check token, database ID, and that the integration is connected to the database. |
| “Please add your MongoDB URI” | Ensure `.env.local` exists and `MONGODB_URI` is set (and restart the dev server). |
| Widget page shows “Widget not found” | Confirm the widget ID in the URL and that the widget exists for your user. |
| Dependency install errors | Run `npm install --legacy-peer-deps`. |

---

## License

Private / use as you like.
