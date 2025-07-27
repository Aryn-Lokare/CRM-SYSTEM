#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up CRM Database...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copying .env.example to .env...');
    try {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ Created .env file from .env.example');
      console.log('\n🔧 IMPORTANT: You need to configure your DATABASE_URL in .env before continuing!');
      console.log('📝 Example DATABASE_URL formats:');
      console.log('   PostgreSQL: postgresql://username:password@localhost:5432/crm_database');
      console.log('   Supabase:   postgresql://postgres:[password]@[host]:5432/postgres');
      console.log('\n💡 Quick cloud database options:');
      console.log('   - Supabase: https://supabase.com (free tier)');
      console.log('   - Neon:     https://neon.tech (free tier)');
      console.log('   - Railway:  https://railway.app (free tier)');
      console.log('\n🎯 Next steps:');
      console.log('   1. Edit .env file with your database URL');
      console.log('   2. Run this script again: npm run db:setup');
      process.exit(0);
    } catch (error) {
      console.error('❌ Failed to copy .env.example to .env:', error.message);
      console.log('📋 Please manually copy .env.example to .env and configure your database connection:');
      console.log('   cp .env.example .env');
    }
  }
  console.log('\n📝 Make sure to set your DATABASE_URL in the .env file');
  process.exit(1);
}

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('\n🗄️  Running database migrations...');
  execSync('npx prisma db push', { stdio: 'inherit' });

  console.log('\n✅ Database setup completed successfully!');
  console.log('\n🎯 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Open: http://localhost:3000');
  console.log('   3. Start managing your CRM data!');
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔍 Troubleshooting:');
  console.log('   1. Check your DATABASE_URL in .env');
  console.log('   2. Make sure your database server is running');
  console.log('   3. Verify database permissions');
  process.exit(1);
}