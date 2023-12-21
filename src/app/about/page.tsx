import type { Metadata } from 'next'
import Link from 'next/link';
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About',
}

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>About</h2>
        <p>Next.js on Vercel Middleware demo.</p>
        <Link className={styles.link} href="/">Home</Link>
      </div>
    </main>

  )
}
