import { NextResponse } from 'next/server';

// Simple test endpoint
export async function GET() {
  try {
    return NextResponse.json({ 
      message: 'API is working!', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json(
      { error: 'Test API failed' },
      { status: 500 }
    );
  }
}