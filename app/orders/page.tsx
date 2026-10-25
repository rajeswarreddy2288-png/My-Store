import { currentUser } from "@clerk/nextjs/server";

export default async function OrdersPage() {
  const user = await currentUser();
  const name =
    user?.firstName ?? user?.primaryEmailAddress?.emailAddress ?? "customer";

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold">Your Orders</h1>
      <p className="text-gray-600">
        Welcome, {name}! You have no orders yet.
      </p>
    </section>
  );
}
