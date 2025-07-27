import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/accounts/[id] - Get a specific account
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        contacts: true,
        deals: true,
      }
    });

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error fetching account:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}

// PUT /api/accounts/[id] - Update a specific account
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const account = await prisma.account.update({
      where: { id },
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

    return NextResponse.json({ account });
  } catch (error) {
    console.error('Error updating account:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update account' },
      { status: 500 }
    );
  }
}

// DELETE /api/accounts/[id] - Delete a specific account
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.account.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}