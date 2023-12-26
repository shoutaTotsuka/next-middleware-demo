import type { Metadata } from 'next'
import Link from 'next/link';
import styles from '@/app/ui/not-found.module.css'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>404</h2>
        <p>Page Not Found.</p>
        <Link className={styles.link} href="/">Home</Link>
      </div>
    </main>
  );
}
