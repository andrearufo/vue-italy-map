import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ItalyMap, regions } from './index.js'

describe('regions', () => {
  it('has 20 unique regions with path data', () => {
    expect(regions).toHaveLength(20)
    expect(new Set(regions.map((r) => r.id)).size).toBe(20)
    for (const r of regions) {
      expect(r.name).toBeTruthy()
      expect(r.d).toMatch(/^M/)
    }
  })

  it('matches RegionId in index.d.ts', () => {
    const dts = readFileSync('src/index.d.ts', 'utf8')
    const block = dts.match(/type RegionId =([^]*?)\n\n/)[1]
    const typed = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1])
    expect(typed.sort()).toEqual(regions.map((r) => r.id).sort())
  })
})

describe('ItalyMap', () => {
  const path = (w, id) => w.find(`[data-region="${id}"]`)

  it('renders one accessible button per region', () => {
    const w = mount(ItalyMap)
    const paths = w.findAll('path')
    expect(paths).toHaveLength(20)
    expect(paths[0].attributes()).toMatchObject({ role: 'button', tabindex: '0', 'aria-pressed': 'false' })
    expect(path(w, 'lazio').attributes('aria-label')).toBe('Lazio')
  })

  it('reflects modelValue', async () => {
    const w = mount(ItalyMap, { props: { modelValue: 'sicilia' } })
    expect(path(w, 'sicilia').classes()).toContain('is-active')
    expect(path(w, 'sicilia').attributes('aria-pressed')).toBe('true')
    await w.setProps({ modelValue: null })
    expect(w.findAll('.is-active')).toHaveLength(0)
  })

  it.each([
    ['click', (p) => p.trigger('click')],
    ['Enter', (p) => p.trigger('keydown', { key: 'Enter' })],
    ['Space', (p) => p.trigger('keydown', { key: ' ' })],
  ])('selects on %s', async (_, act) => {
    const w = mount(ItalyMap)
    await act(path(w, 'veneto'))
    expect(w.emitted('update:modelValue')).toEqual([['veneto']])
    expect(w.emitted('select')).toEqual([[{ id: 'veneto', name: 'Veneto' }]])
  })

  it('ignores other keys', async () => {
    const w = mount(ItalyMap)
    await path(w, 'veneto').trigger('keydown', { key: 'a' })
    expect(w.emitted('select')).toBeUndefined()
  })
})
