import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const TO = "texprosoffice@gmail.com";

const SUBJECTS = {
  quote: "New Quote Request",
  emergency: "URGENT: Emergency Repair Request",
  portal: "New Portal Access Request",
};

function fmt(d, k) {
  const v = d?.[k];
  return v === undefined || v === null || v === "" ? "—" : String(v);
}

function buildBody(type, d) {
  const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
  const lines = [`Submitted: ${when}`, ""];

  if (type === "quote" || type === "emergency") {
    lines.push(`Name: ${fmt(d, "name")}`);
    lines.push(`Email: ${fmt(d, "email")}`);
    lines.push(`Phone: ${fmt(d, "phone")}`);
    lines.push(`Project Type: ${fmt(d, "project_type")}`);
    lines.push(`Service Requested: ${fmt(d, "service")}`);
    lines.push(`Project Details: ${fmt(d, "project_details")}`);
  } else if (type === "portal") {
    lines.push(`Name: ${fmt(d, "name")}`);
    lines.push(`Email: ${fmt(d, "email")}`);
    lines.push(`Phone: ${fmt(d, "phone")}`);
    lines.push(`Company: ${fmt(d, "company")}`);
    lines.push(`Reason for Access: ${fmt(d, "reason")}`);
  }

  return lines.join("\n");
}

export default async function(req) {
  try {
    let payload;
    try {
      payload = await req.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { type, data } = payload || {};
    if (!SUBJECTS[type]) {
      return Response.json({ error: "Unknown notification type" }, { status: 400 });
    }
    if (!data || typeof data !== "object") {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: TO,
      subject: SUBJECTS[type],
      body: buildBody(type, data),
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}