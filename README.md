# BLAQ

One front-end app for the BLAQ studio platform, with three sides behind a single login:

| Role         | Who               | Layout                      | Screens                                              |
| ------------ | ----------------- | --------------------------- | ---------------------------------------------------- |
| **Customer** | BLAQ customers    | Mobile-first, bottom tabs   | Discover (book a provider), Bookings, Profile        |
| **Partner**  | Service providers | Mobile-first, bottom tabs   | Schedule, Workspace (reserve a studio zone), Profile |
| **Admin**    | BLAQ staff        | Desktop, sidebar and tables | Dashboard, Providers, Customers, Bookings, Zones     |

It was merged from three separately built apps (Customer Dashboard, Creative Partner App, Admin
Dashboard) that already shared a design system and architecture.

## Run

```bash
npm install
npm run dev       # start the dev server
npm run build     # tsc --noEmit, then production build
npm run preview   # preview the production build
npm run lint      # ESLint
npm run format    # Prettier --write
```

On the login screen pick **Customer**, **Partner** or **Admin**, then **BYPASS (DEMO)** to jump
straight into a mock session. No backend is required.

## How the three sides fit together

- **One login, role-based routes.** `/customer/*`, `/partner/*` and `/admin/*` are each guarded
  by `ProtectedRoute`; a signed-in user who opens another role's URL is sent back to their own
  home screen.
- **One data store.** While `USE_MOCKS` is true (`src/api/config.ts`), every API module reads and
  writes the in-memory store in `src/api/mockDb.ts`, so the roles see each other's changes:
  - a booking a customer makes appears on that provider's schedule and in the admin tables;
  - a provider who hides themselves (or is hidden by an admin) disappears from the customer's
    provider list;
  - a status an admin sets on a booking shows on the customer's and provider's cards.
- The store lives in memory, so it and the session reset on page reload.

Demo accounts: customer Sarah Jenkins (`cust-1`), provider Amara Ncube (`prov-1`), admin Naledi
Mahlangu.

## Project structure

```
src/
  types/       Shared types: Booking, Provider, Customer, Zone, SessionUser, ...
  api/         One module per resource; mockDb.ts + fixtures/ behind USE_MOCKS
  hooks/       useBookings, useProviders, useSignIn, ... — the only way components touch the API
  context/     SessionContext (signed-in user and role), BookingContext (customer booking form),
               ZoneBookingContext (partner zone reservation form)
  components/  common/, icons/, pickers/, layout/ (AppShell + bottom tabs for customer and
               partner, AdminShell + sidebar for admin)
  screens/     login/, customer/, partner/, admin/
  routes/      Route table + ProtectedRoute
  styles/      tokens.css (design tokens), global.css
  utils/       date formatting, form validators
```

## Connecting a real backend

Set `USE_MOCKS` to `false`. Each function in `src/api/` already has the `fetch` call it will
make; the endpoints are:

| Call              | Endpoint                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Sign in           | `POST /api/auth/sign-in` → `SessionUser` (`{ role, profile }`)                                                                              |
| Bookings          | `GET /api/bookings` (scoped to the caller), `POST /api/bookings`, `PATCH /api/bookings/:id/status`                                          |
| Provider schedule | `GET /api/appointments`                                                                                                                     |
| Providers         | `GET /api/providers`, `GET /api/providers/:id/services`, `GET /api/providers/:id/availability?date=`, `PATCH /api/providers/:id/visibility` |
| Own visibility    | `PATCH /api/profile/visibility`                                                                                                             |
| Customers         | `GET /api/customers`                                                                                                                        |
| Zones             | `GET /api/zones`, `GET /api/zones/:id/availability?date=`, `POST /api/zone-reservations`                                                    |

The backend must decide the user's role from their account and scope each response to the
caller; the role switch on the login screen only chooses a demo account while mocks are on.

## Design system

Dark and gold, defined once in `src/styles/tokens.css` and used through `var(--token-name)`.
Playfair Display for the wordmark, names and card headlines; Roboto for everything else, both
self-hosted via `@fontsource`. Corners are square everywhere except the avatar and the
visibility toggle.
