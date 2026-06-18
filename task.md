# Tasks

- `[x]` Step 1: Add DB Indexes to Schema and DB
  - `[x]` Update `src/lib/db/schema.ts` with index definitions
  - `[x]` Write index migration script `create-indexes.js`
  - `[x]` Execute index migration script on database
- `[x]` Step 2: Resolve N+1 Queries in `employees.functions.ts`
  - `[x]` Query reviews in bulk using `inArray`
  - `[x]` Calculate trust scores in memory
- `[x]` Step 3: Parallelize Dashboard Stats & Trend Queries in `dashboard.functions.ts`
  - `[x]` Parallelize `getDashboardStats` using `Promise.all`
  - `[x]` Parallelize `getHiringTrend` using `Promise.all`
- `[x]` Step 4: Make Seeding Non-blocking on Dashboard
  - `[x]` Remove seeding from `loader` in `app.dashboard.tsx`
  - `[x]` Implement asynchronous background seeding in `HrDashboard` React component
- `[x]` Step 5: Implement Prefetching for Verification Requests
  - `[x]` Add preloader to `/app/verification` in `app.verification.tsx`
- `[x]` Step 6: Verify and Build
  - `[x]` Run `npm run build`
