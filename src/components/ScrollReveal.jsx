import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, delay = 0 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.98)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [delay]);

    return <div ref={ref}>{children}</div>;
}
