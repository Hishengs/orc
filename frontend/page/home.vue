<template>
  <div id="home">
    <action-bar></action-bar>
    <Row class="main">
      <!-- 菜单 -->
      <Col span="3" class="menu-panel panel">
        <tree-menu @on-file-select="onFileSelect"></tree-menu>
      </Col>
      <!-- 编辑面板 -->
      <Col span="21" class="edit-panel panel">
        <div id="editormd">
          <textarea style="display:none;">开始你的 markdown 之旅</textarea>
        </div>
      </Col>
      <!-- 预览面板 -->
      <!-- <Col span="10" class="preview-panel panel">
        预览面板
      </Col> -->
    </Row>
    <!-- <a class="title" href="https://github.com/Hishengs/quick-vue-spa" target="_blank">Quick Vue SPA</a> -->
  </div>
</template>

<script>
  import actionBar from './action-bar.vue';
  import treeMenu from './tree-menu.vue';
  export default {
    name: 'home',
    components: {
      treeMenu,
      actionBar,
    },
    data (){
      return {
        editor: null,
      };
    },
    mounted (){
      this.editor = editormd("editormd", {
        path : "http://localhost:8001/static/libs/editor.md/lib/",
      });
    },
    methods: {
      onFileSelect (fileContent){
        console.log('>>> home.onFileSelect', fileContent);
        this.editor.setValue(fileContent);
      },
    }
  };
</script>

<style lang= "less">
  #home {
    height: 100%;
    margin-bottom: -51px;
    .main {
      height: 100%;
      .panel {
        height: 100%;
      }
      .menu-panel {
        /**/
      }
      .edit-panel {
        /*margin: -1px;*/
        .editormd {
          border: none;
          margin-bottom: 0;
        }
        .CodeMirror-scroll {
          padding: 0;
          margin-bottom: 0;
        }
      }
      /* .edit-panel, .preview-panel {
        padding: 10px;
      }
      .preview-panel {
        border-left: 1px solid #dfdfdf;
      } */
    }
  }
</style>
