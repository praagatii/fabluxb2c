import type { B2BImageKey } from "@/data/b2b";
import fittings from "@/assets/b2b-fittings.jpg";
import hardware from "@/assets/b2b-hardware.jpg";
import fixtures from "@/assets/b2b-fixtures.jpg";
import bulk from "@/assets/b2b-bulk.jpg";
import supply from "@/assets/b2b-supply.jpg";

const map: Record<B2BImageKey, string> = { fittings, hardware, fixtures, bulk, supply };

export const b2bImage = (key: B2BImageKey) => map[key];
