import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: 'WATUQ — Plataforma de Gobernanza Estratégica',
  description:
    'Monitoreo de indicadores, participación ciudadana y toma de decisiones transparente para ecosistemas públicos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-text">
        {children}
      </body>
    </html>
  );
}
