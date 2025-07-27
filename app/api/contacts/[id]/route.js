import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/contacts/[id] - Get a specific contact
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        account: true,
        deals: true,
        emails: true,
      }
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
}

// PUT /api/contacts/[id] - Update a specific contact
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const contact = await prisma.contact.update({
      where: { id },
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

    return NextResponse.json({ contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
}

// DELETE /api/contacts/[id] - Delete a specific contact
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.contact.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}