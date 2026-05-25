import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <nav className="justify-center flex gap-4 text-blue-400">
        <Link href='/'>Home Page</Link>
        <Link href='/new'>New Post</Link>
      </nav>
      <main className="text-center">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
