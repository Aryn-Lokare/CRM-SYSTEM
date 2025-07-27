import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Test database connection
export async function GET() {
  try {
    // Try to connect to database
    await prisma.$connect();
    
    // Try a simple query
    const leadCount = await prisma.lead.count();
    
    return NextResponse.json({ 
      message: 'Database connection successful!',
      leadCount: leadCount,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}