# CRM Database Setup and CRUD Operations

This document explains how to set up the database and use the CRUD operations that have been implemented for all CRM pages.

## 🗄️ Database Setup

### Prerequisites
- PostgreSQL database (local or cloud)
- Node.js and npm installed

### Environment Configuration

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Configure your database connection in `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_database"
DIRECT_URL="postgresql://username:password@localhost:5432/crm_database"
```

### Quick Setup

Run the setup script to automatically configure everything:
```bash
node scripts/setup-database.js
```

### Manual Setup

If you prefer to set up manually:

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Push database schema:
```bash
npx prisma db push
```

4. (Optional) Open Prisma Studio to view data:
```bash
npx prisma studio
```

## 📊 Database Models

The following models are available with full CRUD operations:

### 1. **Leads**
- `GET /api/leads` - Get all leads (with search/filter)
- `POST /api/leads` - Create new lead
- `GET /api/leads/[id]` - Get specific lead
- `PUT /api/leads/[id]` - Update lead
- `DELETE /api/leads/[id]` - Delete lead

### 2. **Contacts**
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/[id]` - Get specific contact
- `PUT /api/contacts/[id]` - Update contact
- `DELETE /api/contacts/[id]` - Delete contact

### 3. **Accounts**
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/[id]` - Get specific account
- `PUT /api/accounts/[id]` - Update account
- `DELETE /api/accounts/[id]` - Delete account

### 4. **Deals**
- `GET /api/deals` - Get all deals
- `POST /api/deals` - Create new deal
- `GET /api/deals/[id]` - Get specific deal
- `PUT /api/deals/[id]` - Update deal
- `DELETE /api/deals/[id]` - Delete deal

### 5. **Emails**
- `GET /api/emails` - Get all emails
- `POST /api/emails` - Create new email
- `GET /api/emails/[id]` - Get specific email
- `PUT /api/emails/[id]` - Update email
- `DELETE /api/emails/[id]` - Delete email

### 6. **Tasks**
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get specific task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### 7. **Projects**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### 8. **Project Tasks**
- `GET /api/project-tasks` - Get all project tasks
- `POST /api/project-tasks` - Create new project task
- `GET /api/project-tasks/[id]` - Get specific project task
- `PUT /api/project-tasks/[id]` - Update project task
- `DELETE /api/project-tasks/[id]` - Delete project task

## 🔧 API Features

### Search and Filtering
Most APIs support query parameters for filtering:

```javascript
// Search leads by name, email, or company
GET /api/leads?search=john

// Filter leads by status
GET /api/leads?status=New

// Filter leads by priority
GET /api/leads?priority=High

// Combine filters
GET /api/leads?search=tech&status=Qualified&priority=High
```

### Error Handling
All APIs include proper error handling:
- **200** - Success
- **201** - Created successfully
- **404** - Resource not found
- **500** - Server error

### Real-time Updates
The frontend automatically refetches data after:
- Creating new records
- Updating existing records
- Deleting records

## 🚀 Usage Examples

### Creating a Lead
```javascript
const newLead = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1-555-0123",
  company: "Example Corp",
  position: "CEO",
  source: "Website",
  status: "New",
  priority: "High",
  notes: "Interested in our premium package"
};

const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newLead)
});
```

### Updating a Deal
```javascript
const updatedDeal = {
  title: "Enterprise Software License",
  amount: 75000,
  stage: "Negotiation",
  probability: 85,
  closeDate: "2024-03-15",
  description: "Updated deal with new requirements"
};

const response = await fetch('/api/deals/deal-id', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedDeal)
});
```

## 🎯 Frontend Integration

### State Management
Each page uses React hooks for state management:
- `loading` - Shows loading states
- `error` - Displays error messages
- `data` - Stores the fetched data

### Form Handling
All forms include:
- Input validation
- Loading states during submission
- Error handling and display
- Success feedback

### Data Synchronization
- Search and filters trigger automatic API calls
- Forms reset after successful operations
- Tables update immediately after changes

## 🛠️ Development Tips

### Database Migrations
When you modify the Prisma schema:
```bash
npx prisma db push
npx prisma generate
```

### Reset Database
To reset all data (development only):
```bash
npx prisma db push --force-reset
```

### View Database
Open Prisma Studio to browse data:
```bash
npx prisma studio
```

## 🔒 Security Considerations

1. **Input Validation**: All API routes validate input data
2. **Error Handling**: Sensitive information is not exposed in errors
3. **Database Queries**: Use Prisma ORM to prevent SQL injection
4. **Environment Variables**: Keep sensitive data in `.env` file

## 📝 Next Steps

1. Add authentication and authorization
2. Implement role-based access control
3. Add data export/import functionality
4. Set up automated backups
5. Add audit logging for data changes

---

## 🆘 Troubleshooting

### Database Connection Issues
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify database credentials

### API Errors
- Check browser console for detailed errors
- Verify API endpoints are running
- Check network connectivity

### Data Not Updating
- Refresh the page
- Check if API calls are successful
- Verify database connection

For more help, check the Prisma documentation: https://www.prisma.io/docs/