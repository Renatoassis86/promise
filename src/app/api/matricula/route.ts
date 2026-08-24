import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  if (!supabaseServer) {
    return NextResponse.json(
      { success: false, error: "Banco de dados ainda não configurado (falta Supabase da Promisse)." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { tipo, ...rest } = body;

    if (!tipo || !["schools", "learners", "professionals"].includes(tipo)) {
      return NextResponse.json({ success: false, error: "Tipo de matrícula inválido." }, { status: 400 });
    }

    const payload = {
      tipo,
      nome: String(rest.nome || "").trim(),
      cargo: String(rest.cargo || "").trim(),
      empresa: String(rest.empresa || "").trim(),
      cidade: String(rest.cidade || "").trim(),
      email: String(rest.email || "").trim(),
      whatsapp: String(rest.whatsapp || "").trim(),
      modalidade: String(rest.modalidade || "").trim(),
      objetivo: String(rest.objetivo || "").trim(),
      certificacao: String(rest.certificacao || "").trim(),
      status: "novo",
    };

    const { data, error } = await supabaseServer.from("pre_matriculas").insert([payload]).select();

    if (error) {
      console.error("Supabase matricula insert error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, matricula: data[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
