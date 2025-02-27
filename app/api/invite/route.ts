import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const {
    emailText,
    subjectLine,
    sessionHost,
    potentialCollaborators,
    startsAt,
    primaryLang,
    framework,
    sessionLength,
    expMemberCount,
  } = await req.json();

  // handle error if any data is missing
  if (
    !emailText ||
    !subjectLine ||
    !sessionHost ||
    !potentialCollaborators ||
    !startsAt ||
    !primaryLang ||
    !framework ||
    !sessionLength ||
    !expMemberCount
  ) {
    console.log("Some details from client are missing!");
    return NextResponse.json(
      {
        message: "Some details from the client are missing",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    for (let eachPotentialCollaborator of potentialCollaborators) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: eachPotentialCollaborator,
        subject: subjectLine,
        text: `This electronic mail is from ${sessionHost}: ${emailText} `,
      });
    }

    console.log("Email to collaborators sent successfully");
    return NextResponse.json(
      {
        message: "Email sent successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(
      "Error while trying to send mail from admin to employees: ",
      error
    );
    return NextResponse.json({ message: error.message });
  }
}
