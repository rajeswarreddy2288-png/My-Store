export default function Footer() {
  return (
    <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} My Store. All rights reserved.
    </footer>
  );
}