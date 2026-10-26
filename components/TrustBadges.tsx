import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const badges = [
  {
    title: "Free delivery",
    text: "On orders over \u20B9499",
    icon: (
      <Icon>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </Icon>
    ),
  },
  {
    title: "Easy returns",
    text: "30-day return window",
    icon: (
      <Icon>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </Icon>
    ),
  },
  {
    title: "Safe shopping",
    text: "Sign in with Clerk",
    icon: (
      <Icon>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </Icon>
    ),
  },
  {
    title: "Help when needed",
    text: "Mon to Sat, 10 AM to 6 PM",
    icon: (
      <Icon>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="1" />
        <rect x="17" y="14" width="4" height="6" rx="1" />
      </Icon>
    ),
  },
];

export default function TrustBadges() {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {badges.map((b) => (
        <div key={b.title} className="flex items-center gap-3 rounded-xl border bg-white p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            {b.icon}
          </span>
          <div>
            <p className="text-sm font-bold">{b.title}</p>
            <p className="text-xs text-gray-500">{b.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
