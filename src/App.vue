<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script></script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

// nprogress进度条---自定义进度条颜色
#nprogress .bar {
  background: #ff8099 !important; //自定义颜色
  height: 3px !important;
}
</style>
