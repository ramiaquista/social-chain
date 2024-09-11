import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/components/Web3Provider';
import { SidePanel } from '@/components/SidePanel';
import { CryptoHeader } from '@/components/CryptoHeader';
import './globals.css';
import { ThemeProvider } from './ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Chain',
  description: 'Web3 Social Media app based on Lens Protocol',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <Web3Provider>
            <div className="flex flex-col lg:flex-row min-h-screen">
              <SidePanel />
              <div className="flex-1 w-full lg:ml-64">
                <CryptoHeader />
                <main className="p-4 lg:p-8">{children}</main>
              </div>
            </div>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
