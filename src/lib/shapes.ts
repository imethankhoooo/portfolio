/**
 * Point-cloud targets for the particle field. Every generator returns exactly
 * `n` points (xyz triplets) so any shape can morph into any other.
 */
export type ShapeName = 'sphere' | 'wave' | 'lattice' | 'helix' | 'ring'

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function sphere(n: number) {
    const out = new Float32Array(n * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    const shell = Math.floor(n * 0.78)
    for (let i = 0; i < n; i++) {
        let x: number, y: number, z: number
        if (i < shell) {
            // Fibonacci lattice: an even skin of points, like a planet scan
            y = 1 - (i / (shell - 1)) * 2
            const r = Math.sqrt(1 - y * y)
            const t = golden * i
            x = Math.cos(t) * r
            z = Math.sin(t) * r
            const R = 2.1
            x *= R; y *= R; z *= R
        } else {
            // Loose core and a thin orbit band for depth
            if (Math.random() < 0.55) {
                const r = rand(0.4, 1.5)
                const u = Math.random() * Math.PI * 2
                const v = Math.acos(rand(-1, 1))
                x = r * Math.sin(v) * Math.cos(u)
                y = r * Math.cos(v)
                z = r * Math.sin(v) * Math.sin(u)
            } else {
                const a = Math.random() * Math.PI * 2
                const r = rand(2.9, 3.15)
                x = Math.cos(a) * r
                y = rand(-0.03, 0.03)
                z = Math.sin(a) * r
                // tilt the band
                const ty = y * Math.cos(0.45) - z * Math.sin(0.45)
                const tz = y * Math.sin(0.45) + z * Math.cos(0.45)
                y = ty; z = tz
            }
        }
        out.set([x, y, z], i * 3)
    }
    return out
}

function wave(n: number) {
    const out = new Float32Array(n * 3)
    const cols = Math.ceil(Math.sqrt(n * 1.8))
    const rows = Math.ceil(n / cols)
    for (let i = 0; i < n; i++) {
        const c = i % cols
        const r = Math.floor(i / cols)
        const x = (c / (cols - 1) - 0.5) * 12
        const z = (r / (rows - 1) - 0.5) * 7
        const y = Math.sin(x * 0.9) * 0.35 + Math.cos(z * 1.3 + x * 0.4) * 0.3 - 1.2
        out.set([x, y, z], i * 3)
    }
    return out
}

function lattice(n: number) {
    const out = new Float32Array(n * 3)
    const cells = 3
    const size = 3.6
    const step = size / cells
    const half = size / 2
    for (let i = 0; i < n; i++) {
        // pick a random edge of a 3x3x3 grid and drop the point somewhere on it
        const axis = Math.floor(Math.random() * 3)
        const a = Math.floor(Math.random() * (cells + 1)) * step - half
        const b = Math.floor(Math.random() * (cells + 1)) * step - half
        const t = Math.random() * size - half
        const p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t]
        const j = 0.012
        out.set([p[0] + rand(-j, j), p[1] + rand(-j, j), p[2] + rand(-j, j)], i * 3)
    }
    return out
}

function helix(n: number) {
    const out = new Float32Array(n * 3)
    const len = 10
    const turns = 3.2
    for (let i = 0; i < n; i++) {
        const u = Math.random()
        const x = (u - 0.5) * len
        const angle = u * turns * Math.PI * 2
        let y: number, z: number
        const kind = Math.random()
        if (kind < 0.8) {
            // two strands, half a turn apart
            const phase = kind < 0.4 ? 0 : Math.PI
            const r = 1.05 + rand(-0.05, 0.05)
            y = Math.cos(angle + phase) * r
            z = Math.sin(angle + phase) * r
        } else {
            // rungs between the strands
            const s = rand(-1, 1)
            y = Math.cos(angle) * s
            z = Math.sin(angle) * s
        }
        out.set([x, y, z], i * 3)
    }
    return out
}

function ring(n: number) {
    const out = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        let r: number, y: number
        if (Math.random() < 0.6) {
            // torus body
            const tube = Math.random() * Math.PI * 2
            const tr = 0.22 * Math.sqrt(Math.random())
            r = 2.6 + Math.cos(tube) * tr
            y = Math.sin(tube) * tr
        } else {
            // dust disc
            r = rand(1.4, 4.2)
            y = rand(-0.04, 0.04)
        }
        out.set([Math.cos(a) * r, y, Math.sin(a) * r], i * 3)
    }
    return out
}

const generators: Record<ShapeName, (n: number) => Float32Array> = { sphere, wave, lattice, helix, ring }

export function buildShapes(n: number) {
    const shapes = {} as Record<ShapeName, Float32Array>
    for (const k of Object.keys(generators) as ShapeName[]) shapes[k] = generators[k](n)
    return shapes
}
