/**
 * Inline script for <head>: applies the saved (or OS-preferred) theme before
 * first paint, so there is never a flash of the wrong colors.
 *
 * Lives outside theme-provider.tsx on purpose — that file is a client module,
 * and a server component (app/layout.tsx) can't import a plain string from one.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;
