# Last CRM - Complete Customer Relationship Management System

A comprehensive CRM system built with Next.js, featuring lead management, contact tracking, deal pipeline, email integration, project management, and advanced analytics.

## 🚀 Features

### Core CRM Features

- **Lead Management**: Capture, track, and manage leads with detailed forms and status tracking
- **Contact Management**: Complete contact database with company information and relationship tracking
- **Account Management**: Company/account profiles with contact associations and deal history
- **Deal Pipeline**: Visual deal tracking with customizable stages and probability tracking
- **Email Integration**: Email composition, sending, and receiving with contact integration
- **Task Management**: Task creation, assignment, and tracking with priority levels
- **Project Management**: Kanban board view for project management with task tracking

### Analytics & Reporting

- **Dashboard**: Real-time metrics and performance indicators
- **Sales Analytics**: Revenue tracking, conversion rates, and pipeline analysis
- **Performance Charts**: Interactive charts for sales trends, lead sources, and deal stages
- **Custom Reports**: Exportable reports with filtering and date range selection

### User Experience

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Live data updates and notifications
- **Search & Filter**: Advanced search and filtering capabilities
- **Mobile Responsive**: Optimized for desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- PostgreSQL database

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd last-attempt
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# App Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Using Supabase

1. Create a new project in Supabase
2. Get your project URL and API keys
3. Update the environment variables
4. Run database migrations:

```bash
npx prisma db push
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database
3. Update the DATABASE_URL in `.env.local`
4. Run migrations:

```bash
npx prisma db push
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

The application uses the following main entities:

### Leads

- Personal information (name, email, phone)
- Company details
- Source tracking
- Status and priority management
- Assignment and notes

### Contacts

- Complete contact information
- Address and location data
- Company associations
- Deal relationships

### Accounts

- Company profiles
- Industry classification
- Contact associations
- Deal history

### Deals

- Deal information and amounts
- Stage tracking
- Probability assessment
- Contact and account associations

### Emails

- Email composition and sending
- Contact integration
- Status tracking
- Template management

### Tasks

- Task creation and assignment
- Priority and status management
- Due date tracking
- Deal associations

### Projects

- Project management
- Task tracking
- Progress monitoring
- Team assignments

## 🎯 Key Features Explained

### Lead Capture Form

- Comprehensive lead information collection
- Source tracking and assignment
- Priority and status management
- Notes and follow-up tracking

### Contact/Account Management

- Complete contact profiles
- Company information tracking
- Relationship mapping
- Deal history association

### Deal Pipeline

- Visual stage-based tracking
- Probability and value management
- Contact and account associations
- Progress monitoring

### Email Integration

- Email composition interface
- Contact integration
- Template management
- Send/receive simulation

### Dashboard Analytics

- Real-time performance metrics
- Sales trend analysis
- Lead source breakdown
- Conversion funnel tracking

### Project Management

- Kanban board view
- Task assignment and tracking
- Progress monitoring
- Team collaboration

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable Row Level Security (RLS)
3. Configure authentication providers
4. Set up storage buckets (if needed)

### Prisma Configuration

The Prisma schema is located in `prisma/schema.prisma` and includes:

- All entity relationships
- Proper indexing
- Data validation
- Migration scripts

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public API key
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations
- `DATABASE_URL`: PostgreSQL connection string

## 📱 Usage

### Navigation

- **Dashboard**: Overview of key metrics and recent activity
- **Leads**: Manage lead pipeline and capture new leads
- **Contacts**: Complete contact database management
- **Accounts**: Company and account profiles
- **Deals**: Sales pipeline and deal tracking
- **Emails**: Email composition and management
- **Tasks**: Task assignment and tracking
- **Projects**: Project management with Kanban view
- **Reports**: Analytics and performance insights
- **Settings**: User preferences and system configuration

### Key Workflows

1. **Lead Management**: Capture → Qualify → Convert
2. **Deal Pipeline**: Prospecting → Qualification → Proposal → Negotiation → Closed
3. **Contact Management**: Create → Associate → Track → Follow-up
4. **Project Management**: Plan → Execute → Monitor → Complete

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- Row Level Security (RLS) enabled in Supabase
- Environment variable protection
- Input validation and sanitization
- Secure authentication flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

To update the application:

1. Pull the latest changes
2. Update dependencies: `npm install`
3. Run database migrations: `npx prisma db push`
4. Restart the development server

---

**Last CRM** - Your complete customer relationship management solution.
