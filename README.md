# SRTtrail.dev | Local Business Web Discovery Tool

An interactive, client-facing web application designed to help local businesses scope out their digital needs. Built by SRTtrail.dev, this tool replaces boring, static forms with an engaging 4-step wizard that dynamically visualizes the client's project focus areas.

### 🌟 Features

- Interactive 4-Step Wizard: Guides local business owners through their contact info, business goals, feature priorities, and launch timeline without overwhelming technical jargon.

- Top 5 Priorities Logic: A custom checklist that limits users to selecting their top 5 core features, forcing them to prioritize what matters most.

- Dynamic Scope Visualization: Uses native progress-meter UI to generate an accessible, personalized breakdown of the project's major focus areas.

- Auto-Save Progress: Utilizes browser localStorage to save user input on every keystroke. Clients can close the tab and return later without losing their progress.

- Early Lead Capture Foundation: Built-in logic to fire a backend webhook the moment a user completes Step 1 (Contact Info), ensuring you capture the lead even if they abandon the rest of the form.

- Instant Export & Submission: Users can instantly download their finalized answers as a cleanly formatted .txt file or forward them directly to your email using native mailto: integration.

- Celebration UI: Built-in celebratory motion on successful completion without third-party dependencies.

### 🛠️ Tech Stack

This project is built to be ultra-lightweight and serverless. There are no build tools or complicated setups required.

- HTML5

- Vanilla JavaScript (ES6+)

- Modular CSS3 (BEM architecture in `stylesheet/block/`)

- Vanilla JavaScript module for rendering the focus breakdown and celebration motion

- Cloudflare Worker + Resend (early lead email capture)

### 🚀 Getting Started

- Clone or Download this repository/folder.

- Open the index.html file directly in any modern web browser (Chrome, Safari, Firefox, Edge).

- That's it! The application runs entirely in the browser.

### ⚙️ Customization & Next Steps

- Update Branding Assets: Replace files in `assets/` such as the logo, avatar, and Open Graph image.

- Update Lead Endpoint (Optional): In `index.html`, edit the early lead `fetch()` URL in `nextStep()` if your Worker URL changes.

- Backend Worker Source: The Worker implementation is in `cloudflare-worker/src/index.js` with `cloudflare-worker/wrangler.toml` for deployment.

- Update Contact Email: In the emailAnswers() JavaScript function, ensure the mailto: address is set to your preferred business email (currently set to s.trail7878@gmail.com).

### 👨‍💻 Author

SRTtrail.dev
Supporting Local Businesses with Digital Homes.
