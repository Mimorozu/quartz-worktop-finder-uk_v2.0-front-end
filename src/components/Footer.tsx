import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate text-white px-5 py-10 mt-16">
      <div className="max-w-[1100px] mx-auto text-center">
        <div className="text-xl font-bold mb-2">
          Kitchen Worktop <span className="text-gold">Experts</span>
        </div>
        <p className="opacity-80">
          Connecting you with verified stone mason specialists across the UK
        </p>
        <p className="mt-4">
          <Link href="/privacy" className="text-gold hover:underline mx-2.5">
            Privacy Policy
          </Link>
          |
          <Link href="/terms" className="text-gold hover:underline mx-2.5">
            Terms of Service
          </Link>
        </p>
        <p className="mt-5 text-sm opacity-80">
          &copy; {new Date().getFullYear()} Kitchen Worktop Experts. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
