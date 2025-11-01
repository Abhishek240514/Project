# TeamHub - Team Collaboration Platform

## Overview

TeamHub is a web-based platform for browsing talented members, filtering by skills and graduation year, and creating high-performing teams for projects or hackathons. The application enables users to discover collaborators through a searchable member directory and form teams based on specific event requirements and technical skill sets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing (alternative to React Router)
- **TanStack Query (React Query)** for server state management, caching, and data synchronization

**UI Component System**
- **Shadcn UI** components built on Radix UI primitives providing accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for managing component variants
- Design system follows guidelines inspired by modern SaaS platforms (Linear, Notion) with emphasis on information clarity and scannable card-based layouts

**State Management Strategy**
- Server state managed through TanStack Query with optimistic updates
- Local UI state handled via React hooks (useState, useReducer)
- No global state management library needed due to server-driven architecture

**Key Design Patterns**
- Component composition with reusable UI primitives
- Custom hooks for shared logic (useToast, useIsMobile)
- Form handling with React Hook Form and Zod validation
- Responsive design with mobile-first approach and collapsible sidebars

### Backend Architecture

**Server Framework**
- **Express.js** as the HTTP server with TypeScript
- RESTful API design with JSON request/response format
- Middleware-based request processing pipeline
- Request logging with response time tracking

**API Structure**
- `/api/members` - Member CRUD operations
- `/api/teams` - Team management and retrieval with member population
- Validation using Zod schemas derived from database models
- Error handling with appropriate HTTP status codes

**Data Layer**
- **Drizzle ORM** for type-safe database operations
- Schema-first approach with TypeScript inference
- Database migrations managed through Drizzle Kit
- In-memory storage fallback (`MemStorage`) for development/testing

**Development Features**
- Vite integration in middleware mode for seamless SSR and HMR
- Separate build process for client (Vite) and server (esbuild)
- Database seeding functionality for initial member data
- Development-only plugins for error overlay and debugging

### Data Storage Solutions

**Database**
- **PostgreSQL** (via Neon serverless driver) as the primary database
- Connection pooling through `@neondatabase/serverless`
- Environment-based configuration via `DATABASE_URL`

**Schema Design**
- **Members table**: Stores user profiles with skills, tech stack, graduation year, and avatar
- **Teams table**: Contains event details, required tech stack, team size, and member references
- Array fields for skills, tech stack, and member IDs
- UUID primary keys with automatic generation
- Timestamp tracking for creation dates

**Data Access Patterns**
- Repository pattern through `IStorage` interface
- Abstraction layer supporting both database and in-memory implementations
- Eager loading of team members when fetching team details
- Type-safe queries using Drizzle's query builder

### Authentication and Authorization

**Current Implementation**
- No authentication system implemented yet
- Session infrastructure present (`connect-pg-simple` for PostgreSQL session store)
- Express session middleware configured but not actively used

**Prepared for Future Implementation**
- Session storage ready for user authentication
- Cookie-based session management infrastructure in place
- API routes structured to accommodate authorization checks

## External Dependencies

### Third-Party Services

**Database Hosting**
- Neon (serverless PostgreSQL) for production database hosting
- Requires `DATABASE_URL` environment variable

**Development Tools**
- Replit-specific plugins for development experience (`@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`)

### Key Libraries

**UI Components**
- Radix UI primitives (20+ component libraries) for accessible components
- Embla Carousel for image/content carousels
- Lucide React for icon system
- date-fns for date formatting

**Data & Validation**
- Zod for runtime type validation and schema definition
- Drizzle-Zod for automatic schema generation from database models
- @tanstack/react-query for data fetching and caching

**Styling**
- Tailwind CSS with custom configuration
- PostCSS for CSS processing
- clsx and tailwind-merge for conditional class management

**Forms**
- React Hook Form for form state management
- @hookform/resolvers for Zod integration

### Build & Development Stack

- TypeScript for type safety across client and server
- esbuild for server bundling
- Vite for client bundling and development server
- tsx for running TypeScript in Node.js during development