<template>
  <div class="flex navbar">
    <div class="flex flex-center">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <breadcrumb class="ml-4" />
    </div>

    <div class="flex pr-4">
      <div class="mr-4"><el-badge type="primary" :value="50"><el-link class="px-4" :underline="false"><i class="el-icon-document" />事项</el-link></el-badge></div>
      <div class="mr-4"><el-badge type="success" :value="12"><el-link class="px-4" :underline="false"><i class="el-icon-date" />日程</el-link></el-badge></div>
      <div class="mr-6"><el-badge type="danger" :value="3"><el-link class="px-4" :underline="false"><i class="el-icon-bell" />消息</el-link></el-badge></div>
      <el-dropdown class="top-4px" trigger="hover">
        <div class="avatar-wrapper">
          <i class="el-icon-user user-avatar" />
          <span>{{ userInfo.realName }}</span>
          <i class="el-icon-caret-bottom" />
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
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

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
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

$boxItemBgColor: red;

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
