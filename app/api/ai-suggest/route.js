import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json({ error: "Task input required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        Return only valid JSON with exactly 2 fields: "title" and "description".
        - Title: concise (max 6 words).
        - Description: short, actionable (max 15 words).
        - No extra text, no markdown, no code fences.

        Task: "${task}"
        `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

  
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    let suggestion = { title: task, description: "" };
    try {
      suggestion = JSON.parse(text);
    } catch (err) {
      console.error("Parse error, got raw:", text);
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Refine Task API error:", error);
    return NextResponse.json({ error: "Failed to refine task" }, { status: 500 });
  }
}
