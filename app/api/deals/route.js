import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/deals - Get all deals
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const stage = searchParams.get('stage');
    const assignedTo = searchParams.get('assignedTo');
    const contactId = searchParams.get('contactId');
    const accountId = searchParams.get('accountId');

    const where = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (stage) where.stage = stage;
    if (assignedTo) where.assignedTo = assignedTo;
    if (contactId) where.contactId = contactId;
    if (accountId) where.accountId = accountId;

    const deals = await prisma.deal.findMany({
      where,
      include: {
        contact: true,
        account: true,
        tasks: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ deals });
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}

// POST /api/deals - Create a new deal
export async function POST(request) {
  try {
    const body = await request.json();
    
    const deal = await prisma.deal.create({
      data: {
        title: body.title,
        amount: body.amount,
        stage: body.stage || 'Prospecting',
        probability: body.probability || 0,
        closeDate: body.closeDate ? new Date(body.closeDate) : null,
        description: body.description,
        assignedTo: body.assignedTo,
        contactId: body.contactId,
        accountId: body.accountId,
      },
      include: {
        contact: true,
        account: true,
        tasks: true,
      }
    });

    return NextResponse.json({ deal }, { status: 201 });
  } catch (error) {
    console.error('Error creating deal:', error);
    return NextResponse.json(
      { error: 'Failed to create deal' },
      { status: 500 }
    );
  }
}