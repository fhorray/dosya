export const getContrastingColor = (hex: string): string => {
  if (!hex) return "#000000"; // Retorna preto por padrão caso a cor não seja válida

  // Remove o '#' se estiver presente
  hex = hex.replace(/^#/, "");

  // Converte para RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calcula o brilho (Luminância relativa - W3C)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Retorna preto se for uma cor clara, branco se for escura
  return brightness > 128 ? "#000000" : "#FFFFFF";
};
