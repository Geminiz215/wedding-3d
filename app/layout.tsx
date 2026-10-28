import type { Metadata } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import './globals.css';
import { WEDDING_CONFIG } from '@/config/wedding';

// High-contrast didone for names and headings; the opsz axis softens it at reading sizes.
const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  adjustFontFallback: false, // Next ships no fallback metrics for Bodoni Moda
  variable: '--font-display',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: `${WEDDING_CONFIG.conceptTitle} — ${WEDDING_CONFIG.couple.groom.nickname} & ${WEDDING_CONFIG.couple.bride.nickname}`,
  description: `Undangan Pernikahan 3D Interaktif ${WEDDING_CONFIG.couple.groom.fullName} & ${WEDDING_CONFIG.couple.bride.fullName}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased selection:bg-blush selection:text-text">
        {children}
      </body>
    </html>
  );
}
