"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Job = {
  id?: string;
  title: string;
  department?: string;
  employmentType?: string;
  experienceLevel?: string;
  location?: string;
  salary?: string;
  remote?: boolean;
  description?: string;
  responsibilities?: string;
  requirements?: string;
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState<Job>({ title: '', department: '', employmentType: '', experienceLevel: '', location: '', salary: '', remote: false, description: '', responsibilities: '', requirements: '' });

  async function load() {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => { load(); }, []);

  function onChange(e: any) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function createJob() {
    const res = await fetch('/api/jobs', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) {
      setForm({ title: '', department: '', employmentType: '', experienceLevel: '', location: '', salary: '', remote: false, description: '', responsibilities: '', requirements: '' });
      await load();
    }
  }

  function startEdit(j: Job) {
    setEditing(j);
    setForm({
      title: j.title || '',
      department: j.department || '',
      employmentType: j.employmentType || '',
      experienceLevel: j.experienceLevel || '',
      location: j.location || '',
      salary: j.salary || '',
      remote: !!j.remote,
      description: j.description || '',
      responsibilities: j.responsibilities || '',
      requirements: j.requirements || '',
    });
  }

  async function saveEdit() {
    if (!editing?.id) return;
    const res = await fetch(`/api/jobs/${editing.id}`, { method: 'PUT', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) {
      setEditing(null);
      setForm({ title: '', department: '', employmentType: '', experienceLevel: '', location: '', salary: '', remote: false, description: '', responsibilities: '', requirements: '' });
      await load();
    }
  }

  async function remove(id?: string) {
    if (!id) return;
    const ok = confirm('Delete this job posting?');
    if (!ok) return;
    const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    if (res.ok) await load();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Job Postings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 border rounded">
          <h2 className="font-semibold mb-3">{editing ? 'Edit Job' : 'Create Job'}</h2>
          <label className="block mb-2">Title</label>
          <Input name="title" value={form.title} onChange={onChange} />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block mb-2">Department</label>
              <Input name="department" value={form.department} onChange={onChange} />
            </div>
            <div>
              <label className="block mb-2">Employment Type</label>
              <Input name="employmentType" value={form.employmentType} onChange={onChange} placeholder="Full-time / Part-time / Contract" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block mb-2">Experience Level</label>
              <Input name="experienceLevel" value={form.experienceLevel} onChange={onChange} placeholder="Junior / Mid / Senior" />
            </div>
            <div>
              <label className="block mb-2">Salary</label>
              <Input name="salary" value={form.salary} onChange={onChange} />
            </div>
          </div>
          <label className="block mt-3 mb-2">Location</label>
          <Input name="location" value={form.location} onChange={onChange} />
          <label className="inline-flex items-center gap-2 mt-3">
            <input type="checkbox" name="remote" checked={!!form.remote} onChange={onChange} />
            <span className="ml-2">Remote</span>
          </label>
          <label className="block mt-3 mb-2">Description</label>
          <Textarea name="description" value={form.description} onChange={onChange} />
          <label className="block mt-3 mb-2">Responsibilities (one per line)</label>
          <Textarea name="responsibilities" value={form.responsibilities} onChange={onChange} />
          <label className="block mt-3 mb-2">Requirements (one per line)</label>
          <Textarea name="requirements" value={form.requirements} onChange={onChange} />
          <div className="mt-4 flex gap-2">
            {editing ? (
              <>
                <Button onClick={saveEdit}>Save</Button>
                <Button variant="ghost" onClick={() => { setEditing(null); setForm({ title: '', department: '', employmentType: '', experienceLevel: '', location: '', salary: '', remote: false, description: '', responsibilities: '', requirements: '' }); }}>Cancel</Button>
              </>
            ) : (
              <Button onClick={createJob}>Create</Button>
            )}
          </div>
        </div>

        <div className="p-6 border rounded">
          <h2 className="font-semibold mb-3">Existing Postings</h2>
          <ul className="space-y-4">
            {jobs.map((j) => (
              <li key={j.id} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <div className="font-bold">{j.title}</div>
                  <div className="text-sm text-muted-foreground">{j.department} • {j.employmentType} • {j.experienceLevel}</div>
                  <div className="text-sm text-muted-foreground">{j.location}{j.remote ? ' • Remote' : ''}{j.salary ? ` • ${j.salary}` : ''}</div>
                  <div className="mt-2 text-sm">{j.description}</div>
                  {j.responsibilities && (
                    <div className="mt-2">
                      <strong>Responsibilities:</strong>
                      <ul className="list-disc ml-5 text-sm mt-1">
                        {String(j.responsibilities).split('\n').map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                  {j.requirements && (
                    <div className="mt-2">
                      <strong>Requirements:</strong>
                      <ul className="list-disc ml-5 text-sm mt-1">
                        {String(j.requirements).split('\n').map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="ghost" onClick={() => startEdit(j)}>Edit</Button>
                  <Button variant="destructive" onClick={() => remove(j.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
