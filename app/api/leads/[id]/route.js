import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/leads/[id] - Get a specific lead
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const lead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PUT /api/leads/[id] - Update a specific lead
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        position: body.position,
        source: body.source,
        status: body.status,
        notes: body.notes,
        assignedTo: body.assignedTo,
        priority: body.priority,
        tags: body.tags || [],
      }
    });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id] - Delete a specific lead
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.lead.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}