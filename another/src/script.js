import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//Lights
const ambientlight = new THREE.AmbientLight(0xffffff,1.5)
scene.add(ambientlight)

//point lgihts
const pointlight = new THREE.PointLight(0xffffff,50)
scene.add(pointlight)

pointlight.position.x = 2
pointlight.position.y = 3
pointlight.position.z = 4

//material
const material = new THREE.MeshStandardMaterial()

//objects

const cubegeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
const cube = new THREE.Mesh(cubegeometry,material)
scene.add(cube)

//sphhere
const spheregeometry = new THREE.SphereGeometry(0.5, 32, 32)
const sphere = new THREE.Mesh(spheregeometry,material)
scene.add(sphere)
sphere.position.x = -1.5

//torus
const torusgeometry = new THREE.TorusGeometry(0.3,0.2,32,64)
const donut = new THREE.Mesh(torusgeometry,material)
scene.add(donut)
donut.position.x = 1.5

//planesurface
const planegeometery = new THREE.PlaneGeometry(5,5,5)
const plane = new THREE.Mesh(planegeometery,material)
scene.add(plane)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

//size
const size = {
     width : window.innerWidth,
     height : window.innerHeight
}

//resize
window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)

})

//camera
const camera = new THREE.PerspectiveCamera(75,size.width / size.height)
camera.position.z = 3
scene.add(camera)

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(size.width,size.height)

const clock = new THREE.Clock()

//tick
const tick = () => {

    const elapsed = clock.getElapsedTime()
    cube.rotation.x = elapsed * 0.5
    cube.rotation.y = elapsed * 0.5

    sphere.rotation.x = elapsed * 0.5
    sphere.rotation.y = elapsed * 0.5

    donut.rotation.x = elapsed * 0.5
    donut.rotation.y = elapsed * 0.5

    controls.update()
    renderer.render(scene,camera)
      window.requestAnimationFrame(tick)
}
tick()