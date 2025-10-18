export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="font-semibold tracking-tight text-lg">Ember <span className="text-amber-600">&</span> Thyme</div>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 max-w-xs">
            Modern wood-fired cuisine in the heart of the city.
          </p>
        </div>
        <div>
          <div className="font-medium">Visit us</div>
          <ul className="mt-3 text-sm text-neutral-700 dark:text-neutral-200 space-y-1">
            <li>123 Hearth Lane</li>
            <li>Riverwood, RW 90210</li>
            <li>+1 (555) 123-4567</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Hours</div>
          <ul className="mt-3 text-sm text-neutral-700 dark:text-neutral-200 space-y-1">
            <li>Mon–Thu: 5pm–10pm</li>
            <li>Fri–Sat: 5pm–11pm</li>
            <li>Sun: 4pm–9pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Ember & Thyme</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
