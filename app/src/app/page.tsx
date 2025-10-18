import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop"
          alt="Restaurant hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10 text-center text-white p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Ember & Thyme
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto opacity-90">
            Modern seasonal cuisine crafted with fire, smoke, and heart.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/menu"
              className="rounded-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-sm md:text-base transition shadow-lg"
            >
              Explore Menu
            </Link>
            <Link
              href="/reservations"
              className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white px-6 py-3 text-sm md:text-base transition border border-white/30"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold">A Warm Welcome</h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-300">
              We celebrate local ingredients and wood-fired techniques. Our
              dining room pairs soft lighting with warm textures for a premium,
              intimate experience.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">Seasonal menu</li>
              <li className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">Wood-fired grill</li>
              <li className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">Craft cocktails</li>
              <li className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">Local purveyors</li>
            </ul>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
            alt="Dining room"
            width={1200}
            height={800}
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Hours and Contact */}
      <section id="contact" className="bg-neutral-50 dark:bg-neutral-900/30 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold">Hours</h3>
            <ul className="mt-4 space-y-2 text-neutral-700 dark:text-neutral-200">
              <li>Mon–Thu: 5pm–10pm</li>
              <li>Fri–Sat: 5pm–11pm</li>
              <li>Sun: 4pm–9pm</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Contact</h3>
            <form className="mt-4 space-y-4">
              <input
                placeholder="Your name"
                className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3"
              />
              <input
                placeholder="Email or phone"
                className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3"
              />
              <textarea
                placeholder="Message"
                className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent p-3 h-28"
              />
              <button className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-6 py-3">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
