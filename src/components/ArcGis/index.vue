<template>
  <div />
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  name: 'WebMap',
  mounted () {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
      .then(([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({
          basemap: 'topo-vector'
        })

        this.view = new MapView({
          container: this.$el,
          map: map,
          center: [-118, 34],
          zoom: 8
        })
      })
  },
  beforeDestroy () {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  }
}

</script>

<style scoped>
  div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
