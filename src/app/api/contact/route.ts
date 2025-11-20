import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONTACTS_DIR = path.join(process.cwd(), 'src', 'data');
const CONTACTS_FILE = path.join(CONTACTS_DIR, 'contacts.json');

async function ensureDataFile() {
  await fs.mkdir(CONTACTS_DIR, { recursive: true });
  try {
    await fs.access(CONTACTS_FILE);
  } catch (e) {
    await fs.writeFile(CONTACTS_FILE, '[]');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body || {};

    await ensureDataFile();

    // Append contact to contacts.json
    const raw = await fs.readFile(CONTACTS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    const entry = {
      id: Date.now(),
      name: String(name || ''),
      email: String(email || ''),
      phone: String(phone || ''),
      company: String(company || ''),
      subject: String(subject || ''),
      message: String(message || ''),
      createdAt: new Date().toISOString(),
    };
    arr.push(entry);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(arr, null, 2));

    // Try to send emails if SMTP env vars present
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    let emailSent = false;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL) {
      try {
        let nodemailer: any = null;
        try {
          // keep require hidden from static analysis
          // eslint-disable-next-line no-eval
          const req = eval('require');
          nodemailer = req('nodemailer');
        } catch (impErr) {
          console.warn('nodemailer not installed or failed to require, skipping email sending', impErr);
        }

        if (nodemailer) {
          const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: false,
            auth: {
              user: SMTP_USER,
              pass: SMTP_PASS,
            },
          });

          const adminBody = `New contact submission:\n\nName: ${entry.name}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nCompany: ${entry.company}\nSubject: ${entry.subject}\nMessage:\n${entry.message}\n`;

          await transporter.sendMail({
            from: SMTP_USER,
            to: ADMIN_EMAIL,
            subject: `Website contact: ${entry.subject || 'New message'}`,
            text: adminBody,
          });

          // send confirmation to user
          if (entry.email) {
            await transporter.sendMail({
              from: SMTP_USER,
              to: entry.email,
              subject: `We received your message${entry.subject ? `: ${entry.subject}` : ''}`,
              text: `Hi ${entry.name || ''},\n\nThank you for contacting us. We've received your message and will get back to you shortly.\n\nSummary:\n${entry.message}\n\n— Team`,
            });
          }

          emailSent = true;
        } else {
          console.warn('nodemailer unavailable; saved contact but did not send emails');
        }
      } catch (err) {
        console.error('Failed sending contact emails', err);
      }
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to process contact' }, { status: 500 });
  }
}
