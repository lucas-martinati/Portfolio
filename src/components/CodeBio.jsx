import { useEffect, useRef } from 'react';

export default function CodeBio({ developer }) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (!codeRef.current) return;

        const str = (s) => `<span class="string">'${s}'</span>`;
        const prop = (p) => `<span class="property">${p}</span>`;
        const val = (v) => `<span class="value">${v}</span>`;
        const arr = (list) => `[${list.map((it) => str(it)).join(', ')}]`;
        const pad2 = (n) => String(n).padStart(2, '0');

        const lines = [
            `<span class="keyword">const</span> ${prop('developer')} = {`,
            `&nbsp;&nbsp;${prop('name')}: ${str(developer.name)},`,
            `&nbsp;&nbsp;${prop('status')}: ${str(developer.status)},`,
            `&nbsp;&nbsp;${prop('passion')}: ${str(developer.passion)},`,
            `&nbsp;&nbsp;${prop('skills')}: ${arr(developer.skills)},`,
            `&nbsp;&nbsp;${prop('mindset')}: ${str(developer.mindset)},`,
            `&nbsp;&nbsp;${prop('currentFocus')}: ${str(developer.currentFocus)},`,
            `&nbsp;&nbsp;${prop('availability')}: ${val(developer.availability)},`,
            `&nbsp;&nbsp;${prop('email')}: ${str(developer.email)}`,
            `};`,
            ``,
            `<span class="comment">// ${developer.comment}</span>`
        ];

        codeRef.current.innerHTML = lines
            .map((content, i) => `
        <div class="code-line" style="animation-delay: ${i * 0.15}s">
          <span class="line-number">${pad2(i + 1)}</span>
          ${content}
        </div>`)
            .join('');
    }, [developer]);

    return (
        <div className="code-bio">
            <div className="code-header">
                <div className="code-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
                <div className="file-name">lucas-martinati.js</div>
            </div>
            <div className="code-content" ref={codeRef}></div>
        </div>
    );
}
