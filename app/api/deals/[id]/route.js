import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/deals/[id] - Get a specific deal
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        contact: true,
        account: true,
        tasks: true,
      }
    });

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ deal });
  } catch (error) {
    console.error('Error fetching deal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deal' },
      { status: 500 }
    );
  }
}

// PUT /api/deals/[id] - Update a specific deal
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const deal = await prisma.deal.update({
      where: { id },
      data: {
        title: body.title,
        amount: body.amount,
        stage: body.stage,
        probability: body.probability,
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

    return NextResponse.json({ deal });
  } catch (error) {
    console.error('Error updating deal:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update deal' },
      { status: 500 }
    );
  }
}

// DELETE /api/deals/[id] - Delete a specific deal
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.deal.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error('Error deleting deal:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete deal' },
      { status: 500 }
    );
  }
}