import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, currentPath }: { children?: ReactNode; currentPath: string }) => {
  return (
    <div id="layoutContainer" className="flex flex-col font-sans mx-4 sm:mx-16 md:mx-56 h-screen">
      <Header currentPath={currentPath} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
