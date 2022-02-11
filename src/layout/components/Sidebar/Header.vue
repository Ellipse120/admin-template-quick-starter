<template>
  <div>
    <el-divider direction="vertical" />
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link mr-5">{{ userInfo && userInfo.loginName }}<i class="el-icon-arrow-down el-icon--right" /></span>
      <el-dropdown-menu slot="dropdown">
        <!--        <el-dropdown-item command="editUser" class="mx-2">修改资料</el-dropdown-item>-->
        <!--        <el-dropdown-item command="editLogo" class="mx-2">修改头像</el-dropdown-item>-->
        <!--        <el-dropdown-item command="editPassword" class="mx-2">修改密码</el-dropdown-item>-->
        <el-dropdown-item command="logout" class="mx-2">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeaderUserFunctionality',
  data: function () {
    return {
      unreadMessagesCount: 1
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
  },
  methods: {
    handleCommand (command) {
      const arr = ['editUser', 'editLogo', 'editPassword', 'logout']
      arr.forEach((item) => {
        if (command === item) {
          this[item]()
        }
      })
    },
    async editUser () {
      console.log('111')
    },

    async editLogo () {
      console.log('222')
    },

    async editPassword () {
      console.log('333')
    },

    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
</style>

<style lang="scss" scoped>
</style>
