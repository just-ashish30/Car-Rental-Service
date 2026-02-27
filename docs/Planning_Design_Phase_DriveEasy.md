## Planning & Design Phase Documentation (Frontend-Only)

**Project Theme (Selected)**: Service-Based — **Car Rental Service**  
**Project Title**: **DriveEasy — Frontend Car Rental Service Website (Prototype)**  
**Course**: BIT Web Technology  
**Submission Type**: Planning & Design Phase (20 Marks)  
**Student Name**: ___________________________  
**Student ID**: _____________________________  
**Instructor**: _____________________________  
**Institution**: ____________________________  
**Submission Date**: Friday, 27 Feb 2026  

> **Important Implementation Constraint (Instructor Requirement)**  
> This submission and the accompanying website are **FRONTEND-ONLY**.  
> - **No Flask / no backend code**  
> - **No database implementation**  
> - A **conceptual database design** is included strictly for documentation/analysis purposes.

---

### Table of Contents

1. Project Proposal  
   1.1 Project title and description  
   1.2 Target audience  
   1.3 Problem statement  
   1.4 Objectives and goals  
   1.5 Scope and limitations  
   1.6 Expected features list (mapped to marking scheme)  
2. Information Architecture  
   2.1 Website structure / sitemap  
   2.2 Page hierarchy and purpose  
   2.3 Navigation flow diagram  
   2.4 Content organization plan  
3. Wireframes & UI Design  
   3.1 Low-fidelity wireframes (all pages)  
   3.2 High-fidelity mockup description (main pages)  
   3.3 Color scheme and typography  
   3.4 UI/UX principles applied  
   3.5 Responsive design considerations  
4. Database Design (Conceptual — Documentation Only)  
   4.1 Entity-Relationship (ER) diagram  
   4.2 Database schema (tables, fields, data types)  
   4.3 Relationship definitions  
   4.4 Data validation rules (conceptual)  
   4.5 Sample data  
5. Technical Specification  
   5.1 Technology stack  
   5.2 Tools and environment  
   5.3 Architecture approach (frontend-only MVC-like separation)  
   5.4 Project timeline and milestones  
   5.5 Resource requirements  
   5.6 Version control (GitHub) commit planning (15–20 commits)  

---

## 1) Project Proposal (4 Marks)

### 1.1 Project Title and Description

**Title**: **DriveEasy — Car Rental Service Website (Frontend Prototype)**  

**Description**:  
DriveEasy is a responsive, multi-page car rental service website designed as a **frontend-only prototype**. The website simulates key real-world rental workflows—including browsing a fleet, searching/filtering vehicles, viewing vehicle details, creating and managing bookings, and managing a user profile—using **HTML5, CSS3, Bootstrap, JavaScript, and jQuery**.

Although the website does not include server-side development, it provides realistic application behavior by using **client-side state** (e.g., `localStorage`) to simulate database persistence and sessions. A conceptual database design is documented to demonstrate how the website would be implemented with a relational database in a full-stack version.

---

### 1.2 Target Audience

- **Primary Users (Customers)**: Students, young professionals, families, and travelers who need short-term vehicle rental.  
- **Secondary Users (Staff/Admin Concept)**: Rental staff who manage fleet availability and monitor bookings (represented in UI as an “Admin” view, simulated).  
- **Stakeholders**: Business owners/operators who need a professional online presence to drive bookings and customer trust.

---

### 1.3 Problem Statement

Traditional car rental booking processes can be slow and confusing due to:
- Limited fleet visibility (customers cannot easily compare car types, prices, features).
- Friction in booking forms (poor validation, unclear pricing).
- Lack of transparency (rental terms, pickup/return info not clearly communicated).
- Manual follow-ups for customers and staff.

**DriveEasy** addresses these issues through a modern UI with structured fleet data, interactive search/filtering, validated booking forms, and a booking dashboard to review, update, and cancel reservations.

---

### 1.4 Objectives and Goals

**General Goal**:  
Develop a complete, functional **frontend-only** car rental website prototype that demonstrates modern UI/UX and typical car rental workflows.

**Specific Objectives**:
- Provide a responsive, accessible web layout across mobile/tablet/desktop.
- Implement interactive pages with dynamic content rendering and filtering.
- Ensure robust form validation (client-side) for booking and contact workflows.
- Simulate user authentication and session-like behavior (frontend-only).
- Demonstrate CRUD operations on “Bookings” and “Profile” data using client-side storage.
- Document a realistic conceptual database design (ER diagram + schema) to show scalability.

---

### 1.5 Scope and Limitations

**In Scope (Implemented in Frontend Prototype)**:
- Multi-page website with consistent navigation and footer.
- Fleet browsing with search/filter features.
- Booking creation and booking management dashboard (CRUD simulation).
- Profile page (CRUD simulation).
- Contact form with validation.
- UI feedback (modals/alerts/toasts), interactive components, and dynamic rendering.

**Out of Scope (Not Implemented Due to Frontend-only Constraint)**:
- Real server-side authentication, password storage, sessions, or role-based authorization.
- Real database persistence, concurrency, transactions, and audit logs.
- Payment gateway integration (only UI concept may be shown).
- Email notifications (only conceptual).

**Limitations (Acknowledged)**:
- `localStorage` is not secure and is used only for prototype persistence.
- Data is stored per browser/device, not shared across users.
- “Admin” mode is a UI simulation and not protected by real authorization.

---

### 1.6 Expected Features List (Mapped to Marking Scheme)

The following features are planned to align with the assignment’s minimum requirements, while respecting the frontend-only constraint.

#### Required Functional Features

| Requirement | DriveEasy Implementation (Frontend-Only) |
|---|---|
| User registration and login | UI pages + client-side validation; simulated session using `localStorage` (conceptual security disclaimer included) |
| Dashboard (user/admin) | User dashboard for bookings; admin dashboard view simulated for fleet management (optional) |
| Profile management | Update profile fields; stored in `localStorage` |
| CRUD operations on main entities | Bookings: Create, Read, Update, Delete; (Optional) Cars management in admin simulation |
| Search functionality | Fleet search by model/type + filters (price, seats, transmission) |
| Form validation (client + server) | **Client-side only**; strict validation rules and error messaging on booking/contact/auth/profile forms |
| Responsive design | Bootstrap grid + custom CSS; mobile-first layout |
| Navigation menu + Footer | Consistent navbar + footer on all pages |
| Contact form | Validated contact form + confirmation UI |

#### Bonus Features (Optional / If Time Permits)

| Bonus Feature | Frontend-Only Feasible Approach |
|---|---|
| Admin panel (+5) | Simulated admin pages for fleet CRUD using `localStorage` |
| File upload (+3) | Profile image upload preview (not stored server-side; may store base64 in `localStorage` with size limit) |
| Advanced search/filters (+3) | Multi-filter, sort by price, seats, and availability status |
| User roles & permissions (+4) | Simulated role selection; UI gating (not secure without backend) |
| API integration (+4) | (Optional) Map embed or public API (kept conceptual unless permitted) |

---

## 2) Information Architecture (3 Marks)

### 2.1 Website Structure / Sitemap

The sitemap below represents the planned website structure. All pages are interconnected through a consistent navigation bar and contextual call-to-action buttons.

```
DriveEasy (Website)
├── Home (index.html)
│   ├── Featured Fleet (links to Fleet)
│   └── CTA: "Book Now" (links to Fleet / Booking)
├── Fleet (fleet.html)
│   ├── Search + Filters
│   ├── Car Cards
│   └── Car Details (car-details.html?carId=...)
├── Car Details (car-details.html)
│   └── CTA: Start Booking (booking.html?carId=...)
├── Booking (booking.html)
│   ├── Validated booking form
│   └── Confirmation → Dashboard
├── Dashboard (dashboard.html)
│   ├── Booking list (Read)
│   ├── Edit booking (Update)
│   └── Cancel booking (Delete)
├── Profile (profile.html)
│   └── Update profile details (Update)
├── Authentication
│   ├── Register (register.html)
│   └── Login (login.html)
└── Contact (contact.html)
    └── Validated inquiry form
```

> Note: If the existing prototype already has fewer pages, the final deliverable will still include **at least 5** pages. This IA proposes **8 pages** to exceed the minimum and better satisfy the “auth + dashboard + profile” marking criteria within a frontend-only scope.

---

### 2.2 Page Hierarchy and Purpose

| Level | Page | Purpose | Primary User Actions |
|---:|---|---|---|
| 0 | `index.html` | Brand introduction, trust-building, key CTAs | Navigate to fleet, view highlights |
| 1 | `fleet.html` | Browse/search/filter vehicles | Search, filter, open details, start booking |
| 2 | `car-details.html` | Present full car specs + pricing + policies | Compare specs, proceed to booking |
| 2 | `booking.html` | Capture booking inputs with validation | Create booking, calculate cost |
| 1 | `dashboard.html` | Central hub for booking management | View bookings, edit/cancel bookings |
| 1 | `profile.html` | Manage user details | Update profile data |
| 1 | `login.html` / `register.html` | Entry to “session” (simulated) | Register, login, logout |
| 1 | `contact.html` | Support inquiries | Submit message |

---

### 2.3 Navigation Flow Diagram

The following diagram models the user journey from discovery to booking and management:

```
        ┌──────────────┐
        │   HOME       │
        │ index.html   │
        └──────┬───────┘
               │
               v
        ┌──────────────┐
        │   FLEET      │<───────────────┐
        │ fleet.html   │                │
        └──────┬───────┘                │
               │                        │
       view details                     │ book another
               v                        │
     ┌──────────────────┐              │
     │  CAR DETAILS      │              │
     │ car-details.html  │              │
     └─────────┬────────┘              │
               │                        │
               v                        │
        ┌──────────────┐                │
        │  BOOKING     │                │
        │ booking.html │                │
        └──────┬───────┘                │
               │ confirm                │
               v                        │
        ┌──────────────┐                │
        │ DASHBOARD    │────────────────┘
        │ dashboard.html
        └──────┬───────┘
               │
               v
        ┌──────────────┐
        │  PROFILE     │
        │ profile.html │
        └──────────────┘
```

Authentication is linked globally:

```
Register → Login → (Home/Fleet/Booking) → Dashboard
```

---

### 2.4 Content Organization Plan

| Page | Main Sections | Content Type | Rationale |
|---|---|---|---|
| Home | Hero, Benefits, Featured cars, Testimonials, FAQs | Cards, CTA buttons, accordions | Improves trust + conversion |
| Fleet | Search bar, filters sidebar, car grid | Dynamic cards, filter controls | Fast comparison shopping |
| Car Details | Gallery, specs, pricing rules, policies, CTA | Tabs, badges, list groups | Reduces booking uncertainty |
| Booking | Customer info, dates, pickup/return, price summary | Validated form + computed output | Prevents errors and shows cost |
| Dashboard | Booking table, edit modal, cancel action | Table, modals | Manages lifecycle after booking |
| Profile | Personal details, preferences | Validated form | Personalization + data quality |
| Auth | Register/Login forms | Validated form | Simulates account workflow |
| Contact | Contact info + inquiry form | Validated form | Support and credibility |

---

## 3) Wireframes & UI Design (6 Marks)

### 3.1 Low-Fidelity Wireframes (All Pages)

The following are low-fidelity (structure-first) wireframes represented in ASCII. They capture layout blocks and component placement without final styling.

#### (A) Home — `index.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR: Logo | Home | Fleet | Dashboard | Profile | Contact   │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ HERO: Headline + subtext + CTA button ("View Fleet")          │
│ [Background image]                                            │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ BENEFITS (3 cards): Fast Booking | Insurance | Best Prices     │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FEATURED FLEET (car cards carousel/grid)                      │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FAQ (accordion) + Testimonials                                │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER: links | socials | policy | copyright                  │
└──────────────────────────────────────────────────────────────┘
```

#### (B) Fleet — `fleet.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Page Title: "Our Fleet"                                      │
│ Search Bar: [ Search model/type... ] [Search]                │
└──────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────┐
│ FILTERS        │ CAR GRID (dynamic cards)                     │
│ - Type         │ [Card][Card][Card][Card]                     │
│ - Seats        │ [Card][Card][Card][Card]                     │
│ - Transmission │                                              │
│ - Price range  │                                              │
└───────────────┴──────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (C) Car Details — `car-details.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Breadcrumbs: Home > Fleet > Car Name                          │
│ [Car Image]     Car Name, price/day, badges (type, seats...)  │
│                 CTA: [Book Now]                               │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Tabs: Overview | Specs | Policies                             │
│ - content area                                                │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Recommended cars (mini cards)                                 │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (D) Booking — `booking.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌───────────────────────────────┬──────────────────────────────┐
│ BOOKING FORM                  │ PRICE SUMMARY (sticky card)   │
│ - Full name                   │ - Car: selected              │
│ - Email + phone               │ - Days: computed             │
│ - Car dropdown (pre-filled)   │ - Price/day + total          │
│ - Pickup location             │ - Taxes/fees (optional)      │
│ - Start date + end date       │                              │
│ - Agreement checkbox          │ CTA: [Confirm Booking]        │
└───────────────────────────────┴──────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (E) Dashboard — `dashboard.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Title: "My Bookings" + Search bookings (optional)             │
│ Table: Car | Start | End | Total | Status | Actions           │
│ Actions: [Edit] [Cancel/Delete]                               │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (F) Profile — `profile.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Profile Card (avatar placeholder)                             │
│ Form: name, email, phone, license #, preferences              │
│ CTA: [Save Changes]                                           │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (G) Login / Register — `login.html`, `register.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ Auth Card                                                    │
│ - Email                                                      │
│ - Password                                                   │
│ - Confirm password (register only)                            │
│ - Terms checkbox (register)                                   │
│ CTA: [Login]/[Create Account]                                 │
└──────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

#### (H) Contact — `contact.html`

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
└──────────────────────────────────────────────────────────────┘
┌───────────────────────────────┬──────────────────────────────┐
│ Contact Info                   │ Contact Form                 │
│ - address, phone, email        │ - name, email, subject       │
│ - business hours               │ - message (textarea)         │
│ - map placeholder              │ CTA: [Send Message]          │
└───────────────────────────────┴──────────────────────────────┘
┌──────────────────────────────────────────────────────────────┐
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

---

### 3.2 High-Fidelity Mockups (Main Pages) — Description

Because the submission is text-based, the high-fidelity mockups are documented as a **design specification** (visual style + layout rules) to guide consistent implementation.

#### High-Fidelity Design Spec (Home + Fleet + Booking)

- **Home (Hero)**:
  - Full-width hero with dark overlay + headline and primary CTA.
  - CTA button uses primary brand color; secondary CTA as outline.
  - Trust row beneath hero: “No hidden fees”, “24/7 support”, “Insurance options”.

- **Fleet**:
  - Search bar pinned to top of content area on desktop.
  - Filter panel left (desktop) / collapsible off-canvas (mobile).
  - Car cards: image, model, badges, price/day, “View details” and “Book now”.
  - Hover elevation and subtle transitions for modern feel.

- **Booking**:
  - Two-column layout on desktop: form left, summary right (sticky).
  - Summary recalculates as dates/car selection changes.
  - Inline validation messages (Bootstrap `.is-invalid` and `.invalid-feedback`).

---

### 3.3 Color Scheme and Typography Selection

#### Color Palette (Accessible + Modern)

| Token | Hex | Usage |
|---|---|---|
| Primary | `#0D6EFD` | Buttons, links, highlights (Bootstrap primary) |
| Dark | `#212529` | Footer background, headings |
| Light | `#F8F9FA` | Page background |
| Success | `#198754` | Confirmed badges, success feedback |
| Danger | `#DC3545` | Errors, delete/cancel actions |
| Warning | `#FFC107` | Alerts, “pending” states |

#### Typography

- **Primary Font**: Poppins (Google Fonts) or system fallback  
- **Hierarchy**:
  - H1: 2.2–2.8rem responsive
  - H2: 1.6–2.0rem
  - Body: 1.0rem (16px)
  - Small: 0.875rem

---

### 3.4 UI/UX Principles Applied

- **Consistency & Standards**: consistent navbar/footer; consistent button styles and form layout across pages.  
- **Visibility of System Status**: booking confirmation messages; dashboard updates after CRUD actions.  
- **Error Prevention**: disabled submit until key checks pass; date rules enforce end date after start date.  
- **Recognition over Recall**: pre-filled booking car selection from fleet; visible summary card.  
- **Minimalist Design**: cards, whitespace, limited color palette.  
- **Accessibility**:
  - Semantic HTML structure (`nav`, `main`, `footer`)  
  - Form labels and accessible feedback  
  - Sufficient color contrast (primary/dark on light backgrounds)

---

### 3.5 Responsive Design Considerations

**Breakpoints** (Bootstrap conventions):
- **xs** < 576px: stacked layout, collapsible nav, off-canvas filters  
- **sm** ≥ 576px: improved spacing, card grid 1–2 columns  
- **md** ≥ 768px: 2–3 column card grid, booking form + summary become side-by-side  
- **lg** ≥ 992px: full layout with persistent filters panel, rich dashboard table  

**Responsive behaviors**:
- Car cards reflow from 1 column (mobile) → 4 columns (desktop).
- Dashboard table becomes horizontally scrollable using `.table-responsive`.
- Forms use full-width inputs, readable spacing, and tappable buttons.

---

## 4) Database Design (Conceptual — Documentation Only) (4 Marks)

> The following database design is **conceptual** and demonstrates how DriveEasy would be implemented with a relational DB in a full-stack version.  
> In this project’s implementation, persistence is simulated using **client-side storage**.

### 4.1 Entity-Relationship (ER) Diagram (ASCII)

Entities are designed to support typical rental processes: customers create bookings for cars at branches.

Legend: `PK` = Primary Key, `FK` = Foreign Key

```
┌───────────────────────┐        1        ┌───────────────────────┐
│        USER           │───────────────< │       BOOKING         │
├───────────────────────┤                ├───────────────────────┤
│ PK user_id            │                │ PK booking_id          │
│ full_name             │                │ FK user_id             │
│ email (unique)        │                │ FK car_id              │
│ phone                 │                │ FK branch_id           │
│ password_hash         │                │ start_date             │
│ role (customer/admin) │                │ end_date               │
│ created_at            │                │ total_amount           │
└───────────────────────┘                │ status                 │
                                         │ created_at             │
                                         └───────────┬───────────┘
                                                     │
                                                     │   >─────────────── 1
                                                     │
                                     ┌───────────────v───────────────┐
                                     │             CAR               │
                                     ├───────────────────────────────┤
                                     │ PK car_id                     │
                                     │ FK branch_id                  │
                                     │ model                         │
                                     │ category (SUV/Sedan/Van...)   │
                                     │ seats                         │
                                     │ transmission                  │
                                     │ price_per_day                 │
                                     │ availability_status           │
                                     └───────────────────────────────┘

┌───────────────────────┐        1        ┌───────────────────────┐
│       BRANCH          │───────────────< │         CAR           │
├───────────────────────┤                ├───────────────────────┤
│ PK branch_id          │                │ FK branch_id           │
│ branch_name           │                │ ...                    │
│ address               │                └───────────────────────┘
│ city                  │
│ phone                 │
└───────────────────────┘
```

**Relationships**:
- One user can have many bookings (1-to-many).
- One car can appear in many bookings over time (1-to-many).
- One branch can have many cars (1-to-many) and many bookings (1-to-many).

---

### 4.2 Database Schema (Tables, Fields, Data Types)

#### Table 1: `users`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| user_id | INT | PK, auto-increment | Identifier |
| full_name | VARCHAR(100) | NOT NULL | Customer name |
| email | VARCHAR(120) | NOT NULL, UNIQUE | Login identifier |
| phone | VARCHAR(20) | NULL | Optional |
| password_hash | VARCHAR(255) | NOT NULL | Hashed password (conceptual) |
| role | VARCHAR(20) | NOT NULL, DEFAULT 'customer' | customer/admin |
| created_at | DATETIME | NOT NULL | Audit timestamp |

#### Table 2: `branches`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| branch_id | INT | PK, auto-increment | Identifier |
| branch_name | VARCHAR(80) | NOT NULL | e.g., “City Centre Branch” |
| address | VARCHAR(200) | NOT NULL | Street address |
| city | VARCHAR(60) | NOT NULL | Location |
| phone | VARCHAR(20) | NULL | Contact |

#### Table 3: `cars`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| car_id | INT | PK, auto-increment | Identifier |
| branch_id | INT | FK → branches.branch_id | Car location |
| model | VARCHAR(80) | NOT NULL | e.g., “Toyota Camry” |
| category | VARCHAR(30) | NOT NULL | SUV/Sedan/Van/Sports |
| seats | INT | NOT NULL | Validation: \(2 \le seats \le 15\) |
| transmission | VARCHAR(20) | NOT NULL | Auto/Manual |
| price_per_day | DECIMAL(10,2) | NOT NULL | Validation: \(> 0\) |
| availability_status | VARCHAR(20) | NOT NULL | available/unavailable/maintenance |

#### Table 4 (Optional Extension): `bookings`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| booking_id | INT | PK, auto-increment | Identifier |
| user_id | INT | FK → users.user_id | Who booked |
| car_id | INT | FK → cars.car_id | Which car |
| branch_id | INT | FK → branches.branch_id | Pickup location |
| start_date | DATE | NOT NULL | Must be <= end_date |
| end_date | DATE | NOT NULL | Must be > start_date |
| total_amount | DECIMAL(10,2) | NOT NULL | Computed |
| status | VARCHAR(20) | NOT NULL | pending/confirmed/cancelled |
| created_at | DATETIME | NOT NULL | Audit timestamp |

> Minimum requirement “at least 3 related tables” is satisfied by: **users ↔ bookings ↔ cars** (+ branches).

---

### 4.3 Relationship Definitions

- **User → Booking**: one-to-many  
  - `users.user_id` → `bookings.user_id`
- **Car → Booking**: one-to-many  
  - `cars.car_id` → `bookings.car_id`
- **Branch → Car**: one-to-many  
  - `branches.branch_id` → `cars.branch_id`
- **Branch → Booking**: one-to-many  
  - `branches.branch_id` → `bookings.branch_id`

---

### 4.4 Data Validation Rules (Conceptual)

| Entity | Rule | Example |
|---|---|---|
| User | Email must be unique and valid format | `name@example.com` |
| User | Password complexity (min length, numbers) | 8+ chars, mixed types |
| Booking | `end_date` must be after `start_date` | 2026-03-01 → 2026-03-05 |
| Booking | `total_amount` must match computed days × price | prevents tampering |
| Car | `price_per_day` > 0 | 50.00 |
| Car | availability_status in allowed set | available/unavailable/maintenance |

In the frontend-only prototype, these rules are enforced via client-side validation and consistent computation.

---

### 4.5 Sample Data (Illustrative)

#### `branches` (sample)

| branch_id | branch_name | city | phone |
|---:|---|---|---|
| 1 | City Centre Branch | Cityville | +1 234 567 890 |
| 2 | Airport Branch | Cityville | +1 234 567 891 |

#### `cars` (sample)

| car_id | branch_id | model | category | seats | transmission | price_per_day | availability_status |
|---:|---:|---|---|---:|---|---:|---|
| 1 | 1 | Toyota Camry | Sedan | 5 | Auto | 50.00 | available |
| 2 | 1 | Honda CR-V | SUV | 5 | Auto | 75.00 | available |
| 3 | 2 | Ford Mustang | Sports | 2 | Manual | 120.00 | available |
| 4 | 2 | Toyota Hiace | Van | 12 | Auto | 90.00 | available |

#### `users` (sample)

| user_id | full_name | email | role |
|---:|---|---|---|
| 1 | Amina K. Student | amina@example.com | customer |
| 2 | DriveEasy Admin | admin@driveeasy.com | admin |

#### `bookings` (sample)

| booking_id | user_id | car_id | branch_id | start_date | end_date | total_amount | status |
|---:|---:|---:|---:|---|---|---:|---|
| 101 | 1 | 2 | 1 | 2026-03-01 | 2026-03-05 | 300.00 | confirmed |

---

## 5) Technical Specification (3 Marks)

### 5.1 Technology Stack Details

**Frontend**:
- **HTML5**: semantic structure (`nav`, `main`, `section`, `footer`)
- **CSS3**: custom styling, modern layout rules (Flexbox/Grid where needed)
- **Bootstrap 5.3**: responsive grid system, components (navbar, cards, tables, forms, modals)
- **JavaScript (ES6+)**: dynamic rendering, validation, date calculations, persistence simulation
- **jQuery 3.6**: DOM manipulation, event handling, simplified UI scripting

**Persistence (Prototype-only)**:
- Browser **`localStorage`** for simulated sessions and CRUD data storage

**Conceptual Backend (Documentation Only)**:
- Relational database design (ER diagram + schema) included; not implemented.

---

### 5.2 Development Tools and Environment

| Category | Tool |
|---|---|
| IDE | Cursor / VS Code |
| Browser Testing | Chrome / Edge + DevTools responsive mode |
| UI Framework | Bootstrap 5 (CDN) |
| JS Library | jQuery (CDN) |
| Version Control | Git + GitHub |
| Documentation | Markdown → PDF (Word/Google Docs acceptable) |

---

### 5.3 Architecture Approach (Frontend-Only, Organized Code)

To maintain code quality and separation of concerns:

- **Pages**: individual HTML files under `/src` (interconnected via navbar + links)
- **Styles**: `/src/css/style.css` (global theme + custom components)
- **Scripts**:
  - `/src/js/mock-data.js` (vehicle dataset; conceptual data source)
  - `/src/js/main.js` (rendering, form validation, CRUD simulation)

This structure approximates an MVC mindset:
- **Model (Simulated)**: localStorage + mock arrays
- **View**: HTML + Bootstrap components
- **Controller**: JS/jQuery event handlers and rendering functions

---

### 5.4 Project Timeline and Milestones

The plan below assumes a ~2-week implementation window (adjust dates as needed).

| Week/Day | Milestone | Output |
|---|---|---|
| Day 1–2 | Requirements + IA + wireframes | Planning document draft |
| Day 3–4 | UI system + base layout | Global navbar/footer, CSS theme |
| Day 5–6 | Fleet + details pages | Search/filter + details rendering |
| Day 7–8 | Booking + validation | Cost calculation + error handling |
| Day 9–10 | Dashboard CRUD | View/edit/delete bookings |
| Day 11 | Auth + profile | Register/login simulation + profile updates |
| Day 12 | Testing + polish | Responsive checks + bug fixes |
| Day 13–14 | Documentation finalization | Screenshots, README, submission packaging |

---

### 5.5 Resource Requirements

**Hardware**:
- Laptop/PC capable of running a modern browser and IDE (8GB RAM recommended)

**Software**:
- Windows 10/11
- Modern browser (Chrome/Edge)
- Cursor/VS Code

**External Resources (CDN)**:
- Bootstrap CSS/JS CDN
- jQuery CDN
- (Optional) Google Fonts CDN

---

### 5.6 GitHub Commit Planning (15–20 Meaningful Commits)

To satisfy the “commit history” marking criteria, the following commit plan is recommended. Each commit should be small, focused, and message-driven.

| # | Commit Message | Summary of Changes |
|---:|---|---|
| 1 | Initialize project structure | Create `/src`, `/docs`, base files |
| 2 | Add global navbar and footer | Shared layout across all pages |
| 3 | Create home page sections | Hero, benefits, featured fleet |
| 4 | Add site-wide CSS theme | Colors, typography, spacing |
| 5 | Add fleet page skeleton | Search UI + filter UI |
| 6 | Render fleet cards from data | Dynamic injection from dataset |
| 7 | Implement search and filters | Filter by type, price, seats |
| 8 | Add car details page | Details rendering by query param |
| 9 | Create booking page layout | Form + summary panel |
| 10 | Add booking validation rules | Date checks, required fields |
| 11 | Implement booking cost calculator | Days × price + formatted output |
| 12 | Save bookings to localStorage | Create booking persistence (C) |
| 13 | Build dashboard table rendering | Read bookings (R) |
| 14 | Add delete/cancel booking flow | Delete bookings (D) |
| 15 | Add edit booking modal | Update bookings (U) |
| 16 | Add login/register simulation | Auth forms + session-like state |
| 17 | Add profile management page | Profile CRUD simulation |
| 18 | Add contact form validation | Client-side validated inquiry |
| 19 | Accessibility and responsive fixes | Labels, aria, spacing, mobile nav |
| 20 | Final documentation and screenshots | README updates + docs images |

---

### Submission Notes (For PDF Integration)

To include this documentation in a PDF:
- Paste the content into Word/Google Docs.
- Keep diagrams in monospace font (e.g., Consolas) so ASCII alignment stays correct.
- Add your name/student ID at the top.

