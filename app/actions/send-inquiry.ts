"use server";

import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Validation schema                                                  */
/* ------------------------------------------------------------------ */
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type."),
  date: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/* ------------------------------------------------------------------ */
/*  Build luxury HTML email                                            */
/* ------------------------------------------------------------------ */
function buildEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  date?: string;
  message?: string;
}): string {
  const row = (label: string, value: string, isLink?: boolean) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0ece4;color:#888;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;width:140px;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0ece4;color:#2a2a2a;">
        ${isLink ? '<a href="mailto:' + value + '" style="color:#b8965a;text-decoration:none;">' + value + "</a>" : value}
      </td>
    </tr>`;

  let rows = row("Name", data.name);
  rows += row("Email", data.email, true);
  if (data.phone) rows += row("Phone", data.phone);
  rows += row("Event Type", data.eventType);
  if (data.date) rows += row("Preferred Date", data.date);
  if (data.message) {
    rows += `
    <tr>
      <td style="padding:12px 0;color:#888;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;width:140px;vertical-align:top;">
        Vision
      </td>
      <td style="padding:12px 0;color:#2a2a2a;white-space:pre-line;">
        ${data.message}
      </td>
    </tr>`;
  }

  return `
    <div style="font-family:Georgia,'Times New Roman',serif;max-width:600px;margin:0 auto;padding:40px 24px;color:#2a2a2a;">
      <div style="border-bottom:1px solid #d4af6a;padding-bottom:24px;margin-bottom:32px;">
        <h1 style="font-size:28px;font-weight:300;letter-spacing:0.08em;margin:0;color:#1a1a1a;">MYSTICAL BEACH</h1>
        <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#b8965a;margin:6px 0 0 0;">New Private Consultation Request</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.8;">${rows}</table>
      <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f0ece4;font-size:11px;color:#aaa;letter-spacing:0.1em;">
        This inquiry was submitted via mysticalbeach.com
      </div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/*  Server Action                                                      */
/* ------------------------------------------------------------------ */
export async function sendInquiry(
  formData: FormData,
): Promise<InquiryFormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    eventType: formData.get("eventType") as string,
    date: formData.get("date") as string,
    message: formData.get("message") as string,
  };

  /* ---------- Validate ---------- */
  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return {
      success: false,
      error: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const { name, email, phone, eventType, date, message } = parsed.data;

  /* ---------- Send via Resend REST API ---------- */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "Email service is not configured. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Mystical Beach <onboarding@resend.dev>",
        to: ["idresschigeur@gmail.com"],
        reply_to: email,
        subject: "New Inquiry from " + name + " - " + eventType,
        html: buildEmailHtml({ name, email, phone, eventType, date, message }),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error:
          "We could not send your inquiry at this time. Please try again or contact us directly.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error:
        "We could not send your inquiry at this time. Please try again or contact us directly.",
    };
  }
}
