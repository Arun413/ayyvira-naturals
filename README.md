# 🌿 Ayvira Naturals — Website

A complete, responsive static website for the Ayvira Naturals skincare brand.  
Built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks, no dependencies.

---

## 📁 Folder Structure

```
Ayvira/
├── index.html          ← Home page
├── about.html          ← About / Brand Story page
├── products.html       ← Product catalogue with filter
├── contact.html        ← Contact form with validation
├── css/
│   └── style.css       ← All styles (responsive, animated)
├── js/
│   └── script.js       ← Navbar, scroll animations, filter, form logic
├── images/             ← Drop your product/brand images here
└── README.md           ← This file
```

---

## ✨ Features

- **4 fully linked pages** — Home, About, Products, Contact
- **Sticky responsive navbar** with hamburger mobile menu
- **Scroll-triggered fade-in animations** (IntersectionObserver)
- **Product filter** by category (Face / Body / Hair / Lip)
- **Contact form** with JS validation + Formspree support
- **Success message** shown after form submission
- **Google Fonts** — Cormorant Garamond + Jost
- Fully relative paths → works as a **static site on GitHub Pages**

---

## 🖼️ Adding Real Images

Replace the SVG placeholder `<div class="img-placeholder">` blocks with real `<img>` tags:

```html
<!-- Before (placeholder) -->
<div class="img-placeholder" style="height:100%"> ... </div>

<!-- After (real image) -->
<img src="images/rose-serum.jpg" alt="Rose Hip Glow Serum" loading="lazy" />
```

Place all images in the `/images/` folder.

---

## 📧 Setting Up the Contact Form (Formspree)

1. Go to **https://formspree.io** and sign up for a free account.
2. Create a new form — you'll receive a form ID like `xpwzabcd`.
3. Open `js/script.js` and find this line near the top of the form section:

```js
const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← replace with your Formspree form ID
```

4. Replace `YOUR_FORM_ID` with your actual ID, e.g.:

```js
const FORMSPREE_ID = 'xpwzabcd';
```

5. That's it! The form will now submit to your email via Formspree.  
   While `YOUR_FORM_ID` is a placeholder, the form shows a demo success message instead.

---

## 🚀 GitHub Pages Deployment — Step by Step

### Step 1 — Create a GitHub Repository

1. Go to **https://github.com/new**
2. Name it `Ayvira-naturals` (or any name you prefer)
3. Make it **Public**
4. Click **"Create repository"**

### Step 2 — Upload Files

**Option A — Via GitHub web UI (easiest):**
1. Open your new repo
2. Click **"uploading an existing file"**
3. Drag and drop ALL your project files and folders
4. Commit with message: `Initial website commit`

**Option B — Via Git CLI:**
```bash
cd /path/to/Ayvira/
git init
git add .
git commit -m "Initial website commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Ayvira-naturals.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, click **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 4 — Access Your Live Site

After ~1 minute your site will be live at:

```
https://YOUR_USERNAME.github.io/Ayvira-naturals/
```

GitHub will show a "Your site is live at…" banner at the top of the Pages settings.

---

## 🎨 Customisation Guide

### Colors (in `css/style.css`)
```css
:root {
  --dark-green : #2E7D32;   /* Primary brand green */
  --light-green: #A5D6A7;   /* Soft green accents */
  --gold       : #C8A45D;   /* Gold highlight */
  --bg         : #F9F7F2;   /* Off-white background */
}
```

### Fonts
Change the Google Fonts import at the top of `style.css` to swap fonts.

### Products
Add or remove `<article class="product-card">` blocks in `products.html`.  
Set `data-category="face|body|hair|lip"` to control filtering.

---

## 📱 Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge.  
Mobile-first responsive design tested at 320px → 1440px+.

---

*Made with 🌿 — Ayvira Naturals, Tamil Nadu, India*

