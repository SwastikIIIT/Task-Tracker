# Task Tracker Pro 📋⏱️

A modern, full-stack task management and time tracking application built with Next.js, featuring real-time timer functionality, AI-powered task suggestions, user authentication, and comprehensive task management.

## ✅ Live Demo

🔗 **[Live Application](https://task-tracker-three-self.vercel.app)**

*Create your own account to get started - no demo credentials needed!*

## 🚀 Features

- **User Authentication** - JWT-based secure login/signup
- **Task Management** - Create, edit, delete, and organize tasks
- **Time Tracking** - Start/stop timers for tasks with duration tracking
- **AI Task Suggestions** - Get intelligent task recommendations powered by Google Gemini
- **Status Management** - Track task progress (Pending, In Progress, Completed)
- **Daily Summary** - View time tracked and task completion statistics
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Real-time Updates** - Instant UI updates with Zustand state management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Zustand** - Lightweight state management
- **Tailwind CSS ** - Utility-first CSS framework
- **JavaScript** - Main programming language

### Backend
- **Next.js API Routes** - Serverless backend functions
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - AI-powered task suggestions

### Deployment
- **Vercel** - Frontend and API deployment
- **MongoDB Atlas** - Cloud database

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- MongoDB Atlas account (or local MongoDB)
- Google AI Studio API key

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwastikIIIT/Task-Tracker.git
   cd Task-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB Connection
   MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/tasktracker"
   
   # JWT Secret (generate a strong random string)
   JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-complex"
   
   # Google Gemini AI API Key
   GEMINI_API_KEY="your-google-ai-studio-api-key"
   ```

4. **Database Setup**
   - Create a MongoDB Atlas cluster or set up local MongoDB
   - Update the `MONGO_URI` with your connection string
   - The application will automatically create collections on first run

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Task-Tracker/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   │   ├── login/route.js
│   │   │   └── signup/route.js
│   │   ├── tasks/         # Task CRUD operations
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── time-logs/     # Time tracking endpoints
│   │   │   ├── route.js
│   │   │   └── [id]/route.js
│   │   ├── summary/route.js # Dashboard data
│   │   └── ai-suggest/route.js # AI task suggestions
│   ├── components/        # React components (JSX)
│   │   ├── AuthForm.jsx   # Login/signup forms
│   │   ├── Navbar.jsx     # Navigation header
│   │   ├── TaskForm.jsx   # Task creation form
│   │   ├── TaskList.jsx   # Task listing
│   │   ├── TaskItem.jsx   # Individual task component
│   │   ├── ActiveTimer.jsx # Active timer display
│   │   └── DailySummary.jsx # Dashboard summary
│   ├── stores/            # Zustand state stores
│   │   ├── authStore.js   # Authentication state
│   │   └── taskStore.js   # Task management state
│   ├── lib/               # Utility functions
│   │   ├── actions.js     # API calling functions
│   │   ├── utils.js       # Helper utilities
│   │   ├── middleware.js  # JWT middleware
│   │   ├── auth.js        # Authentication helpers
│   │   └── connect.js     # MongoDB connection
│   ├── models/            # MongoDB/Mongoose models
│   │   ├── User.js        # User schema
│   │   ├── Task.js        # Task schema
│   │   └── Time-Log.js    # Time log schema
│   └── page.jsx           # Main application page
├── public/                # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔐 Authentication

The application uses JWT-based authentication with the following features:
- ✅ **Secure Registration** - Email validation and password hashing with bcryptjs
- ✅ **Login/Logout** - Persistent sessions with token storage
- ✅ **Protected Routes** - API endpoints secured with JWT middleware
- ✅ **Auto-login** - Remember user sessions across browser refreshes

## 🤖 AI Features

- **Smart Task Suggestions** - Get AI-powered task recommendations using Google Gemini
- **Context-aware Suggestions** - AI considers your existing tasks and work patterns
- **Productivity Enhancement** - Intelligent suggestions to improve task organization

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Time Tracking
- `GET /api/time-logs` - Get time logs
- `POST /api/time-logs` - Start timer
- `PUT /api/time-logs/[id]/stop` - Stop timer

### Dashboard & AI
- `GET /api/summary` - Get daily summary statistics
- `POST /api/ai-suggest` - Get AI task suggestions

## 🎨 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Task+Dashboard+Screenshot)

### Task Management with AI Text Suggestions
![Task Management](https://via.placeholder.com/800x400/3b82f6/ffffff?text=AI+Text+Suggestions+Screenshot)

### Mobile Responsive
![Mobile View](https://via.placeholder.com/400x600/10b981/ffffff?text=Mobile+View+Screenshot)

## 🚀 Deployment

### Deploy to Vercel

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel

2. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_production_jwt_secret
   GEMINI_API_KEY=your_google_ai_studio_api_key
   ```

3. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Database Setup (Production)
- Set up MongoDB Atlas cluster
- Whitelist Vercel's IP addresses in Atlas
- Update `MONGO_URI` with production connection string

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📈 Performance Features

- **Server-side Rendering** - Fast initial page loads
- **API Route Optimization** - Efficient MongoDB queries with Mongoose
- **Client-side State Management** - Efficient state updates with Zustand
- **Code Splitting** - Smaller bundle sizes with Next.js
- **Database Indexing** - Optimized MongoDB queries

## 👨‍💻 Author

**Swastik Sharma**
- GitHub: [@SwastikIIIT](https://github.com/SwastikIIIT)
- Email: swastikiiit.05@gmail.com

---

⭐ **Star this repository if you found it helpful!**
