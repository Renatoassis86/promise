import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: "Banco de dados ainda não configurado (falta Supabase da Promisse)." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const payload = {
      nome: String(body.nome || "").trim(),
      email: String(body.email || "").trim(),
      whatsapp: String(body.whatsapp || "").trim(),
      mensagem: String(body.mensagem || "").trim(),
      status: "novo",
    };

    const { data, error } = await supabaseAdmin.from("contatos_gerais").insert([payload]).select();

    if (error) {
      console.error("Supabase contato insert error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, contato: data[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
