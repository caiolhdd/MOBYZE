import { describe, expect, it } from "vitest";
import { ehRotaChiqcell } from "./rotas";

describe("ehRotaChiqcell", () => {
  it.each(["/chiqcell", "/chiqcell/", "/chiqcell/qualquer"])("%s -> CHIQ CELL", (p) => expect(ehRotaChiqcell(p)).toBe(true));
  it.each(["/", "", "/chiqcellx", "/sobre", "/x/chiqcell"])("%s -> Mobyze", (p) => expect(ehRotaChiqcell(p)).toBe(false));
});
