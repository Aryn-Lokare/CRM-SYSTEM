import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/contacts - Get all contacts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const accountId = searchParams.get('accountId');
    const assignedTo = searchParams.get('assignedTo');

    const where = {};
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (accountId) where.accountId = accountId;
    if (assignedTo) where.assignedTo = assignedTo;

    const contacts = await prisma.contact.findMany({
      where,
      include: {
        account: true,
        deals: true,
        emails: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create a new contact
export async function POST(request) {
  try {
    const body = await request.json();
    
    const contact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        position: body.position,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        notes: body.notes,
        assignedTo: body.assignedTo,
        accountId: body.accountId,
        tags: body.tags || [],
      },
      include: {
        account: true,
        deals: true,
        emails: true,
      }
    });

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}