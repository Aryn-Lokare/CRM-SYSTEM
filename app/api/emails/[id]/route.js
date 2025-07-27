import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/emails/[id] - Get a specific email
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const email = await prisma.email.findUnique({
      where: { id },
      include: {
        contact: true,
      }
    });

    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ email });
  } catch (error) {
    console.error('Error fetching email:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email' },
      { status: 500 }
    );
  }
}

// PUT /api/emails/[id] - Update a specific email
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const email = await prisma.email.update({
      where: { id },
      data: {
        subject: body.subject,
        body: body.body,
        from: body.from,
        to: body.to || [],
        cc: body.cc || [],
        bcc: body.bcc || [],
        status: body.status,
        sentAt: body.sentAt ? new Date(body.sentAt) : null,
        assignedTo: body.assignedTo,
        contactId: body.contactId,
      },
      include: {
        contact: true,
      }
    });

    return NextResponse.json({ email });
  } catch (error) {
    console.error('Error updating email:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update email' },
      { status: 500 }
    );
  }
}

// DELETE /api/emails/[id] - Delete a specific email
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.email.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}