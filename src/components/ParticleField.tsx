import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'
import { buildShapes, type ShapeName } from '../lib/shapes'
import { gsap, isTouch, reducedMotion } from '../lib/gsap'
import './ParticleField.css'

const VERT = /* glsl */ `
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aRand;
uniform float uMix;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform vec3 uMouse;
uniform float uMouseForce;
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;

void main() {
    // Each particle starts its trip a little later than the last, so shapes
    // dissolve and re-form instead of sliding as one block.
    float t = clamp(uMix * 1.5 - aRand * 0.5, 0.0, 1.0);
    t = t * t * (3.0 - 2.0 * t);
    vec3 p = mix(aFrom, aTo, t);

    // Idle drift
    p += 0.035 * vec3(
        sin(uTime * 0.7 + aRand * 40.0),
        cos(uTime * 0.6 + aRand * 31.0),
        sin(uTime * 0.5 + aRand * 23.0)
    );

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Push away from the pointer
    vec3 d = world.xyz - uMouse;
    float dist = length(d);
    world.xyz += normalize(d + 0.0001) * uMouseForce * smoothstep(1.4, 0.0, dist) * 0.7;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) / -mv.z;

    // Mostly ice-cyan, a few white sparks, rare amber markers
    vec3 cyan = vec3(0.44, 0.89, 1.0);
    vec3 white = vec3(0.86, 0.95, 1.0);
    vec3 amber = vec3(1.0, 0.69, 0.18);
    vColor = aRand > 0.975 ? amber : mix(cyan, white, step(0.82, aRand));
    vAlpha = clamp(1.25 - (-mv.z - 3.5) * 0.18, 0.15, 1.0) * uOpacity;
}
`

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vAlpha * 0.9);
}
`

type Pose = { x: number; y: number; rx: number; rz: number; spin: number; o?: number }

/** Where each shape sits in the frame. Desktop puts the hero sphere to the right of the name. */
const POSES: Record<ShapeName, (wide: boolean) => Pose> = {
    sphere: (w) => ({ x: w ? 2.3 : 0, y: w ? 0.15 : 0.9, rx: 0.25, rz: 0.12, spin: 0.06 }),
    wave: () => ({ x: 0, y: 0.2, rx: 0.42, rz: 0, spin: 0, o: 0.75 }),
    lattice: (w) => ({ x: w ? 2.4 : 0, y: 0, rx: 0.5, rz: 0.3, spin: 0.09, o: 0.55 }),
    helix: () => ({ x: 0, y: 0, rx: 0.2, rz: -0.18, spin: 0, o: 0.6 }),
    ring: () => ({ x: 0, y: -0.2, rx: 1.12, rz: 0.08, spin: 0.05 }),
}

/**
 * Fixed WebGL backdrop: a cloud of particles that re-forms into a different
 * shape for each section marked with `data-shape`, and parts around the pointer.
 */
export default function ParticleField() {
    const host = useRef<HTMLDivElement>(null)
    const { pathname } = useLocation()
    const rescan = useRef<() => void>(() => {})

    useEffect(() => {
        const el = host.current
        if (!el) return

        let renderer: THREE.WebGLRenderer
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
        } catch {
            return // no WebGL: the page still works, just without the backdrop
        }

        const touch = isTouch()
        const still = reducedMotion()
        const count = touch || window.innerWidth < 800 ? 4200 : 9000
        const dpr = Math.min(window.devicePixelRatio, 1.5)

        renderer.setPixelRatio(dpr)
        renderer.setClearColor(0x000000, 0)
        el.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
        camera.position.set(0, 0, 9)

        const shapes = buildShapes(count)
        const geometry = new THREE.BufferGeometry()
        const from = new Float32Array(shapes.sphere)
        const to = new Float32Array(shapes.sphere)
        const rnd = new Float32Array(count)
        for (let i = 0; i < count; i++) rnd[i] = Math.random()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(shapes.sphere), 3))
        geometry.setAttribute('aFrom', new THREE.BufferAttribute(from, 3))
        geometry.setAttribute('aTo', new THREE.BufferAttribute(to, 3))
        geometry.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1))

        const uniforms = {
            uMix: { value: 1 },
            uTime: { value: 0 },
            uSize: { value: touch ? 34 : 30 },
            uPixelRatio: { value: dpr },
            uMouse: { value: new THREE.Vector3(99, 99, 0) },
            uMouseForce: { value: 0 },
            uOpacity: { value: 1 },
        }
        const material = new THREE.ShaderMaterial({
            vertexShader: VERT,
            fragmentShader: FRAG,
            uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
        const points = new THREE.Points(geometry, material)
        points.frustumCulled = false
        const group = new THREE.Group()
        group.add(points)
        scene.add(group)

        const wide = () => window.innerWidth > 900
        let current: ShapeName = 'sphere'
        const applyPose = (shape: ShapeName, immediate = false) => {
            const p = POSES[shape](wide())
            const d = immediate ? 0 : 1.8
            gsap.to(group.position, { x: p.x, y: p.y, duration: d, ease: 'power3.inOut' })
            gsap.to(group.rotation, { x: p.rx, z: p.rz, duration: d, ease: 'power3.inOut' })
            gsap.to(uniforms.uOpacity, { value: p.o ?? 1, duration: d, ease: 'power2.inOut' })
            spin = p.spin
        }
        let spin = POSES.sphere(wide()).spin
        applyPose('sphere', true)

        // Morph from wherever the particles are right now (even mid-transition) to the new shape.
        const morphTo = (shape: ShapeName) => {
            if (shape === current) return
            current = shape
            const m = uniforms.uMix.value
            for (let i = 0; i < count; i++) {
                let t = Math.min(Math.max(m * 1.5 - rnd[i] * 0.5, 0), 1)
                t = t * t * (3 - 2 * t)
                for (let k = 0; k < 3; k++) {
                    const j = i * 3 + k
                    from[j] = from[j] + (to[j] - from[j]) * t
                }
            }
            to.set(shapes[shape])
            geometry.attributes.aFrom.needsUpdate = true
            geometry.attributes.aTo.needsUpdate = true
            uniforms.uMix.value = 0
            gsap.to(uniforms.uMix, { value: 1, duration: still ? 0 : 2.2, ease: 'power2.inOut', overwrite: true })
            applyPose(shape, still)
        }

        // Pick the section nearest the middle of the viewport.
        let zones: HTMLElement[] = []
        rescan.current = () => {
            zones = Array.from(document.querySelectorAll<HTMLElement>('[data-shape]'))
        }
        rescan.current()
        const pickShape = () => {
            if (!zones.length || !zones[0].isConnected) rescan.current()
            const mid = window.innerHeight * 0.55
            let chosen: ShapeName = 'sphere'
            for (const z of zones) {
                if (z.getBoundingClientRect().top < mid) chosen = z.dataset.shape as ShapeName
            }
            morphTo(chosen)
        }

        const resize = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            renderer.setSize(w, h)
            camera.aspect = w / h
            camera.position.z = w < 700 ? 12 : 9
            camera.updateProjectionMatrix()
            applyPose(current, true)
        }
        resize()
        window.addEventListener('resize', resize)

        // Pointer -> point on the z=0 plane
        const ray = new THREE.Raycaster()
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
        const ndc = new THREE.Vector2()
        const hit = new THREE.Vector3()
        const look = { x: 0, y: 0 }
        const move = (e: PointerEvent) => {
            ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
            ray.setFromCamera(ndc, camera)
            if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.copy(hit)
            look.x = ndc.x
            look.y = ndc.y
            gsap.to(uniforms.uMouseForce, { value: 1, duration: 0.4, overwrite: true })
        }
        const leave = () => gsap.to(uniforms.uMouseForce, { value: 0, duration: 0.8, overwrite: true })
        if (!touch && !still) {
            window.addEventListener('pointermove', move)
            document.addEventListener('pointerleave', leave)
        }

        let lastY = window.scrollY
        let velocity = 0
        let last = performance.now()
        let frame = 0
        let running = true

        const tick = () => {
            if (!running) return
            frame = requestAnimationFrame(tick)
            const now = performance.now()
            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            const y = window.scrollY
            velocity += ((y - lastY) - velocity) * 0.1
            lastY = y
            pickShape()
            if (!still) {
                uniforms.uTime.value += dt
                group.rotation.y += dt * spin + velocity * 0.0008
                camera.position.x += (look.x * 0.35 - camera.position.x) * 0.04
                camera.position.y += (look.y * 0.25 - camera.position.y) * 0.04
                camera.lookAt(0, 0, 0)
            }
            renderer.render(scene, camera)
        }
        tick()

        const visibility = () => {
            if (document.hidden) {
                running = false
                cancelAnimationFrame(frame)
            } else if (!running) {
                running = true
                last = performance.now()
                tick()
            }
        }
        document.addEventListener('visibilitychange', visibility)

        return () => {
            running = false
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', resize)
            window.removeEventListener('pointermove', move)
            document.removeEventListener('pointerleave', leave)
            document.removeEventListener('visibilitychange', visibility)
            gsap.killTweensOf([uniforms.uMix, uniforms.uMouseForce, uniforms.uOpacity, group.position, group.rotation])
            geometry.dispose()
            material.dispose()
            renderer.dispose()
            renderer.domElement.remove()
        }
    }, [])

    // New page, new sections: look for shape zones again once it has rendered.
    useEffect(() => {
        const id = window.setTimeout(() => rescan.current(), 60)
        return () => window.clearTimeout(id)
    }, [pathname])

    return <div className="particle-field" ref={host} aria-hidden="true" />
}
