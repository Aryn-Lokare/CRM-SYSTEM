import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/[id] - Get a specific project
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a specific project
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        status: body.status,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        progress: body.progress,
        assignedTo: body.assignedTo,
      },
      include: {
        tasks: true,
      }
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a specific project
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}