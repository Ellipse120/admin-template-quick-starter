<template>
  <el-header style="padding: 0; height: 56px;">
    <div class="flex h-56px bg-header items-center justify-between">
      <router-link to="/">
        <div class="flex items-center text-white">
          <div class="logo h-56px w-56px bg-cover bg-no-repeat" />
          <h1 class="tracking-wide text-2xl">{{ title }}</h1>
        </div>
      </router-link>

      <div class="text-white">
        <div class="flex h-56px bg-header items-center justify-between">
          <el-menu
            mode="horizontal"
            :default-active="activeMenu"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :unique-opened="false"
          >
            <div class="flex">
              <sidebar-item-new v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </div>
          </el-menu>

          <header-user />
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { title } from '@/project-config.js'
import path from 'path'
import { mapGetters } from 'vuex'
import SidebarItemNew from './Sidebar/SidebarItemOfVertical'
import variables from '@/styles/variables.scss'
import { isExternal } from '@/utils/validate'
import HeaderUser from './Sidebar/Header'

export default {
  name: 'NavBar',
  components: {
    SidebarItemNew,
    HeaderUser
  },
  data () {
    return {
      title,
      onlyOneChild: null,
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    activeMenu () {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    }
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child, the child is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>
  .logo {
    background-image: url('~@/assets/images/logo.png');
  }
</style>
