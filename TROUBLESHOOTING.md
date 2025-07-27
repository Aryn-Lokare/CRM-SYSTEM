# 🛠️ CRM Troubleshooting Guide

## ❌ Common Error: "SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error occurs when the API is returning an HTML error page instead of JSON. Here's how to fix it:

### 🔍 **Root Cause**
The API routes are failing and Next.js is returning the default 404/500 HTML error page instead of JSON.

### 💡 **Quick Fix**

1. **Check if .env file exists:**
```bash
ls -la | grep env
```

2. **If .env doesn't exist, create it:**
```bash
cp .env.example .env
```

3. **Configure your database URL in .env:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_database"
DIRECT_URL="postgresql://username:password@localhost:5432/crm_database"
```

4. **Run the database setup:**
```bash
npm run db:setup
```

5. **Start the development server:**
```bash
npm run dev
```

### 🔧 **Step-by-Step Debugging**

#### Step 1: Test API Routes
Visit these URLs in your browser to test if APIs are working:

- **Basic API Test:** `http://localhost:3000/api/test`
  - Should return: `{"message":"API is working!","timestamp":"..."}`

- **Database Test:** `http://localhost:3000/api/test-db`
  - Should return: `{"message":"Database connection successful!","leadCount":0,"timestamp":"..."}`

#### Step 2: Check Database Connection
If the database test fails, check:

1. **PostgreSQL is running:**
```bash
# On macOS with Homebrew
brew services start postgresql

# On Ubuntu/Debian
sudo systemctl start postgresql

# On Windows, start PostgreSQL service
```

2. **Database exists:**
```bash
# Connect to PostgreSQL
psql -U your_username -h localhost

# Create database if it doesn't exist
CREATE DATABASE crm_database;
```

3. **Credentials are correct in .env file**

#### Step 3: Generate Prisma Client
```bash
npx prisma generate
npx prisma db push
```

### 🚨 **Other Common Issues**

#### **Issue: "Environment variable not found: DATABASE_URL"**
**Solution:** Create `.env` file with proper DATABASE_URL

#### **Issue: "Can't reach database server"**
**Solution:** 
- Check if PostgreSQL is running
- Verify host, port, username, and password in DATABASE_URL
- Check firewall settings

#### **Issue: "Table 'Lead' doesn't exist"**
**Solution:** Run database migration
```bash
npx prisma db push
```

#### **Issue: "Module not found: Can't resolve '@/lib/prisma'"**
**Solution:** Make sure the prisma client is generated
```bash
npx prisma generate
```

### 📋 **Environment Setup Checklist**

- [ ] ✅ `.env` file exists and has DATABASE_URL
- [ ] ✅ PostgreSQL is installed and running
- [ ] ✅ Database exists (create with `CREATE DATABASE crm_database;`)
- [ ] ✅ Prisma client is generated (`npx prisma generate`)
- [ ] ✅ Database schema is pushed (`npx prisma db push`)
- [ ] ✅ Development server is running (`npm run dev`)

### 🔍 **Debug Mode**

To enable debug logging, add this to your `.env`:
```env
NODE_ENV=development
DEBUG=true
```

The API routes now include detailed console logging to help debug issues.

### 📞 **Getting Help**

1. **Check the browser console** for detailed error messages
2. **Check the terminal/server logs** for API errors
3. **Use the test endpoints** to isolate the issue
4. **Verify database connection** using Prisma Studio: `npm run db:studio`

### 🎯 **Quick Database Setup for Testing**

If you don't have PostgreSQL installed, you can use a cloud database:

1. **Supabase (Free):**
   - Go to https://supabase.com
   - Create a new project
   - Get the connection string from Settings > Database
   - Use it as your DATABASE_URL

2. **Neon (Free):**
   - Go to https://neon.tech
   - Create a new database
   - Copy the connection string
   - Use it as your DATABASE_URL

3. **Railway (Free tier):**
   - Go to https://railway.app
   - Create a PostgreSQL database
   - Copy the connection string
   - Use it as your DATABASE_URL

### ✅ **Verify Everything is Working**

After setup, verify these work:
1. Visit `http://localhost:3000/api/test` - Should return JSON
2. Visit `http://localhost:3000/api/test-db` - Should show database connection
3. Visit `http://localhost:3000/leads` - Should load the leads page
4. Try creating a new lead - Should save to database

---

**Still having issues?** The problem is likely in the database setup. Double-check your DATABASE_URL and make sure PostgreSQL is accessible.