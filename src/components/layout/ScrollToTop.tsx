import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Resets the scroll position when navigating to a new route. Without it the
 * SPA keeps the previous page's offset, so links in the footer (privacy,
 * terms) open the next page scrolled to the bottom.
 *
 * Back/forward navigation (POP) is left alone so the browser can restore the
 * previous position, and in-page hash links are ignored.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP' || hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
}
