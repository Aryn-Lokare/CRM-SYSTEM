import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/accounts - Get all accounts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const assignedTo = searchParams.get('assignedTo');

    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
        { website: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (industry) where.industry = industry;
    if (assignedTo) where.assignedTo = assignedTo;

    const accounts = await prisma.account.findMany({
      where,
      include: {
        contacts: true,
        deals: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST /api/accounts - Create a new account
export async function POST(request) {
  try {
    const body = await request.json();
    
    const account = await prisma.account.create({
      data: {
        name: body.name,
        industry: body.industry,
        website: body.website,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        notes: body.notes,
        assignedTo: body.assignedTo,
      },
      include: {
        contacts: true,
        deals: true,
      }
    });

    return NextResponse.json({ account }, { status: 201 });
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}