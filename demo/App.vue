<script setup>
import { ref, computed } from 'vue'
import { ItalyMap, regions } from '../src/index.js'

const region = ref(null)
const log = ref([])
const name = computed(() => regions.find((r) => r.id === region.value)?.name)
const active = ref('#16a34a')
const copied = ref(false)

function onSelect(r) {
  log.value = [`select → ${JSON.stringify(r)}`, ...log.value].slice(0, 4)
}

async function copy() {
  await navigator.clipboard.writeText('npm install github:andrearufo/vue-italy-map')
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <main :style="{ '--accent': active, '--italy-map-active': active }">
    <header class="hero">
      <span class="flag" aria-hidden="true"><i /><i /><i /></span>
      <h1>vue-italy-map</h1>
      <p class="lead">
        Componente Vue 3 con la mappa SVG interattiva delle 20 regioni italiane.
        <code>v-model</code>, accessibile da tastiera, stile via variabili CSS.
      </p>
      <div class="actions">
        <button class="install" @click="copy">
          <span>$ npm i github:andrearufo/vue-italy-map</span>
          <small>{{ copied ? 'Copiato ✓' : 'Copia' }}</small>
        </button>
        <a class="btn" href="https://github.com/andrearufo/vue-italy-map">GitHub</a>
      </div>
    </header>

    <section class="demo">
      <div class="card map">
        <ItalyMap v-model="region" @select="onSelect" />
      </div>

      <aside class="card panel">
        <div>
          <p class="label">Regione selezionata</p>
          <p class="current" :class="{ empty: !name }">{{ name ?? 'Nessuna' }}</p>
          <p class="hint">Clicca la mappa o usa <kbd>Tab</kbd> + <kbd>Invio</kbd></p>
        </div>

        <div>
          <p class="label">v-model</p>
          <div class="chips">
            <button
              v-for="r in regions"
              :key="r.id"
              :class="{ on: region === r.id }"
              :aria-pressed="region === r.id"
              @click="region = region === r.id ? null : r.id"
            >
              {{ r.name }}
            </button>
          </div>
        </div>

        <label class="color">
          <span class="label">--italy-map-active</span>
          <input v-model="active" type="color" />
          <code>{{ active }}</code>
        </label>

        <div>
          <p class="label">Eventi @select</p>
          <pre class="log">{{ log.join('\n') || '—' }}</pre>
        </div>
      </aside>
    </section>

    <section class="docs">
      <div>
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
      </div>
      <div>
        <h2>Personalizzazione</h2>
        <pre>.italy-map {
  --italy-map-fill: #d4d4d8;
  --italy-map-hover: #a1a1aa;
  --italy-map-active: #16a34a;
  --italy-map-stroke: #fff;
  --italy-map-stroke-width: 1;
}

/* singola regione */
.italy-map [data-region="sicilia"] { fill: orange; }</pre>
      </div>
    </section>

    <footer>GPL-3.0 · Andrea Rufo</footer>
  </main>
</template>

<style>
:root {
  color-scheme: light dark;
  --bg: #f4f4f5;
  --fg: #18181b;
  --muted: #71717a;
  --card: #fff;
  --border: #e4e4e7;
  --accent: #16a34a;
  font-family: ui-sans-serif, system-ui, sans-serif;
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
    --italy-map-stroke: #18181b;
  }
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
}
main {
  max-width: 1040px;
  margin: auto;
  padding: 3rem 16px;
}
a {
  color: inherit;
}
code,
pre,
kbd,
.install {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* hero */
.hero {
  text-align: center;
  margin-bottom: 2.5rem;
}
.flag {
  display: inline-flex;
  border-radius: 4px;
  overflow: hidden;
}
.flag i {
  width: 14px;
  height: 20px;
}
.flag i:nth-child(1) {
  background: #009246;
}
.flag i:nth-child(2) {
  background: #fff;
}
.flag i:nth-child(3) {
  background: #ce2b37;
}
h1 {
  font-size: clamp(2rem, 6vw, 3rem);
  letter-spacing: -0.03em;
  margin: 0.75rem 0 0.5rem;
}
.lead {
  color: var(--muted);
  max-width: 560px;
  margin: 0 auto 1.5rem;
  line-height: 1.5;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}
.install,
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--fg);
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
}
.install {
  background: var(--fg);
  color: var(--bg);
  border-color: var(--fg);
}
.install small {
  opacity: 0.6;
}
.btn:hover {
  border-color: var(--muted);
}

/* demo */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
}
.demo {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1rem;
  align-items: start;
}
.map {
  min-width: 0;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
}
.map .italy-map {
  width: auto;
  height: min(75vh, 680px);
  max-width: 100%;
}
.panel {
  min-width: 0;
  display: grid;
  gap: 1.5rem;
  padding: 1.25rem;
  position: sticky;
  top: 1rem;
}
.label {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}
.current {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--accent);
}
.current.empty {
  color: var(--muted);
}
.hint {
  font-size: 0.8rem;
  color: var(--muted);
  margin: 0.25rem 0 0;
}
kbd {
  font-size: 0.75em;
  padding: 0.1em 0.4em;
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: 4px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.chips button {
  font: inherit;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg);
  cursor: pointer;
}
.chips button:hover {
  border-color: var(--muted);
}
.chips button.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.color {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.color .label {
  margin: 0;
  flex: 1;
  text-transform: none;
  letter-spacing: 0;
  font-family: ui-monospace, Menlo, monospace;
}
.color input {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
.color code {
  font-size: 0.8rem;
  color: var(--muted);
}
pre {
  margin: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.5;
}
.log {
  min-height: 3.5rem;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.7rem;
  color: var(--muted);
}

/* docs */
.docs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3rem;
}
.docs > div {
  min-width: 0;
}
h2 {
  font-size: 1rem;
  margin: 0 0 0.75rem;
}
.docs pre {
  background: var(--card);
}
footer {
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  margin-top: 3rem;
}

@media (max-width: 760px) {
  .install {
    font-size: 0.7rem;
    white-space: nowrap;
  }
  .demo,
  .docs {
    grid-template-columns: 1fr;
  }
  .panel {
    position: static;
  }
  .map .italy-map {
    width: 100%;
    height: auto;
  }
}
</style>
