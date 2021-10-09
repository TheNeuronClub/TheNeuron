import { ArrowUpIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react'

function ScrollToTop() {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [scrolled, setScrolled] = useState(false)
    const checkScrollTop = () => {
        if (window.pageYOffset > 75) {
            setScrolled(true)
        } else if (window.pageYOffset <= 75) {
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => {
            window.removeEventListener('scroll', checkScrollTop)
        }
    }, [scrolled])
    return (
        <>
            <button className="btn__float gradient-bg gradient-shadow-lg p-3 fixed bottom-10 right-10 font-bold text-white rounded-full"
                onClick={scrollTop}
                style={{ display: scrolled ? 'flex' : 'none' }}
            >
                <ArrowUpIcon className="w-8 h-8 text-white" />
            </button>
        </>
    )
}

export default ScrollToTop