export const PROMOCIONES_ANUALES = [
  { codigo: 'HALLOWEEN25', campana: 'halloween', desde: '2026-10-15T07:00:00.000Z', hasta: '2026-11-01T06:59:59.999Z' },
  { codigo: 'PAWWERXMAS25', campana: 'navidad', desde: '2026-11-01T07:00:00.000Z', hasta: '2026-12-26T06:59:59.999Z' },
] as const;

export function promocionVigente(codigo?: string | null, ahora = new Date()) {
  if (codigo === null || codigo === '') return null;
  return PROMOCIONES_ANUALES.find(p =>
    (codigo === undefined || p.codigo === codigo.trim().toUpperCase())
    && ahora.getTime() >= Date.parse(p.desde)
    && ahora.getTime() <= Date.parse(p.hasta)
  ) || null;
}
