import type { DefineComponent } from 'vue'

export type RegionId =
  | 'abruzzo' | 'basilicata' | 'calabria' | 'campania' | 'emilia-romagna'
  | 'friuli-venezia-giulia' | 'lazio' | 'liguria' | 'lombardia' | 'marche'
  | 'molise' | 'piemonte' | 'puglia' | 'sardegna' | 'sicilia' | 'toscana'
  | 'trentino-alto-adige' | 'umbria' | 'valle-daosta' | 'veneto'

export interface Region {
  id: RegionId
  name: string
  d: string
}

export const regions: Region[]

export const ItalyMap: DefineComponent<
  { modelValue?: RegionId | null },
  {},
  {},
  {},
  {},
  {},
  {},
  {
    'update:modelValue': (id: RegionId) => void
    select: (region: { id: RegionId; name: string }) => void
  }
>

export default ItalyMap
