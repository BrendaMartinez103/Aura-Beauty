
import { NextResponse } from "next/server";
import webpush from "web-push";
import { auth } from "@/lib/authOptions";
import { prisma } from "@/db/client";

webpush.setVapidDetails(
  'mailto:admin@aurabeauty.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { title, body } = await req.json();

  const clientes = await prisma.cliente.findMany({
    where: { pushSub: { not: null } },
    select: { pushSub: true }
  });

  for (const cliente of clientes) {
    try {
      await webpush.sendNotification(cliente.pushSub, JSON.stringify({ title, body }));
    } catch (error) {
      console.error("Error al enviar push a cliente:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
