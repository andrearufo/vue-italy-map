<script setup>
import { ref, computed } from 'vue'
import { ItalyMap, regions } from '../src/index.js'

const region = ref(null)
const log = ref([])
const name = computed(() => regions.find((r) => r.id === region.value)?.name)

function onSelect(r) {
  log.value = [`select → ${JSON.stringify(r)}`, ...log.value].slice(0, 5)
}
</script>

<template>
  <main>
    <header>
      <h1>vue-italy-map</h1>
      <p>
        Componente Vue 3 con la mappa SVG interattiva delle 20 regioni italiane.
        Clicca una regione (o usa <kbd>Tab</kbd> + <kbd>Invio</kbd>).
      </p>
      <p class="links">
        <a href="https://github.com/andrearufo/vue-italy-map">GitHub</a> ·
        <a href="https://www.npmjs.com/package/vue-italy-map">npm</a>
      </p>
    </header>

    <section class="demo">
      <div class="map"><ItalyMap v-model="region" @select="onSelect" /></div>

      <aside>
        <label>
          v-model
          <select v-model="region">
            <option :value="null">— nessuna —</option>
            <option v-for="r in regions" :key="r.id" :value="r.id">{{ r.name }}</option>
          </select>
        </label>
        <p class="current">{{ name ?? 'Nessuna regione selezionata' }}</p>
        <pre>{{ log.join('\n') || 'Eventi @select…' }}</pre>
      </aside>
    </section>

    <section>
      <h2>Installazione</h2>
      <pre>npm install vue-italy-map</pre>
      <h2>Uso</h2>
      <pre>&lt;script setup&gt;
import { ref } from 'vue'
import { ItalyMap } from 'vue-italy-map'
import 'vue-italy-map/style.css'

const region = ref(null)
&lt;/script&gt;

&lt;template&gt;
  &lt;ItalyMap v-model="region" @select="r =&gt; console.log(r.name)" /&gt;
&lt;/template&gt;</pre>
      <h2>Personalizzazione</h2>
      <pre>.italy-map {
  --italy-map-fill: #d4d4d8;
  --italy-map-hover: #a1a1aa;
  --italy-map-active: #16a34a;
  --italy-map-stroke: #fff;
  --italy-map-stroke-width: 1;
}</pre>
    </section>
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
  --bg: #fafafa;
  --fg: #18181b;
  --muted: #71717a;
  --card: #fff;
  --border: #e4e4e7;
  font-family: system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #09090b;
    --fg: #fafafa;
    --muted: #a1a1aa;
    --card: #18181b;
    --border: #27272a;
  }
  .italy-map {
    --italy-map-fill: #3f3f46;
    --italy-map-hover: #71717a;
    --italy-map-stroke: #09090b;
  }
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
}
main {
  max-width: 960px;
  margin: auto;
  padding: 2rem 16px;
}
h1 {
  margin: 0 0 0.5rem;
}
p {
  color: var(--muted);
}
a {
  color: inherit;
}
.demo {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: start;
  margin: 2rem 0;
}
.map {
  aspect-ratio: 728 / 864;
  max-height: 80vh;
}
aside {
  display: grid;
  gap: 1rem;
  position: sticky;
  top: 1rem;
}
label {
  display: grid;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--muted);
}
select {
  font: inherit;
  padding: 0.4rem;
}
.current {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--fg);
  margin: 0;
}
pre {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.8rem;
}
@media (max-width: 700px) {
  .demo {
    grid-template-columns: 1fr;
  }
  aside {
    position: static;
  }
}
</style>
