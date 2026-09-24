# vue-italy-map

[![npm](https://img.shields.io/npm/v/vue-italy-map)](https://www.npmjs.com/package/vue-italy-map)
[![license](https://img.shields.io/npm/l/vue-italy-map)](LICENSE)

Componente **Vue 3** con la mappa SVG interattiva delle **20 regioni italiane**.
Selezione con `v-model`, navigabile da tastiera, stile personalizzabile con variabili CSS. Zero dipendenze oltre a Vue.

**Demo:** https://andrearufo.github.io/vue-italy-map/

## Installazione

```bash
npm install vue-italy-map
```

## Uso

```vue
<script setup>
import { ref } from 'vue'
import { ItalyMap } from 'vue-italy-map'
import 'vue-italy-map/style.css'

const region = ref(null) // es. 'lazio'
</script>

<template>
  <ItalyMap v-model="region" @select="(r) => console.log(r.id, r.name)" />
</template>
```

La mappa occupa il 100% del contenitore (mantiene le proporzioni dell'SVG): dagli una larghezza o un'altezza.

## API

### Props

| Prop | Tipo | Default | Descrizione |
| --- | --- | --- | --- |
| `v-model` / `modelValue` | `string \| null` | `null` | Id della regione selezionata |

### Eventi

| Evento | Payload | Quando |
| --- | --- | --- |
| `update:modelValue` | `string` | Click / Invio / Spazio su una regione |
| `select` | `{ id, name }` | Come sopra |

### Export

- `ItalyMap` (anche export di default): il componente
- `regions`: array `{ id, name, d }` delle 20 regioni (utile per select, legende, ecc.)

Tipi TypeScript inclusi (`RegionId`, `Region`).

### Id delle regioni

`abruzzo`, `basilicata`, `calabria`, `campania`, `emilia-romagna`, `friuli-venezia-giulia`, `lazio`, `liguria`, `lombardia`, `marche`, `molise`, `piemonte`, `puglia`, `sardegna`, `sicilia`, `toscana`, `trentino-alto-adige`, `umbria`, `valle-daosta`, `veneto`

## Personalizzazione

```css
.italy-map {
  --italy-map-fill: #d4d4d8;   /* regione */
  --italy-map-hover: #a1a1aa;  /* hover / focus */
  --italy-map-active: #16a34a; /* selezionata */
  --italy-map-stroke: #fff;    /* confini */
  --italy-map-stroke-width: 1;
}

/* singola regione */
.italy-map [data-region="sicilia"] { fill: orange; }
```

## Accessibilità

Ogni regione è un `role="button"` focusabile con `aria-label`, `aria-pressed` e `<title>` (tooltip nativo). Si seleziona con <kbd>Tab</kbd> + <kbd>Invio</kbd>/<kbd>Spazio</kbd>.

## Sviluppo

```bash
npm install
npm run dev         # pagina demo con hot reload
npm run build       # libreria → dist/
npm run build:demo  # demo → dist-demo/ (deploy automatico su GitHub Pages da master)
```

## Licenza

[GPL-3.0](LICENSE) © Andrea Rufo
