export const INSTAGRAM_HANDLE = "somosmobyze";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

/** Só dígitos, com país e DDD (ex.: 5511999999999). Definido em .env: VITE_WHATSAPP_NUMBER. */
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
