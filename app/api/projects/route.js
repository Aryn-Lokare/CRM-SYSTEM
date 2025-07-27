import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects - Get all projects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');

    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;

    const projects = await prisma.project.findMany({
      where,
      include: {
        tasks: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request) {
  try {
    const body = await request.json();
    
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status || 'Planning',
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        progress: body.progress || 0,
        assignedTo: body.assignedTo,
      },
      include: {
        tasks: true,
      }
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}