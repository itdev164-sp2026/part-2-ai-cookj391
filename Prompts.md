# Prompting Log - ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I Asked:**
Look at the existing src/app/page.tsx and src/app/layout.tsx in this project. 
Replace the current homepage content with a "Developer Profile" page for me. 
It should include: 
- My name: [Josiah Cook]
- A short bio: [I am currently a student in MATC's web and software development program. I have been taking classes part time since 2023, and am on track to graduate in December of this year.]
- A "Skills" section that displays at least 6 skills in a responsive Tailwind CSS grid (use cards with icons from lucide-react) [ Skill 1: C++, Skill 2: C# and Java, Skill 3: UI design using CSS and React Components, Skill 4: Database management, Skill 5: Web applications using JavaScript, Skill 6: System Architecture and Design]

Keep the existing Header component and layout structure intact. If you need to create new components, go ahead and create them in the src/components/ folder.

**What happened:**
The agent understood my prompt and began working immediately without asking any additional questions. It read the existing layout and page files to inspect their current content before modifying them. The agent created or modified the following files: 
skill-card.tsx (created)
page.tsx (modified)
After starting the server the homepage shows the skills I inputted with additional descriptions that I did not input, but they compliment the skills nicely. The agent completed the task without any errors. 

### Prompt 2
The Skill cards contain the correct information. Their descriptions should remain hidden until the cursor hovers over them. Please adjust the styling so when the cursor hovers, the card shifts upwards 3-4 pixels and the description drops down and becomes visible.

**What happened:**
The Agent successfully updated the SkillCard component to add hover animation and hide/show the description. 
I learned that the more specific you are when writing prompts, the closer the end result will be to your original vision. 

### Reflection
Overall I would rate this a positive experience. I see having the agent working directly in my repo as a double edged sword though. On the one hand, the agent has access to all of the current files and thus, would not need much more context. It can make additions easily and updates happen across the repo instead of file by file. But this means that caution should be used by the developer (me) to ensure that the agent does not make unwanted changes to the repo. Prompts should be specific, and all files should be read line by line before a PR is approved. 

## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

>Using the shadcn sidebar components that are now in my src/components/ui/ folder,
create a professional, collapsible dashboard layout. It should include:

1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
- Overview (use the Home icon from lucide-react)
- Projects (use the FOlderOpen icon)
- Settings (use the Settings icon)

2. A top navigation area with breadcrumbs showing the current page. 

3. A main content area that wraps the existing page content. 

4. Update src/app/layout.tsx to use the new SidebarProvider and sidbar layout. 

Important: Preserve the Developer Profile content from Activity 1 in src/app/page.tsx - it should appear in the main content are of the new layout. 
Keep the dark mode toggle working. 

**What happened:**

>The agent created a new dashboard shell around the current home content without breaking the theme toggle. It replaced the old header with a new sidebar-and-breadcrumb structure. Modified layout.tsx to wrap the app with SidebarProvider, AppSidebar, and DashboardShell. Added route pages for Projects and Setting so the sidebar links are real, while keeping the existing Developer Profile content in page.tsx. 
It looked to me like the agent created it's own Sidebar component. 

I prompted it with: 
>Please use the Shadcn Sidebar components. Not a custom div. 

The agent tightened the layout to match the shadcn sidebar pattern more closely. Put SidebarProvider, Sidebar, and SidebarInset in the app shell from the sidebar primitives instead of a generic wrapper. The app shell now uses the shadcn sidebar primitives directly. 

### Prompt 2

**What I asked:**

On server start I got a runtime error. 
'Tooltip must be used within TooltipProvider' 
src/components/ui/tooltip.txs (24:10) 

**What happened:**

The agent said the error was exactly what the stack said: SideMenuButton was rendering the tooltip without a surrounding provider. It wrapped the dashboard shell with TooltipProvider at the layout level so every sidebar tooltip has context. 

### Prompt 3 

**What I asked:**

>The sidebar does not close on mobile when clicking on any of the navigation items. Add an onClick handler to collapse the side bar when any of the items are clicked. The side bar does collapse when a user clicks 'outside' of the sidebar. Keep this functionality.

**What happened:**

>The agent patched the sidebar links to close the mobile sheet explicitly on item click, while leaving the existing outside-click dismissal untouched. The agent added the on click handler in app-sidebar.txs by using the sidebar context's setOpenMobile(false) only when isMobile is true, so desktop behavior is unchanged. 

### Reflection

>Did the Agent accidentally delete or overwrite any of your Activity 1 code?
No. The agent preserved all of my Activity-1 code. 
>What did you learn about giving the Agent context about existing code you want to preserve? 
I learned that it is better to air on the side of caution when it comes to preserving existing functionality. If there are components that have partial functionality, explicitly telling the agent to maintain that functionality when fixing other issues can help to guarantee the end result is correct. 

## Activity 3: Server-Side Data with Supabase

### Prompt 1 

**What I asked:**
>Using the Supabase clinet at src/lib/supabase.ts, create a new Server Component
at src/app/projects/page.tsx that:

1. Fetches allr ecords from the "projects" table in Supabase
2. Displays them in a profesiional layout using shadcn/ui Card components
(run `npx shadcn@latest add card` if needed)
3. Each card should show the project title, description, and a status badge.
4. The status badge should be color-coded:
- "active" = green
- "completed" = blue
- "archived" = gray

Use @workspace context to match the styling of our existing Dashboard. 
This must be a React server component (async function, no "use client").
Do NOT use useEffect or useState for data fetching. 

**What happened:**

>The agent began implementing an async server component at the projects route that reads from my existing Supabase client and renders a dashboard-matching card grid with color-coded status badges. 

The agent asked for permission to run:
 npx shadcn@latest add card.

 I gave permission and the agent completed the task. When inspecting the code I noticed an error in page.tsk and gave the agent a new prompt detailed below. 

 **What I asked:**

 > In page.tsk your export function has an error at line 29. "Cannot find namespace 'JSZ'"

 **What happened:**

 > The agent fixed the type error in the projects page by updating the return type so it doesn't rely on the global JSX namespace. It imported 'ReactElement' from React, and changed the function signature to Promise<ReactElement> from Promise<JSX.Element>. Validation check showed no errors in page.tsx.

 ### Reflection
 >Fetching data on the server feels 'snappier' than using a useEffect. I like the implications this has for fast page load times, and database updates pushing to the client without reloading the server. 

 > One quick note: I did not need to run the Breadcrumb fix. My page already updated the Breadcrumb to Projects on click. I must have fixed that in the previous session. 

 ## Activity 4: AI-Driven Forms & Validation

 ### Prompt 1

 **What I asked:**

 > Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project" with the following fields:

- title: string, minimum 3 characters, with a custom error message
"Title must be at least 3 characters"

- description: string, minimum 10 characters, with a custom error message
"Description must be at least 10 characters"

- status: enum with avlues "active", "completed", "archived" 

Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

> The agent created the schema correctly and exported both the schema and the inferred type. 

### Prompt 2

**What I asked:**

>Using the Zod schema from src/lib/schemas.ts, do the following:

1. Create a form component at src/components/project-form.tsx that: 
- Is a Client Component ("use client") because it uses react-hook-form hooks
- Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
- Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
- Uses shadcn/ui Input for title, Textarea for description, and Select for status
- Shows inline error messages under each field when validation fails
- Has a "Create Project" submit button
- Shows a sonner toast notification on successful submission

2. Create a Server Action at src/app/actions.ts that:
- Has "use server" at the top of the file
- Accepts the validated form data
- Validates it again with the Zod schema (server-side validation)
- Inserts the validated data into the Supabase "projects" table
- Returns a success or error response

3. Create a new page at src/app/projects/new/page.tsx that renders the project form within the dashboard layout. 

4. Add a "New Project" button to the existing projects page (src/app/projects/page.tsx) that links to /projects/new. 

use @workspace to match the existing project styling. 

**What happened:**

>The agent correctly created all the requested files. It connected the form submission to the Server action and it included the server-side Zod validation. 

### Prompt 3

**What I asked:**

>runtime error on src/app/projects/page.tsx

Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.

**What happened:**

>The agent identified the bug in it's code and correctly diagnosed the issue. It said that the "error occurred because <Link> was wrapping an <a> tag, which is invalid in Next.js 13+." Likely due to the AI being trained on older versions of libraries. The Projects page now renders correctly and displays the updated list of projects. 

### Reflection

>How does the Schema-First approach with Zod change the way you think about forms? 

>The schema-first approach centralizes the validation to one location and feels like a cleaner way to ensure garbage data is not stored in the database. It does this by attaching the requirements to the schema directly, and having Zod acting as a guard that validates the data against those requirements.  Previous courses have had me writing multiple if-then statements to check for correct data integrity. 

## Activity 5: Securing the App with Supabase Auth

### Promt 1

**What I asked:**

>Implement a complete email/password authentication flow for this Next.js 15
App Router project using @supabase/ssr. Here is what I need:

1. SUPABASE CLIENTS: Create server-side Supabase client utilities in
   src/lib/supabase/ that work correctly with Next.js cookies. I need
   separate clients for Server Components, Server Actions, and Middleware.

2. LOGIN PAGE: Create a page at src/app/(auth)/login/page.tsx with a
   shadcn/ui card-based login form. It should support both "Sign In"
   and "Sign Up" (toggle between them or use tabs). Handle the auth
   via Server Actions, not client-side fetch.

3. MIDDLEWARE: Create a middleware.ts file at src/middleware.ts (next to
   the app directory — Next.js looks for middleware as a sibling of app)
   that:
   - Refreshes the user's auth session on every request
   - Protects the /projects routes — redirect unauthenticated users to /login
   - Allows unauthenticated access to /login
   - Uses supabase.auth.getUser() (NOT getSession()) for verification

4. SIGN OUT: Add a "Sign Out" button to the existing sidebar component
   (src/components/app-sidebar.tsx) that calls a Server Action to sign
   the user out and redirect to /login. The button must only render
   when an authenticated user is present — pass the user as a prop from
   the root layout (which will need to fetch it via the server Supabase
   client) and gate the Sign Out UI on that prop.

5. UPDATE DATA QUERIES: Modify the projects page and the create-project
   Server Action to use the authenticated Supabase client so that RLS
   policies filter data per user.

Use @workspace to understand the existing project structure. Do not remove
or break existing functionality — integrate auth around it.

**What happened:**

>The agent successfully created 6 files: 
src/app/(auth)/login/page.tsx
src/app/(auth)/layout.tsx
src/components/auth-form.tsx
src/lib/supabase/middleware.ts
src/lib/supabase/server.ts
src/middleware.ts

The agent modified 7 files:
src/app/projects/page.tsx
src/app/actions.ts
src/app/layout.tsx
src/components/app-sidebar.tsx
src/lib.schemas.ts
package-lock.json
package.json

The agent handled the middleware, login page, sign out, and data scoping all in one pass. No further prompts were needed. The application successfully handled multiple accounts creating separate projects via different browser windows. 

### Reflection
> The agent handled the creation of middleware.ts with zero additional prompts. I did manually add the files to the working set for context. I wasn't expecting package.json and the corresponding package-lock.json to need changes but given the command line requests the agent gave me during the build, that makes sense now. (I think I needed some additional packages installed.)

>Using a centralized middleware approach to checking login status feels more efficient. The auth logic gets written once, and is applied across the entire site. Any changes to the auth flow can also be implemented in one file vs. each individual component. I do feel like the individual auth checks could still be useful in specific situations where you would want to check for a 'type' of user, but for this case the centralized middleware makes a lot of sense and is more efficient. 


## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

>I have a Next.js app with Supabase Auth. Using @workspace context to
understand the app structure, write an End-to-End (E2E) test file at
tests/auth.spec.ts using Playwright.
The tests should verify:
1. LOGIN PAGE VISIBLE: Navigate to /login and confirm the login form
   is visible (check for email input, password input, and submit button).
2. REDIRECT AFTER LOGIN: After a successful login with valid credentials,
   the user is redirected to the dashboard or projects page.
3. SIDEBAR NAVIGATION: After login, verify that the sidebar navigation
   links are visible: "Overview", "Projects", and "Settings".
Requirements:
- Use role-based locators (getByRole, getByLabel, getByText) instead of
  CSS selectors or test IDs. This makes tests more accessible and resilient
  to UI changes.
- Add clear test descriptions that explain what each test verifies.
- Handle the async nature of navigation and page loads with proper
  Playwright waiting strategies.
- Read test credentials from process.env.TEST_USER_EMAIL and
  process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those
  variables are not set, the credentialed tests should skip with a clear
  message rather than fail.

  **What happened:**

  >The agent used role based locators.
  >The agent understood the auth flow from the context. 
  >The tests did not pass on the first run. 
> The first two tests passed but the third test failed. "Call log: 'Overview' sidebar link should be visible after login with timeout 5000ms." 
> I gave the error and its context to the agent, documented below. 

### Prompt 2

**What I asked:**
>This playwright test is failing with the following error: 

Error: "Overview" sidebar link should be visible after login

expect(locator).toBeVisible() failed

Locator: getByRole('link').filter({ hasText: 'Overview' })
Expected: visible
Error: strict mode violation: getByRole('link').filter({ hasText: 'Overview' }) resolved to 2 elements:
    1) <a href="/" data-active="true" data-size="default" data-state="closed" data-sidebar="menu-button" data-slot="sidebar-menu-button" class="peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar…>…</a> aka locator('ul').getByRole('link', { name: 'Overview' })
    2) <span role="link" aria-current="page" aria-disabled="true" data-slot="breadcrumb-page" class="font-normal text-foreground">Overview</span> aka getByLabel('breadcrumb').getByRole('link', { name: 'Overview' })

Call log:
  - "Overview" sidebar link should be visible after login with timeout 5000ms
  - waiting for getByRole('link').filter({ hasText: 'Overview' })

**What happened:**

>The agent successfully found the error. The problem was a strict mode violation. The locator was resolving to 2 elements:
   The sidebar <a href="/">,
   The breadcrumb <span role="link" aria-disabled="true">Overview</span>

The page snapshot confirmed that the breadcrumb component renders the current page as a role="link" aria-disabled="true" span, which Playwright's .filter({ hasText }) picks up alongside the sidebar link.

The fix was to apply disabled: false to all three locators for consistency: 
If the user ever tests this on a /projects or /settings page where those names would also appear as disabled breadcrumb items, the locators will hold.

### Reflection

>Having AI write and run tests raises my confidence significantly before hitting the deploy button. The agent caught errors I would 100% have missed. Its ability to see the entire project, check for consistency, missing or incorrect code, allows me to deploy a website more confidently knowing that the agent looked over every file and ran tests successfully first. 

>Manual tests in the browser are still useful but can get messy with lots of logs to the console and can be time consuming. 

### Course Reflection

>My prompting strategy has evolved significantly over the course of the semester. At the beginning, I would give short prompts that lacked detail and context which would result in cascading follow up prompts to correct the first one. I have learned that the more detailed instructions the better. Lots of small prompts may seem fine on a small project like this, but in the real world the projects will be large, and the context the agent will consume with each consecutive prompt will eat through an AI's usage quickly. I've learned to be extremely strategic with what and how I prompt the agent with. 

