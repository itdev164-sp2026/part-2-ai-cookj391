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