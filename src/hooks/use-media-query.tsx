import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const getMatches = (q: string): boolean => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia(q).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

        mediaQueryList.addEventListener('change', listener);
        setMatches(mediaQueryList.matches);

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [query]);

    return matches;
}