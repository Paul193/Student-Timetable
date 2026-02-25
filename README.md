## Student Timetable

A modern, mobile‑friendly student timetable web app with an admin dashboard.

### Student app (`index.html`)

- **Course selection**: Searchable, scrollable list of courses (e.g. `IENDCY336`) before the timetable is shown.
- **Weekly timetable**: Grid view with **Monday–Saturday** columns and hourly rows from 08:00–16:00.
- **Display options**: Checkboxes above the grid to toggle:
  - Start & end time for each block
  - Venue
  - Floor
  - Practical / Theory
- **Lecturer details**: Clicking a subject opens a card with:
  - Lecturer photo, name and title
  - Office, consultation hours and email
  - Buttons: **Go to class** and **Go to office**
- **How to get there**:
  - Each button opens a vertical list of 5 images:
    1. Campus / building location
    2. Building exterior
    3. Floor
    4. Classroom / office door
    5. Inside the venue
  - Tap an image to reveal the **specific step instruction** (e.g. “Go to the second floor”) under that image.
  - Tap again to hide the instruction.
- **Image lightbox**: Tapping an image enlarges it in a lightbox with the step’s instruction.
- **Responsive layout**:
  - On desktop, the full week grid is visible.
  - On mobile, the timetable is horizontally scrollable so all days (Mon–Sat) are accessible.

### Admin dashboard (`admin.html`)

All admin data is stored in **localStorage** in the browser (no backend yet).

- **Upload data** tab:
  - Drag‑and‑drop or browse a JSON file scraped from the university timetable site.
  - Shows a preview and counts of imported courses and lecturers.
  - Merges uploaded data into existing data.
  - Expected structure is documented in `data-format.md`.

- **Courses & timetables** tab:
  - Create or edit courses (code + display name).
  - Manage timetable slots:
    - Day (Mon–Sat), start hour, span (hours)
    - Subject, venue, floor, type (practical/theory)
    - Lecturer ID (links to a lecturer in the Lecturers tab)
  - Supports marking slots as **breaks** (no subject/venue/type).

- **Lecturers** tab:
  - Add, edit and delete lecturers either manually or via JSON upload.
  - Fields: ID, name, title, office, office floor, class building, consultation hours, email, optional photo URL.

- **Venue images** tab:
  - Configure images for the “How to get there” steps.
  - Supports a **default** set and additional named venue sets (e.g. “Block A” or “Room 101”).
  - Images are stored per step (1–5) in localStorage.

### Running the app locally

You can open `index.html` and `admin.html` directly in your browser, or serve the folder with a simple HTTP server:

```bash
cd Student_Timetable_2
python3 -m http.server 8000
```

Then open:

- Student app: `http://localhost:8000/index.html`
- Admin dashboard: `http://localhost:8000/admin.html`

To test on your phone on the same Wi‑Fi network, replace `localhost` with your computer’s local IP address (e.g. `http://192.168.0.10:8000/index.html`).

### GitHub setup

The repository is initialised locally with `main` as the default branch and remote:

```bash
git remote add origin https://github.com/Paul193/Student-Timetable.git
```

Push your code (including this README) to GitHub with:

```bash
git push -u origin main
```

