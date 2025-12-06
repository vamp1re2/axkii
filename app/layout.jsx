import '../styles/globals.css';
import { Footer } from '../components/footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/navbar';

export const metadata = {
    title: {
        template: '%s | Our App',
        default: '💕 Our App'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased">
                <ThemeProvider>
                    <AuthProvider>
                        <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
