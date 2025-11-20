import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const RESUMES_DIR = path.join(process.cwd(), 'src', 'data', 'resumes');

async function ensureDir() {
  await fs.mkdir(RESUMES_DIR, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fields: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'resume') continue;
      fields[key] = value;
    }

    // handle resume file
    const resume = formData.get('resume') as File | null;
    let savedFilename: string | null = null;
    if (resume && typeof (resume as any).arrayBuffer === 'function') {
      await ensureDir();
      const buffer = Buffer.from(await resume.arrayBuffer());
      const safeName = `${Date.now()}-${(resume as any).name || 'resume'}`.replace(/[^a-zA-Z0-9._-]/g, '_');
      const outPath = path.join(RESUMES_DIR, safeName);
      await fs.writeFile(outPath, buffer);
      savedFilename = safeName;
    }

    // Try to send emails if SMTP env vars present
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    // Build email text
    const applicantEmail = String(fields.email || '');
    const jobTitle = String(fields.jobTitle || '');
    let emailBody = `New application for ${jobTitle}\n\n`;
    Object.keys(fields).forEach((k) => {
      emailBody += `${k}: ${fields[k]}\n`;
    });
    if (savedFilename) emailBody += `\nResume saved as: ${savedFilename}\n`;

    let emailSent = false;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL) {
      try {
        // Try to load nodemailer at runtime without static import so the Next.js
        // bundler won't fail when the package isn't installed. If it's absent,
        // skip email sending but keep the saved resume.
        let nodemailer: any = null;
        try {
          // Hide the require call from static analysis using eval.
          // This prevents Next from trying to resolve the module at build time.
          // eslint-disable-next-line no-eval
          const req = eval("require");
          nodemailer = req('nodemailer');
        } catch (impErr) {
          console.warn('nodemailer not installed or failed to require, skipping email sending', impErr);
        }

        if (!nodemailer) {
          // nodemailer missing — skip email sending but return success for saved resume
          console.warn('nodemailer unavailable; application saved but no email sent');
        } else {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: false,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS,
            },
          });

          const attachments: any[] = [];
          if (savedFilename) {
            attachments.push({ filename: savedFilename, path: path.join(RESUMES_DIR, savedFilename) });
          }

          // Send to admin
          await transporter.sendMail({
            from: SMTP_USER,
            to: ADMIN_EMAIL,
            subject: `New application for ${jobTitle}`,
            text: emailBody,
            attachments,
          });

          // Send confirmation to applicant (if provided)
          if (applicantEmail) {
            await transporter.sendMail({
              from: SMTP_USER,
              to: applicantEmail,
              subject: `Application received: ${jobTitle}`,
              text: `Thank you for applying to ${jobTitle}. We received your application and will be in touch.`,
            });
          }

          emailSent = true;
        }
      } catch (err) {
        // continue, we'll return saved file and fields even if email fails
        console.error('Email send failed', err);
      }
    }

    return NextResponse.json({ success: true, savedFilename, emailSent });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
