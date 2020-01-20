<template>
  <div>
    <router-view :style="{minHeight: getHeight() }" />
  </div>
</template>

<script>
const Top = resolve => {
  require(["@/components/Top"], resolve);
};
const Footer = resolve => {
  require(["@/components/Footer"], resolve);
};

export default {
  components: {
    "v-top": Top,
    "v-footer": Footer
  },
  data() {
    return {};
  },
   methods: {
    getHeight() {
      var cHeight =  document.documentElement.clientHeight
      var bHeight = cHeight - 271
      return bHeight + 'px'
    }
  }
};
</script>

<style>
</style>


