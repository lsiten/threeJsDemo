<template>
  <div id="wrapper">
    <div ref="testTree"></div>
  </div>
</template>

<script>
  import { WebGLRenderer, PerspectiveCamera, PCFShadowMap, PointLight, AmbientLight, Scene } from 'three'
  export default {
    name: 'landing-page',
    mounted () {
      this.createCamera()
      this.createRender()
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      // 创建场景
      createScene () {
        this.scene = new Scene()
      },
      // 创建render
      createCamera () {
        let camera = new PerspectiveCamera(90, 400 / 200, 0.1, 1000)
        camera.position.x = 0
        camera.position.z = 0
        camera.speed = {
          z: 0,
          x: 0
        }
        this.camera = camera
      },
      // 创建render
      createRender () {
        let render = new WebGLRenderer()
        render.setPixelRatio(window.devicePixelRatio)
        render.setSize(400, 200)
        render.setClearColor(0x0077ec, 1)
        render.shadowMap.enabled = true
        render.shadowMap.type = PCFShadowMap
        this.render = render
        this.$refs.testTree.appendChild(render.domElement)
      },
      //  创建光线
      createLight () {
        let pointLight = new PointLight(0xccbbaa, 1, 0, 0)
        pointLight.position.set(-10, 20, -20)
        pointLight.castShadow = true
        let light = new AmbientLight(0xccbbaa, 0.1)
        this.scene.add(pointLight)
        this.scene.add(light)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
