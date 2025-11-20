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

export async function GET() {
  const jobs = await readJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobs = await readJobs();
    const id = String(Date.now());
    const newJob = { id, ...body };
    jobs.unshift(newJob);
    await writeJobs(jobs);
    return NextResponse.json(newJob, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
