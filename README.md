# GoRest Blog Application

A modern blog platform built with Next.js, TypeScript, and Ant Design, utilizing the GoRest public API for data management.

## 🚀 Features

- **User Authentication**: Welcome dialog for user registration with GoRest API token
- **Blog Post Management**: Complete CRUD operations for blog posts
- **Search & Pagination**: Efficient post filtering and pagination
- **Responsive Design**: Mobile-friendly interface with dark mode support
- **Real-time Updates**: Optimistic updates using React Query
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (Pages Router)
- **Language**: TypeScript
- **UI Components**: Ant Design & Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Authentication**: Cookie-based with GoRest token
- **Styling**: Tailwind CSS with dark mode support

## 📋 Prerequisites

- Node.js v16.20.2 or higher
- npm v8.19.4 or higher
- GoRest API Token (get it from [GoRest](https://gorest.co.in/))

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd gorest-blog-apps
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
└── 📁gorest-blog-apps
    └── 📁src
        └── 📁components      # Reusable UI components
        └── 📁config         # Configuration files
        └── 📁hooks          # Custom React hooks
        └── 📁pages          # Next.js pages
        └── 📁services       # API services
        └── 📁styles         # Global styles
        └── 📁types          # TypeScript type definitions
```

## 🔑 Key Features Implementation

### Authentication Flow

- Users must provide their name and GoRest API token on first access
- Credentials are stored in cookies for persistent sessions
- Automatic token validation through API calls

### Blog Post Management

- **List View**: Paginated display of all blog posts
- **Search**: Filter posts by title
- **Create**: Form to add new blog posts
- **Update**: Edit existing post content
- **Delete**: Remove posts with confirmation
- **Optimistic Updates**: Immediate UI updates with background sync

### User Interface

- Responsive design for all screen sizes
- Dark mode support with system preference detection
- Loading states and error handling
- Clean and intuitive layout

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build production application
- `npm run start`: Start production server
- `npm run lint`: Run ESLint for code quality
- `npm run format`: Format code with Prettier
- `npm run test`: Run Playwright tests

## 🧪 Testing

1. Authentication Tests (tests/auth/welcome.spec.ts)

- Welcome dialog display
- User registration process
- Token validation

2. Feature Tests (tests/features/)

- Pagination functionality
- Search functionality
- Theme toggling (light/dark mode)

3. Post Management Tests (tests/posts/)

- Post creation
- Post editing
- Post deletion
- Post listing

## 🌐 API Integration

The application uses the GoRest public API v2:

- Base URL: `https://gorest.co.in/public/v2`
- Authentication: Bearer token
- Endpoints:
  - GET `/posts`: Fetch posts with pagination
  - POST `/posts`: Create new post
  - PUT `/posts/:id`: Update existing post
  - DELETE `/posts/:id`: Remove post

## 🎨 Styling Guidelines

- Consistent use of Tailwind CSS utilities
- Dark mode compatibility
- Ant Design component customization
- Responsive breakpoints

## 🙏 Acknowledgments

- [GoRest](https://gorest.co.in/) for providing the public API
- [Ant Design](https://ant.design/) for the UI components
- [TanStack Query](https://tanstack.com/query) for data management
- [Tailwind CSS](https://tailwindcss.com/) for styling
