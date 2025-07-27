# 🚨 QUICK FIX: JSON Parse Error

**Error:** `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

## 🎯 **Immediate Solution**

The error occurs because the database isn't set up yet. Follow these steps:

### 1. **Create Environment File**
```bash
cp .env.example .env
```

### 2. **Configure Database** 
Edit the `.env` file and add a working database URL:

**Option A: Use a Free Cloud Database (Recommended)**
- Go to https://supabase.com
- Create a free project
- Get the PostgreSQL connection string from Settings > Database
- Paste it as your `DATABASE_URL` in `.env`

**Option B: Use Local PostgreSQL**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/crm_database"
```

### 3. **Run Database Setup**
```bash
npm run db:setup
```

### 4. **Start Development Server**
```bash
npm run dev
```

## ✅ **Verify the Fix**

1. Visit http://localhost:3000/api/test - Should return JSON
2. Visit http://localhost:3000/leads - Should load without errors
3. Try creating a lead - Should save successfully

---

**Still getting errors?** See `TROUBLESHOOTING.md` for detailed debugging steps.