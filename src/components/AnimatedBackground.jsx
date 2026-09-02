export default function AnimatedBackground() {
    return (
        <div className="animated-bg" aria-hidden="true">
            {/* Tech Blueprint Matrix Grid Overlay */}
            <div className="tech-grid-overlay"></div>

            {/* Glowing Blobs */}
            <div className="glow-blob blob-1"></div>
            <div className="glow-blob blob-2"></div>
            <div className="glow-blob blob-3"></div>
            <div className="glow-blob blob-4"></div>

            {/* Vignette mask */}
            <div className="bg-vignette"></div>
        </div>
    );
}
