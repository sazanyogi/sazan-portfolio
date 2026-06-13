import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const rateLimitMap = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const safeName = escHtml(name);
    const safeEmail = escHtml(email);
    const safeMessage = escHtml(message);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "sazanyogi@gmail.com",
      replyTo: email,
      subject: `New message from ${safeName} — sazan.com.np`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0A0A0F; border-radius: 12px; overflow: hidden; border: 1px solid #1F2230;">
          <div style="background: linear-gradient(135deg, #00F5FF22, #7B61FF22); padding: 32px 32px 24px; border-bottom: 1px solid #1F2230;">
            <div style="font-size: 11px; letter-spacing: 0.15em; color: #00F5FF; margin-bottom: 8px;">PORTFOLIO CONTACT</div>
            <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">New Message</div>
          </div>
          <div style="padding: 28px 32px; border-bottom: 1px solid #1F2230;">
            <div style="margin-bottom: 20px;">
              <div style="font-size: 10px; letter-spacing: 0.12em; color: #A0A3B1; margin-bottom: 6px;">FROM</div>
              <div style="font-size: 16px; font-weight: 600; color: #FFFFFF;">${safeName}</div>
              <div style="font-size: 13px; color: #00F5FF;">${safeEmail}</div>
            </div>
            <div>
              <div style="font-size: 10px; letter-spacing: 0.12em; color: #A0A3B1; margin-bottom: 8px;">MESSAGE</div>
              <div style="font-size: 14px; color: #FFFFFF; line-height: 1.75; background: #11121A; padding: 16px; border-radius: 8px; border-left: 3px solid #00F5FF; white-space: pre-wrap;">${safeMessage}</div>
            </div>
          </div>
          <div style="padding: 20px 32px; text-align: center;">
            <a href="mailto:${safeEmail}" style="display: inline-block; font-size: 11px; letter-spacing: 0.08em; color: #0A0A0F; background: #00F5FF; padding: 8px 24px; border-radius: 20px; text-decoration: none; font-weight: 700; margin-bottom: 12px;">REPLY TO ${safeName.toUpperCase()}</a>
            <div style="font-size: 11px; color: #A0A3B1;">sazan.com.np</div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
