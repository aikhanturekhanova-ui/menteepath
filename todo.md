# MenteePath TODO

## Core Infrastructure
- [x] Setup i18n (next-intl) with RU/EN support
- [x] Configure dark theme with Tailwind CSS and CSS variables
- [x] Create global layout and navigation structure
- [ ] Setup LLM integration (OpenAI/Claude)

## Database & Schema
- [x] Create profiles table (user info, education system, preferences)
- [x] Create universities table (metadata, requirements, rankings)
- [x] Create alumni_cases table (success stories, evidence)
- [x] Create chat_history table (conversation logs, token tracking)
- [x] Create roadmaps table (user roadmap steps and progress)
- [x] Create mentors table (mentor profiles and expertise)
- [x] Create mentor_requests table (connection requests)
- [ ] Run migrations and verify schema

## Landing Page
- [x] Design and build hero section with CTA
- [x] Build Bento Grid feature showcase
- [x] Implement RU/EN language switcher
- [x] Add "Data Transparency" section showing university data sources
- [x] Mobile-responsive layout
- [x] Add animations (framer-motion)

## Authentication & Routes
- [x] Implement Manus OAuth flow (already in template)
- [x] Create protected route wrapper
- [x] Build login/logout flows (via Manus OAuth)
- [x] Protect dashboard, chat, and roadmap routes
- [x] Add auth context and hooks (via template)

## Onboarding Flow
- [x] Design multi-step form UI
- [x] Implement step 1: Basic info (name, education system)
- [x] Implement step 2: Target universities (searchable input)
- [x] Implement step 3: Programs and goals (free-text input)
- [x] Implement step 4: Background and interests (tags/free-text)
- [x] Implement step 5: Review and submit
- [x] Save onboarding data to database (backend procedure)
- [x] Redirect to dashboard after completion
- [x] Wire Onboarding.tsx to trpc.onboarding.complete with validation

## AI Chat Assistant
- [x] Build chat UI with message history
- [x] Implement daily usage limit (10 messages/day) - server-side
- [x] Add usage tracking and persistence (backend)
- [x] Build conversation history display
- [x] Add markdown rendering for responses
- [x] Implement error handling and loading states
- [x] Connect Chat.tsx to backend procedures for loading history and sending messages
- [ ] Implement LLM integration with system prompt
- [ ] Add context enrichment (universities, alumni cases)

## Personal Roadmap Generator
- [x] Build roadmap generation endpoint (backend)
- [x] Build timeline/checklist UI (vertical Bento-style)
- [x] Display task name, deadline, success proof
- [x] Add progress tracking and completion toggles
- [x] Implement roadmap persistence (backend)
- [x] Connect Roadmap.tsx to backend procedures for get/generate/update
- [ ] Create AI prompt for roadmap generation
- [ ] Add edit/update roadmap functionality (frontend)

## MenteeConnect Marketplace
- [x] Create mentor profile display component
- [x] Build filtering UI (university, program, expertise)
- [x] Implement search functionality
- [x] Build mentor request/connect flow (backend)
- [x] Connect Mentors.tsx to backend procedures for list and sendRequest
- [ ] Add request status tracking (frontend)
- [ ] Create mentor profile detail page
- [ ] Add mentor rating/review system (optional)

## User Dashboard
- [x] Build dashboard layout with Bento Grid
- [x] Display roadmap progress widget
- [x] Display upcoming deadlines widget
- [x] Display recent chat sessions widget
- [x] Display recommended mentors widget
- [x] Add quick action buttons
- [ ] Implement dashboard data aggregation

## Internationalization (RU/EN)
- [x] Create translation files for all pages
- [x] Implement language switcher logic
- [ ] Add language persistence in user profile
- [x] Translate landing page content
- [x] Translate onboarding form
- [x] Translate chat interface
- [x] Translate roadmap UI
- [x] Translate mentor marketplace
- [x] Translate dashboard

## Testing & Polish
- [ ] Write vitest tests for core procedures
- [ ] Test authentication flow
- [ ] Test onboarding form validation
- [ ] Test chat usage limits
- [ ] Test roadmap generation
- [ ] Test i18n switching
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Remove placeholder content
- [ ] Add real university data samples

## Deployment & Final
- [ ] Create checkpoint
- [ ] Prepare for publishing
