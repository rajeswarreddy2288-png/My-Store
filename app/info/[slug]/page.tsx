import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Page = { title: string; paragraphs: string[] };

// These are sample texts. Replace them with your real business details before launching.
export const infoPages: Record<string, Page> = {
  about: {
    title: "About us",
    paragraphs: [
      "My Store is an online shop for fashion, footwear, electronics and home products.",
      "We aim to bring you good products at fair prices, with simple returns and friendly support.",
      "This site is a learning project built with Next.js, Tailwind CSS and Clerk.",
    ],
  },
  contact: {
    title: "Contact us",
    paragraphs: [
      "We are happy to help with orders, returns and product questions.",
      "Email: support@example.com (replace with your real address).",
      "Support hours: Monday to Saturday, 10 AM to 6 PM.",
    ],
  },
  shipping: {
    title: "Shipping",
    paragraphs: [
      "Delivery is free on orders over 499 rupees. Below that, a delivery fee of 49 rupees applies.",
      "Orders are usually dispatched within 1 to 2 working days.",
      "Delivery normally takes 3 to 7 working days, depending on your location.",
    ],
  },
  returns: {
    title: "Returns and exchanges",
    paragraphs: [
      "You can return most items within 30 days of delivery.",
      "Items must be unused, with their original tags and packaging.",
      "Refunds go back to the original payment method after the returned item is checked.",
    ],
  },
  privacy: {
    title: "Privacy policy",
    paragraphs: [
      "We collect only the information needed to run your account and orders, such as your name and email.",
      "Sign-in is handled by Clerk. We never see your password.",
      "We do not sell your personal information to anyone.",
    ],
  },
  terms: {
    title: "Terms of use",
    paragraphs: [
      "By using this site you agree to use it lawfully and not to misuse it.",
      "Prices, offers and availability can change without notice.",
      "We may cancel orders affected by pricing or stock errors and will refund any payment made.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = infoPages[slug];
  return { title: (page ? page.title : "Page not found") + " | My Store" };
}

export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-2xl">
      <Link href="/" className="text-sm text-indigo-600 hover:underline">
        &larr; Back to shop
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{page.title}</h1>
      <div className="mt-6 space-y-4 text-gray-700">
        {page.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
