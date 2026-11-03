/**
 * Exception assumée aux tokens Tailwind : les clients mail ignorent le CSS externe et les variables.
 * Valeurs miroir de `src/styles/global.css` (@theme), à garder synchronisées.
 */
export const emailTheme = {
  color: {
    surface: '#faf9f9',
    card: '#ffffff',
    text: '#1a1c1c',
    textEditorial: '#393737',
    muted: '#4c4547',
    hairline: '#c5c3c3',
    button: '#191818',
    onButton: '#ffffff',
  },
  font: {
    heading: "Georgia, 'Times New Roman', serif",
    body: "Arial, Helvetica, sans-serif",
  },
  width: 600,
} as const;
