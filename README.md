# ⭐ Star Wars Fleet Dashboard

A sleek, interactive dashboard built with **Next.js** that allows users to explore, filter, and compare starships from the Star Wars universe.

---

## 🚀 Features

### 🔍 Real-time Starship Search
- Live search with debounced inputs for optimal performance
- Instant filtering of starships by name

### 🧪 Advanced Filtering System
- Filter by **Crew Size**: `1-5`, `6-50`, `50+`
- Filter by **Hyperdrive Rating**: `<1.0`, `1.0-2.0`, `>2.0`
- Combine filters for precision

### 🔄 Infinite Scroll
- Automatically loads more starships as you scroll
- Smooth UX with skeleton loading placeholders
- Powered by the Intersection Observer API

### ⚖️ Starship Comparison
- Select up to **3 starships**
- View side-by-side comparison in a modal
- Compare core attributes like name, model, manufacturer, etc.

### 📱 Responsive Design
- Mobile-friendly layout
- Clean, adaptive tables on all screen sizes
- Fully optimized for modern browsers

---

## 🛠️ Tech Stack

- **Framework:** Next.js 13.5.10
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **State Management:**
  - `Jotai` for global state (e.g., selected starships)
  - `@tanstack/react-query` for data fetching and caching
- **API Integration:**
  - [SWAPI](https://swapi.dev/) (Star Wars API)
  - `Axios` for HTTP requests

---

## ⚙️ Getting Started

1. Install dependencies:

```bash
npm install
```

2.Run development server:

```bash 
npm run dev 
```

2.Build for production:

```bash 
npm run build
```