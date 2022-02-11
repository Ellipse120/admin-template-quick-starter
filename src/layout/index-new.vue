<template>
  <div>
    <div>
      <navbar-new />
    </div>
    <div>
      <breadcrumb />
    </div>

    <app-main />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

import { AppMain, NavbarNew } from './components'

export default {
  name: 'NewLayout',
  components: {
    AppMain,
    NavbarNew,
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  &.mobile.openSidebar{
     position: fixed;
     top: 0;
   }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 100%;
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
</style>
