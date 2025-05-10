export const appName = 'Calculator';
export const appIcon = '<i class="fa-solid fa-calculator-simple"></i>';

export function init(container) {
    container.className = 'max-w-sm mx-auto mt-10 p-6 bg-zinc-900 text-white rounded-2xl shadow-xl flex flex-col gap-4';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold text-center';
    title.textContent = appName;

    const input = document.createElement('input');
    input.className = 'w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-lg outline-none focus:ring-2 focus:ring-violet-500';
    input.placeholder = 'Type an expression...';

    const result = document.createElement('div');
    result.className = 'text-right text-xl font-mono min-h-[2rem]';

    input.addEventListener('input', () => {
        try {
            const value = input.value.trim();
            if (!value) return result.textContent = '';
            const answer = Function(`"use strict"; return (${value})`)();
            result.textContent = answer;
        } catch {
            result.textContent = 'error';
        }
    });

    container.appendChild(title);
    container.appendChild(input);
    container.appendChild(result);
}
