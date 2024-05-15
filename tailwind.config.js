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
        border: "hsl(var(--sp-border))",
        input: "hsl(var(--sp-input))",
        ring: "hsl(var(--sp-ring))",
        background: "hsl(var(--sp-background))",
        foreground: "hsl(var(--sp-foreground))",
        primary: {
          DEFAULT: "hsl(var(--sp-primary))",
          foreground: "hsl(var(--sp-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--sp-secondary))",
          foreground: "hsl(var(--sp-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--sp-destructive))",
          foreground: "hsl(var(--sp-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--sp-muted))",
          foreground: "hsl(var(--sp-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--sp-accent))",
          foreground: "hsl(var(--sp-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--sp-popover))",
          foreground: "hsl(var(--sp-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--sp-card))",
          foreground: "hsl(var(--sp-card-foreground))",
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