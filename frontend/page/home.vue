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
        <span class="save-status" v-show="saver.show">{{ saver.text }}</span>
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
        editingFile: {
          path: null,
          content: null,
        },
        saver: {
          ins: null,
          interval: 1 * 20 * 1000, // 一分钟保存一次
          show: false,
          text: 'xxx',
        },
      };
    },
    mounted (){
      window.editor = this.editor = editormd("editormd", {
        path : "http://localhost:8001/static/libs/editor.md/lib/",
        emoji: true,
        toolbarIcons: function(){
          return [
            'bold', 'del', 'italic', '|',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|',
            'hr', 'quote', 'list-ul', 'list-ol', '|', 
            'link', 'code', /*'image',*/ 'emoji',  '|',
            'watch', 'preview', 'fullscreen', 
          ];
        },
      });
      this.startSaver();
    },
    beforeDestory (){
      clearInterval(this.saver.ins);
    },
    methods: {
      onFileSelect (file){
        console.log('>>> home.onFileSelect', file);
        this.editingFile.path = null;
        this.api.file.fetch(file.path).then(res => {
          console.log('>>> 获取文件', res);
          if(res.data.err.level < 3){
            this.editingFile.path = file.path;
            this.editingFile.content = res.data.data;
            this.editor.setValue(this.editingFile.content);
          }
        });
      },
      startSaver (){
        // 定时保存当前文件
        this.saver.ins = setInterval(() => {
          this.editingFile.content = this.editor.getValue();
          console.log('>>> 定时保存', this.editingFile.path, this.editingFile.content);
          if(this.editingFile.path && this.editingFile.content){
            this.api.file.save(this.editingFile.path, this.editingFile.content).then(res => {
              console.log('>>> 保存文件', res);
              if(res.data.err.level < 3){
                this.saver.show = true;
                this.saver.text = '保存于 ' + new Date().toLocaleString();
                setTimeout(() => {
                  this.saver.show = false;
                }, 10 * 1000);
              }
            });
          }
        }, this.saver.interval);
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
        position: relative;
        .save-status {
          position: absolute;
          right: 20px;
          top: 0;
          display: inline-block;
          line-height: 38px;
          z-index: 999;
        }
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
