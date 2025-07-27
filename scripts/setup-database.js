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
    console.log('📋 Please copy .env.example to .env and configure your database connection:');
    console.log('   cp .env.example .env');
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