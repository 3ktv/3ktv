import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

import { useNavigate } from 'react-router-dom';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if an input is focused
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // Handle '0' key for home navigation
      if (e.key === '0') {
        e.preventDefault();
        navigate('/');
        return;
      }

      // Only handle arrow keys
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        return;
      }

      e.preventDefault();

      // Get all focusable elements (buttons and links)
      // We specifically target .btn class and standard focusable elements
      const selector = '.btn, a[href], button, input, [tabindex]:not([tabindex="-1"])';
      const focusable = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
      
      if (focusable.length === 0) return;

      const current = document.activeElement as HTMLElement;
      const index = focusable.indexOf(current);

      let nextIndex = 0;

      if (index === -1) {
        // If nothing focused, start at 0
        nextIndex = 0;
      } else {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = (index + 1) % focusable.length;
        } else {
          nextIndex = (index - 1 + focusable.length) % focusable.length;
        }
      }

      focusable[nextIndex].focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <div className="scanline" aria-hidden="true"></div>
      <div className="gridlines" aria-hidden="true"></div>
      {children}
    </>
  );
};

export default Layout;
