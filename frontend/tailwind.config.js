/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'deep-bg': '#0a0f1d',
                'deep-panel': '#12182b',
                'deep-border': '#1d253f',
                'cern-blue': '#2463eb',
                'cern-accent': '#38bdf8',
            }
        },
    },
    plugins: [],
}
