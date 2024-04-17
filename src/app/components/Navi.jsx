'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navi = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname + window.location.hash);
    }
  }, []);


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 sm:px-6 py-3">
        <div className="">
          <div className="flex items-center justify-between h-16">
            <Link href="/" passHref>
              <p className="text-xl font-bold text-[26px] cursor-pointer">
                <span className='text-violet-400 hover:text-violet-200'>BG-REMOVER</span>
              </p>
            </Link>
            <ul className="flex items-center ">
              <li>
                <Link href="" passHref>
                  <p className={`mr-4 text-[16px] cursor-pointer ${currentPath === '/#howToUse' ? 'text-violet-300' : 'hover:text-violet-300'}`}>
                    How to Use
                  </p>
                </Link>
              </li>
              <li>
                <Link href="" passHref>
                  <p className={`mr-4 text-[16px] cursor-pointer ${currentPath === '/#Demo' ? 'text-violet-300' : 'hover:text-violet-300'}`}>
                    Login
                  </p>
                </Link>
              </li>
              <li>
                <Link href="" passHref>
                  <p className={`mr-4 text-[16px] cursor-pointer ${currentPath === '/#GetStarted' ? 'text-violet-300' : 'hover:text-violet-300'}`}>
                    SignIn
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navi;