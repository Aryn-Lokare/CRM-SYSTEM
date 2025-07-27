import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/tasks/[id] - Get a specific task
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        deal: true,
      }
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id] - Update a specific task
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        priority: body.priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
        assignedTo: body.assignedTo,
        dealId: body.dealId,
      },
      include: {
        deal: true,
      }
    });

    return NextResponse.json({ task });
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - Delete a specific task
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}