import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WEDDING_CONFIG } from '@/config/wedding';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: `${WEDDING_CONFIG.conceptTitle} — ${WEDDING_CONFIG.couple.groom.nickname} & ${WEDDING_CONFIG.couple.bride.nickname}`,
  description: `Undangan Pernikahan 3D Interaktif ${WEDDING_CONFIG.couple.groom.fullName} & ${WEDDING_CONFIG.couple.bride.fullName}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-primary/20 selection:text-text">
        {children}
      </body>
    </html>
  );
}
