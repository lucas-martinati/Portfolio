import { useEffect, useRef, useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

export default function CodeBio({ developer }) {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!codeRef.current) return;

        const str = (s) => `<span class="string">'${s}'</span>`;
        const prop = (p) => `<span class="property">${p}</span>`;
        const val = (v) => `<span class="value">${v}</span>`;
        const arr = (list) => `[${list.map((it) => str(it)).join(', ')}]`;
        const pad2 = (n) => String(n).padStart(2, '0');

        const githubSlug = developer.github ? developer.github.replace(/https?:\/\/github\.com\/?/, '').replace(/\/$/, '') : 'lucas-martinati';
        const linkedinSlug = developer.linkedin ? developer.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\/?/, '').replace(/\/$/, '') : 'lucas-martinati';

        const lines = [
            `<span class="keyword">const</span> ${prop('developer')} = {`,
            `&nbsp;&nbsp;${prop('name')}: ${str(developer.name)},`,
            `&nbsp;&nbsp;${prop('status')}: ${str(developer.status)},`,
            `&nbsp;&nbsp;${prop('passion')}: ${str(developer.passion)},`,
            `&nbsp;&nbsp;${prop('skills')}: ${arr(developer.skills)},`,
            `&nbsp;&nbsp;${prop('mindset')}: ${str(developer.mindset)},`,
            `&nbsp;&nbsp;${prop('currentFocus')}: ${str(developer.currentFocus)},`,
            `&nbsp;&nbsp;${prop('availability')}: ${val(developer.availability)},`,
            `&nbsp;&nbsp;${prop('email')}: ${str(developer.email)},`,
            `&nbsp;&nbsp;${prop('github')}: ${str(githubSlug)},`,
            `&nbsp;&nbsp;${prop('linkedin')}: ${str(linkedinSlug)}`,
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

    const handleCopy = async () => {
        const githubSlug = developer.github ? developer.github.replace(/https?:\/\/github\.com\/?/, '').replace(/\/$/, '') : 'lucas-martinati';
        const linkedinSlug = developer.linkedin ? developer.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\/?/, '').replace(/\/$/, '') : 'lucas-martinati';

        const rawCode = `const developer = {
  name: '${developer.name}',
  status: '${developer.status}',
  passion: '${developer.passion}',
  skills: [${developer.skills.map(s => `'${s}'`).join(', ')}],
  mindset: '${developer.mindset}',
  currentFocus: '${developer.currentFocus}',
  availability: ${developer.availability},
  email: '${developer.email}',
  github: '${githubSlug}',
  linkedin: '${linkedinSlug}'
};

// ${developer.comment}`;

        try {
            await navigator.clipboard.writeText(rawCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="code-bio">
            <div className="code-header">
                <div className="code-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
                <div className="file-name">lucas-martinati.js</div>
                <button
                    type="button"
                    className={`code-copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    aria-label="Copier le code source"
                    title="Copier le code"
                >
                    {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                </button>
            </div>
            <div className="code-content" ref={codeRef}></div>
        </div>
    );
}
