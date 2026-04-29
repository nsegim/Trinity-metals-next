import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextResponse } from "next/server";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_DATA_CENTER,
});



export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "pending", // Use "pending" to send confirmation email
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    const detail = error?.response?.body;
    console.error("Mailchimp error:", JSON.stringify(detail, null, 2));

    if (detail?.title === "Member Exists") {
      return NextResponse.json({ error: "Already subscribed!" }, { status: 400 });
    }

    return NextResponse.json(
      { error: detail?.detail || "Subscription failed. Try again." },
      { status: 500 }
    );
  }
}