// PATCH (update deal), DELETE
import prisma from '@/lib/prisma';

export async function PATCH(req, { params }) {
  const data = await req.json();
  const updated = await prisma.deal.update({
    where: { id: params.id },
    data: {
      title: data.title,
      value: parseFloat(data.value),
      stage: data.stage,
    },
  });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await prisma.deal.delete({
    where: { id: params.id },
  });
  return new Response(null, { status: 204 });
}
