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