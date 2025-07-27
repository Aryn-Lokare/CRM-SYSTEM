import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/project-tasks/[id] - Get a specific project task
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const projectTask = await prisma.projectTask.findUnique({
      where: { id },
      include: {
        project: true,
      }
    });

    if (!projectTask) {
      return NextResponse.json(
        { error: 'Project task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ projectTask });
  } catch (error) {
    console.error('Error fetching project task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project task' },
      { status: 500 }
    );
  }
}

// PUT /api/project-tasks/[id] - Update a specific project task
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const projectTask = await prisma.projectTask.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
        assignedTo: body.assignedTo,
        projectId: body.projectId,
      },
      include: {
        project: true,
      }
    });

    return NextResponse.json({ projectTask });
  } catch (error) {
    console.error('Error updating project task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update project task' },
      { status: 500 }
    );
  }
}

// DELETE /api/project-tasks/[id] - Delete a specific project task
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.projectTask.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Project task deleted successfully' });
  } catch (error) {
    console.error('Error deleting project task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete project task' },
      { status: 500 }
    );
  }
}