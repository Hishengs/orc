<template>
  <Poptip trigger="hover" :title="dir.name" placement="right" class="recursive-poptip-menu" v-if="dir">
    <p>{{ dir.name }}</p>
    <div slot="content">
      <Menu theme="dark" @on-select="onFileSelect">
        <MenuItem :name="subdir.name" v-for="subdir in dir.content" :key="subdir.name">
          <recursive-poptip-menu v-if="subdir.isDir" :dir="subdir"></recursive-poptip-menu>
          <p v-else>{{ subdir.name }}</p>
        </MenuItem>
      </Menu>
    </div>
  </Poptip>
</template>

<script>
  import recursivePoptipMenu from './recursive-poptip-menu.vue';
  export default {
    name: 'recursive-poptip-menu',
    components: {
      recursivePoptipMenu,
    },
    props: {
      dir: {
        type: Object,
        default: () => {
          return null;
        },
      },
    },
    methods: {
      onFileSelect (name){
        console.log('>>> onFileSelect', name);
      },
    }
  };
</script>

<style lang= "less">
  .recursive-poptip-menu {
    /**/
  }
</style>