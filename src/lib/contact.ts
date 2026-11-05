import { INSTAGRAM_DM_URL, WHATSAPP_NUMBER } from "../config";
import { serviceLabel, type ServiceId } from "../data/services";

export type Channel = { label: "WhatsApp" | "Instagram"; href: (message?: string) => string };

/** Sem número configurado, o contato cai para o DM do Instagram em vez de ficar quebrado. */
export const channel: Channel = WHATSAPP_NUMBER
  ? {
      label: "WhatsApp",
      href: (message) =>
        `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    }
  : { label: "Instagram", href: () => INSTAGRAM_DM_URL };

export function buildMessage(input: { name: string; service: ServiceId | "indefinido"; note: string }) {
  const parts = [
    `Olá, equipe Mobyze! Eu sou ${input.name.trim() || "uma pessoa que viu o site de vocês"}.`,
    `Quero conversar sobre: ${serviceLabel[input.service]}.`
  ];
  if (input.note.trim()) parts.push(input.note.trim());
  return parts.join(" ");
}

export const defaultMessage = "Olá, equipe Mobyze! Vim pelo site e quero pedir um orçamento.";
