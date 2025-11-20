import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'jobs.json');

async function readJobs() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

async function writeJobs(jobs: any[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(jobs, null, 2), 'utf-8');
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const jobs = await readJobs();
  const job = jobs.find((j: any) => j.id === params.id);
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(job);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const jobs = await readJobs();
    const idx = jobs.findIndex((j: any) => j.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    jobs[idx] = { ...jobs[idx], ...data };
    await writeJobs(jobs);
    return NextResponse.json(jobs[idx]);
  } catch (err) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const jobs = await readJobs();
  const idx = jobs.findIndex((j: any) => j.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [removed] = jobs.splice(idx, 1);
  await writeJobs(jobs);
  return NextResponse.json({ success: true, removed });
}
