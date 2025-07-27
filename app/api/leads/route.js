import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/leads - Get all leads
export async function GET(request) {
  try {
    console.log('GET /api/leads - Starting request');
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');

    console.log('Query parameters:', { search, status, priority, assignedTo });

    const where = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;

    console.log('Prisma query where clause:', where);

    // Test database connection first
    await prisma.$connect();
    console.log('Database connected successfully');

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${leads.length} leads`);

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch leads',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST /api/leads - Create a new lead
export async function POST(request) {
  try {
    const body = await request.json();
    
    const lead = await prisma.lead.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        position: body.position,
        source: body.source,
        status: body.status || 'New',
        notes: body.notes,
        assignedTo: body.assignedTo,
        priority: body.priority || 'Medium',
        tags: body.tags || [],
      }
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}