<template>
  <div class="flex navbar">
    <div class="flex flex-center">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="ml-4" />
    </div>

    <div class="flex gap-4 pr-4">
      <div><el-badge type="primary" :value="50"><el-link class="p-2 text-4" :underline="false"><i class="el-icon-document" />事项</el-link></el-badge></div>
      <div><el-badge type="success" :value="12"><el-link class="p-2 text-4" :underline="false"><i class="el-icon-date" />日程</el-link></el-badge></div>
      <div><el-badge type="danger" :value="3"><el-link class="p-2 text-4" :underline="false"><i class="el-icon-bell" />消息</el-link></el-badge></div>
      <el-dropdown class="top-4px" trigger="hover">
        <div>
          <i class="el-icon-user text-6" />
          <span>{{ userInfo.realName }}</span>
          <i class="el-icon-caret-bottom text-4" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>主页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout () {
      await this.$store.dispatch('user/logout')
      await this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

.avatar-container {
  top: 2px;
}

.navbar {
  height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}
</style>
