import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  fullName?: string;
  name?: string;
  companyName?: string;
  phone?: string;
  emailAddress?: string;
  email?: string;
  message?: string;
  website?: string;
};

type ContactApiResponse =
  | {
      ok: true;
      data: {
        id: string | null;
      };
    }
  | {
      ok: false;
      error: string;
      details?: string;
    };

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getContactConfig() {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail =
    process.env.RESEND_FROM_EMAIL ??
    "JW Luxury Estate <onboarding@resend.dev>";
  const contactToEmail = process.env.CONTACT_TO_EMAIL;

  return {
    resendApiKey,
    resendFromEmail,
    contactToEmail,
  };
}

export async function GET() {
  const { resendApiKey, resendFromEmail, contactToEmail } = getContactConfig();

  return NextResponse.json({
    ok: true,
    service: "contact",
    configured: {
      hasResendApiKey: Boolean(resendApiKey),
      hasResendFromEmail: Boolean(resendFromEmail),
      hasContactToEmail: Boolean(contactToEmail),
    },
  });
}

export async function POST(request: Request) {
  const { resendApiKey, resendFromEmail, contactToEmail } = getContactConfig();

  console.info("[contact] POST received");

  if (!resendApiKey) {
    console.error("[contact] Missing RESEND_API_KEY");

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "The email service is not configured.",
        details: "Missing RESEND_API_KEY",
      },
      { status: 500 },
    );
  }

  if (!resendFromEmail) {
    console.error("[contact] Missing RESEND_FROM_EMAIL");

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "The sender email is not configured.",
        details: "Missing RESEND_FROM_EMAIL",
      },
      { status: 500 },
    );
  }

  if (!contactToEmail) {
    console.error("[contact] Missing CONTACT_TO_EMAIL");

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "The recipient email is not configured.",
        details: "Missing CONTACT_TO_EMAIL",
      },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    console.error("[contact] Invalid JSON body", error);

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const fullName = normalizeValue(payload.fullName ?? payload.name);
  const companyName = normalizeValue(payload.companyName);
  const phone = normalizeValue(payload.phone);
  const emailAddress = normalizeValue(payload.emailAddress ?? payload.email);
  const message = normalizeValue(payload.message);
  const website = normalizeValue(payload.website);

  console.info("[contact] Payload received", {
    hasFullName: Boolean(fullName),
    hasCompanyName: Boolean(companyName),
    hasPhone: Boolean(phone),
    hasEmailAddress: Boolean(emailAddress),
    hasMessage: Boolean(message),
    hasWebsite: Boolean(website),
  });

  if (website) {
    console.warn("[contact] Honeypot field filled, skipping send");

    return NextResponse.json<ContactApiResponse>(
      {
        ok: true,
        data: {
          id: null,
        },
      },
      { status: 200 },
    );
  }

  if (!fullName || !emailAddress || !message) {
    console.error("[contact] Missing required fields");

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "Please complete the required fields.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(emailAddress)) {
    console.error("[contact] Invalid email address", { emailAddress });

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: resendFromEmail,
      to: [contactToEmail],
      replyTo: emailAddress,
      subject: `New JW Luxury Estate inquiry - ${fullName}`,
      text: [
        "New JW Luxury Estate inquiry",
        "",
        `Full name: ${fullName}`,
        `Company name: ${companyName || "Not provided"}`,
        `Phone: ${phone || "Not provided"}`,
        `Email address: ${emailAddress}`,
        "",
        "Inquiry details:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #181310;">
          <h2 style="margin: 0 0 16px; font-size: 24px;">New JW Luxury Estate Inquiry</h2>
          <p style="margin: 0 0 12px;"><strong>Full name:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin: 0 0 12px;"><strong>Company name:</strong> ${escapeHtml(companyName || "Not provided")}</p>
          <p style="margin: 0 0 12px;"><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p style="margin: 0 0 12px;"><strong>Email address:</strong> ${escapeHtml(emailAddress)}</p>
          <div style="margin-top: 20px;">
            <p style="margin: 0 0 8px;"><strong>Inquiry details:</strong></p>
            <p style="margin: 0; line-height: 1.7;">${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend send error", error);

      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          error: "Unable to send your inquiry right now.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    console.info("[contact] Inquiry sent successfully", {
      id: data?.id ?? null,
      to: contactToEmail,
    });

    return NextResponse.json<ContactApiResponse>(
      {
        ok: true,
        data: {
          id: data?.id ?? null,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact] Unexpected server error", error);

    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        error: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
