# Book Cataloging System - JavaScript Implementation

**Team Members:**
- Muhammad Khizer Khan (Java Implementation - Separate Repository)
- Yuvaraj Dalavai (JavaScript/React Implementation - This Repository)

**Course:** Advanced Programming Languages  
**Professor:** Jay Thom  
**Group:** 12  
**Day 2 Date:** Saturday, October 25, 2025

---

## 🚀 Live Demo

*[Demo link will be added after deployment]*

---

## 📋 Project Overview

This is the **JavaScript/React implementation** of the Book Cataloging System, developed as part of Day 2 core functionality requirements. The project demonstrates modern web development practices using React, TypeScript, and functional programming concepts.

**Status:** ✅ Day 2 Complete - All acceptance criteria met

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn-ui (Radix UI)
- **State Management:** Custom React hooks with localStorage
- **Testing:** Vitest (configured)
- **Code Quality:** ESLint + Prettier
- **License:** MIT

---

## ✨ Features

### Day 2 Core Functionality (All Implemented ✅)

- ✅ **CRUD Operations**
  - Add new books via intuitive form interface
  - Update existing books with form pre-population
  - Delete books with confirmation dialog
  - All changes persist automatically to localStorage

- ✅ **Form Validation**
  - Required fields: Title, Author, Genre, Year
  - Year validation: Must be between 1450 and current year
  - Duplicate prevention: Prevents identical (title + author) pairs
  - Edition handling: Confirms different years as separate editions

- ✅ **Search Functionality**
  - Search by Title, Author, or Genre (dropdown selection)
  - Debounced input (300ms) for performance
  - Case-insensitive partial matching
  - Live results display with "No matches" state

- ✅ **Reports**
  - Books grouped by Genre (with counts)
  - Books grouped by Author (with counts)
  - Expandable/collapsible lists for each group
  - Uses Array.prototype.reduce for grouping

- ✅ **Main Table**
  - Display all books in organized table
  - Sortable columns (Title, Author, Genre, Year)
  - Toggle ascending/descending sort
  - Edit and Delete action buttons
  - Default sort: Title ascending

- ✅ **Data Persistence**
  - localStorage key: `bookCatalog.v1`
  - Automatic save on all changes
  - Seed data loads on first run (7 books)
  - Data survives page refreshes

- ✅ **Accessibility & UX**
  - Semantic HTML structure
  - Keyboard navigation support
  - ARIA labels and roles
  - Toast notifications for user feedback
  - Responsive design (mobile, tablet, desktop)
  - Loading states

---

## 🎯 JavaScript Language Features Showcased

This implementation demonstrates modern JavaScript/TypeScript features:

- **ES Modules:** Clean imports/exports across all files
- **Arrow Functions:** Consistent use throughout codebase
- **Array Methods:** Extensive use of map, filter, reduce, find, some, sort
- **Immutability:** State updates using spread operators and immutable patterns
- **Debouncing:** Custom debounce utility for search input
- **Destructuring:** Object and array destructuring
- **Optional Chaining:** Safe property access
- **Type Safety:** TypeScript interfaces and types
- **Functional Components:** React hooks (useState, useEffect, useCallback, useMemo)
- **Custom Hooks:** Reusable useBookStore hook for state management

---

## 📁 Project Structure

```
/
├── README.md                          # This file
├── COMPARISON-REPORT-STUB.md          # Day 3: JS vs Java comparison
├── PRESENTATION-OUTLINE.md            # Presentation guide
├── LICENSE                            # MIT License
├── index.html                         # Entry HTML
├── vite.config.ts                     # Vite configuration
├── tailwind.config.ts                 # Tailwind CSS config
├── tsconfig.json                      # TypeScript config
├── package.json                       # Dependencies and scripts
│
├── src/
│   ├── main.tsx                       # Application entry point
│   ├── App.tsx                        # Root component
│   ├── index.css                      # Global styles
│   │
│   ├── types/
│   │   └── book.ts                    # TypeScript interfaces
│   │
│   ├── lib/
│   │   ├── bookUtils.ts               # Core utilities (validate, search, sort, group)
│   │   └── seedData.ts                # Initial catalog data
│   │
│   ├── hooks/
│   │   └── useBookStore.ts            # Custom hook for state + localStorage
│   │
│   ├── components/
│   │   ├── BookForm.tsx               # Add/Update form
│   │   ├── BookTable.tsx              # Main table with sorting
│   │   ├── SearchPanel.tsx            # Search interface
│   │   ├── ReportsPanel.tsx           # Genre/Author reports
│   │   └── ui/                        # shadcn-ui components
│   │
│   └── pages/
│       ├── Index.tsx                  # Main application page
│       └── NotFound.tsx               # 404 page
│
└── tests/                             # Unit tests (Vitest)
    └── (test files to be added)
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed ([Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd book-catalog-js

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run unit tests (Vitest)
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

---

## 🌐 Build & Deploy

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Deployment Options

#### **Netlify** (Recommended)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

#### **Vercel**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repo
4. Vercel auto-detects Vite settings
5. Click "Deploy"

---

## 📊 Seed Data

On first run, the catalog is populated with 7 books:

1. Clean Code (Robert C. Martin, 2008) - Software
2. The Pragmatic Programmer (Andrew Hunt, 1999) - Software
3. Dune (Frank Herbert, 1965) - Science Fiction
4. 1984 (George Orwell, 1949) - Dystopian
5. Sapiens (Yuval Noah Harari, 2011) - History
6. Neuromancer (William Gibson, 1984) - Science Fiction
7. The Hobbit (J.R.R. Tolkien, 1937) - Fantasy

---

## 🧪 Testing

Unit tests are configured with Vitest. Test files will be added in the `tests/` directory covering:

- CRUD operations
- Search functionality (case-insensitive, partial matching)
- Report grouping (reduce operations)
- Validation logic
- localStorage persistence

```bash
npm test           # Run tests once
npm run test:watch # Watch mode for development
```

---

## 📝 Known Limitations & Future Enhancements

### Current Limitations
- localStorage has ~5-10MB limit (sufficient for thousands of books)
- No backend - data only persists in browser
- Single-user system (no authentication)
- No import/export functionality

### Day 3 Planned Features
- Export catalog to CSV/JSON
- Import books from file
- Advanced filtering (multiple criteria)
- Statistics dashboard
- Print-friendly views
- Dark mode toggle

---

## 📚 Documentation Files

- **COMPARISON-REPORT-STUB.md** - Template for Day 3 JavaScript vs Java comparison
- **PRESENTATION-OUTLINE.md** - Presentation structure and demo script

---

## 🔗 Links

- **GitHub Repository:** *[To be added]*
- **Live Demo:** *[To be added after deployment]*
- **Java Implementation:** *[Separate repository - Muhammad Khizer Khan]*

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

Copyright (c) 2025 Group 12

---

## 👥 Team

- **Yuvaraj Dalavai** - JavaScript/React Implementation
- **Muhammad Khizer Khan** - Java Implementation (Separate Repo)

**Course:** Advanced Programming Languages  
**Professor:** Jay Thom  
**Institution:** *[Your University Name]*

---

## 🙏 Acknowledgments

- Professor Jay Thom for project guidance
- shadcn-ui for excellent React components
- Radix UI for accessible primitives

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
