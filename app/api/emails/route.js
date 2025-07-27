import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/emails - Get all emails
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');
    const contactId = searchParams.get('contactId');

    const where = {};
    
    if (search) {
      where.OR = [
        { subject: { contains: search, mode: 'insensitive' } },
        { body: { contains: search, mode: 'insensitive' } },
        { from: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;
    if (contactId) where.contactId = contactId;

    const emails = await prisma.email.findMany({
      where,
      include: {
        contact: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

// POST /api/emails - Create a new email
export async function POST(request) {
  try {
    const body = await request.json();
    
    const email = await prisma.email.create({
      data: {
        subject: body.subject,
        body: body.body,
        from: body.from,
        to: body.to || [],
        cc: body.cc || [],
        bcc: body.bcc || [],
        status: body.status || 'Draft',
        sentAt: body.sentAt ? new Date(body.sentAt) : null,
        assignedTo: body.assignedTo,
        contactId: body.contactId,
      },
      include: {
        contact: true,
      }
    });

    return NextResponse.json({ email }, { status: 201 });
  } catch (error) {
    console.error('Error creating email:', error);
    return NextResponse.json(
      { error: 'Failed to create email' },
      { status: 500 }
    );
  }
}