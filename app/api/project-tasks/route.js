import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/project-tasks - Get all project tasks
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedTo = searchParams.get('assignedTo');
    const projectId = searchParams.get('projectId');

    const where = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    if (projectId) where.projectId = projectId;

    const projectTasks = await prisma.projectTask.findMany({
      where,
      include: {
        project: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ projectTasks });
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project tasks' },
      { status: 500 }
    );
  }
}

// POST /api/project-tasks - Create a new project task
export async function POST(request) {
  try {
    const body = await request.json();
    
    const projectTask = await prisma.projectTask.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status || 'To Do',
        priority: body.priority || 'Medium',
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
        assignedTo: body.assignedTo,
        projectId: body.projectId,
      },
      include: {
        project: true,
      }
    });

    return NextResponse.json({ projectTask }, { status: 201 });
  } catch (error) {
    console.error('Error creating project task:', error);
    return NextResponse.json(
      { error: 'Failed to create project task' },
      { status: 500 }
    );
  }
}