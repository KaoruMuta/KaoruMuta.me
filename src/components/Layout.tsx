import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <section id="layoutContainer" className="flex flex-col font-sans mx-4 sm:mx-16 md:mx-56 h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
