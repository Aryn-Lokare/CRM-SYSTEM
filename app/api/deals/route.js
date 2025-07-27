// GET all deals, POST new deal
import prisma from '@/lib/prisma';

export async function GET() {
  const deals = await prisma.deal.findMany();
  return Response.json(deals);
}

export async function POST(req) {
  const data = await req.json();
  const deal = await prisma.deal.create({
    data: {
      title: data.title,
      value: parseFloat(data.value),
      stage: data.stage,
    },
  });
  return Response.json(deal);
}
