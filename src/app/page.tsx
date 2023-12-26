import type { Metadata } from 'next'
import Link from 'next/link';
import styles from '@/app/ui/page.module.css'
import RateLimit from '@/app/ui/home/ratelimit';

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Home</h2>
        <p>Next.js on Vercel Middleware demo.</p>
        <Link className={styles.link} href="/about">About</Link>
        <RateLimit />
      </div>
    </main>
  )
}
