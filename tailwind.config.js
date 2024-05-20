/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: ['class'],
  safelist: ["sp-dark"],
  prefix: "sp-",

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
	],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--sp-border)",
        input: "var(--sp-input)",
        ring: "var(--sp-ring)",
        background: "var(--sp-background)",
        foreground: "var(--sp-foreground)",
        primary: {
          DEFAULT: "var(--sp-primary)",
          foreground: "var(--sp-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--sp-secondary)",
          foreground: "var(--sp-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--sp-destructive)",
          foreground: "var(--sp-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--sp-muted)",
          foreground: "var(--sp-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--sp-accent)",
          foreground: "var(--sp-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--sp-popover)",
          foreground: "var(--sp-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--sp-card)",
          foreground: "var(--sp-card-foreground)",
        },
      },
      borderRadius: {
      	xl: "calc(var(--sp-radius) + 4px)",
        lg: "var(--sp-radius)",
        md: "calc(var(--sp-radius) - 2px)",
        sm: "calc(var(--sp-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // corePlugins: {
  //   preflight: false,
  // }
}