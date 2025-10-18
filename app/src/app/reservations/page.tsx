"use client";
import { FormEvent, useState } from "react";

type ApiError = { error: string };

export default function ReservationsPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      partySize: Number(formData.get("partySize") || 2),
      startsAt: String(formData.get("startsAt") || ""),
      specialRequests: String(formData.get("specialRequests") || ""),
    };
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json()) as ApiError;
        throw new Error(data.error || "Failed to book");
      }
      setSuccess("Reservation requested! We'll confirm shortly via email or SMS.");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold">Reserve a Table</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">
        Book your next night out with Ember & Thyme.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
          <div>
            <label className="block text-sm mb-1">Party Size</label>
            <input name="partySize" type="number" min={1} max={20} defaultValue={2} required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input name="phone" type="tel" placeholder="(555) 123-4567" className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1">Date & Time</label>
            <input name="startsAt" type="datetime-local" required className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-1">Special Requests</label>
            <textarea name="specialRequests" rows={4} className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent p-3" />
          </div>
        </div>
        {success && <div className="text-green-600 text-sm">{success}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={submitting} className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white px-6 py-3">
          {submitting ? "Submitting…" : "Book table"}
        </button>
      </form>
    </main>
  );
}
