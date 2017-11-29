<template>
  <div id="tree-menu">
    <Tree :data="treeData"></Tree>
    <div class="action-bar">
      <!-- <Poptip trigger="click" title="创建文件夹" placement="top">
        <Button type="text" size="small" class="create">创建文件夹</Button>
        <div slot="content">
          <p><Input v-model="newDirName" placeholder="文件夹名称" @on-enter="create"></Input></p>
          <Button type="primary" size="small" class="save" long @click="create">保存</Button>
        </div>
      </Poptip> -->
    </div>
    <!-- 创建文件(夹)弹窗 -->
    <Modal class="file-creator-modal" :title="createFileModal.type === 1 ? '创建文件夹' : '创建文件'" v-model="createFileModal.show">
      <Input v-model="createFileModal.name" :placeholder="createFileModal.type === 1 ? '文件夹名称' : '文件名称'"></Input>
      <div slot="footer">
        <Button type="primary" @click="createFileConfirm">创建</Button>
        <Button type="text" @click="createFileModal.name='';createFileModal.show=false;">取消</Button>
      </div>
    </Modal>
    <Modal class="file-rename-modal" :title="renameFileModal.type === 1 ? '重命名文件夹' : '重命名文件'" v-model="renameFileModal.show">
      <Input v-model="renameFileModal.name" :placeholder="renameFileModal.type === 1 ? '新的文件夹名称' : '新的文件名称'"></Input>
      <div slot="footer">
        <Button type="primary" @click="renameFileConfirm">重命名</Button>
        <Button type="text" @click="renameFileModal.name='';renameFileModal.show=false;">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import recursivePoptipMenu from '../component/recursive-poptip-menu.vue';
  export default {
    name: 'tree-menu',
    components: {
      recursivePoptipMenu,
    },
    computed: {
      treeData (){
        return this.dirs.map(dir => {
          return this.recursiveDir(dir);
        });
      },
    },
    data (){
      return {
        dirs: [
          /*{
            isDir: true,
            name: '前端',
            content: [
              {
                isDir: false,
                name: 'Javascript',
              },
              {
                isDir: false,
                name: 'CSS',
              },
              {
                isDir: false,
                name: 'HTML',
              },
            ],
          },
          {
            isDir: true,
            name: '后端',
            content: [
              {
                isDir: false,
                name: 'Python',
              },
              {
                isDir: true,
                name: 'PHP',
                content: [
                  {
                    name: 'Laravel',
                    isDir: true,
                    content: [
                      {
                        name: 'Laravel-5.4',
                        isDir: false,
                      },
                      {
                        name: 'Laravel-5.5',
                        isDir: false,
                      },
                    ]
                  },
                  {
                    name: 'ThinkPHP',
                    isDir: false,
                  },
                ]
              },
              {
                isDir: false,
                name: 'Node',
              },
            ],
          },
          {
            isDir: true,
            name: '设计',
            content: [],
          },*/
        ],
        newDirName: '',
        createFileModal: {
          show: false,
          type: 1, // 1 文件夹 2 文件
          name: '',
          parentPath: '',
        },
        renameFileModal: {
          show: false,
          type: 1, // 1 文件夹 2 文件
          name: '',
          path: '',
        },
      };
    },
    created (){
      this.traverse();
      // console.log(this.treeData);
    },
    methods: {
      traverse (){
        this.api.directory.traverse().then(res => {
          console.log('>>> traverse [res]', res);
          if(res.data.err.level < 3){
            this.dirs = res.data.data || [];
          }
        });
      },
      create (){
        this.api.directory.create(this.newDirName).then(res => {
          console.log('>>> create [res]', res);
          if(res.data.err.level < 3){
            this.newDirName = '';
            this.$Message.success('创建成功');
            this.traverse();
          }
        });
      },
      onFileSelect (dir){
        console.log('>>> onFileSelect', dir);
        this.$emit('on-file-select', dir.content);
      },
      // 创建文件夹或者文件
      createFile (dir, type){
        this.createFileModal.type = type;
        this.createFileModal.parentPath = dir.path;
        this.createFileModal.name = '';
        this.createFileModal.show = true;
      },
      createFileConfirm (){
        if(this.createFileModal.type === 1){ // 创建文件夹
          this.api.directory.create(this.createFileModal.name, this.createFileModal.parentPath).then(res => {
            console.log('>>> 创建文件夹 [res]', res);
            if(res.data.err.level < 3){
              this.createFileModal.show = false;
              this.createFileModal.name = '';
              this.$Message.success('创建成功');
              this.traverse();
            }else this.$Message.error('创建失败：' + res.data.err.msg);
          });
        }else if(this.createFileModal.type === 2){ // 创建文件
          this.api.file.create(this.createFileModal.name, this.createFileModal.parentPath).then(res => {
            console.log('>>> 创建文件 [res]', res);
            if(res.data.err.level < 3){
              this.createFileModal.show = false;
              this.createFileModal.name = '';
              this.$Message.success('创建成功');
              this.traverse();
            }else this.$Message.error('创建失败：' + res.data.err.msg);
          });
        }
      },
      // 删除文件夹或文件
      removeFile (file){
        if(file.isDir){ // 删除文件夹
          if(file.content && file.content.length){
            this.$Message.error('文件夹不为空，不能删除');
          }else {
            this.$Modal.confirm({
              title: '删除文件夹',
              content: '你确定要删除此文件夹：' + file.name + '？',
              onOk: () => {
                this.api.directory.remove(file.path).then(res => {
                  console.log('>>> 删除文件夹 [res]', res);
                  if(res.data.err.level < 3){
                    this.$Message.success('删除成功');
                    this.traverse();
                  }else this.$Message.error('删除文件夹失败：' + res.data.err.msg);
                });
              },
            });
          }
        }else {
          this.$Modal.confirm({
            title: '删除文件',
            content: '你确定要删除此文件：' + file.name + '？',
            onOk: () => {
              this.api.file.remove(file.path).then(res => {
                console.log('>>> 删除文件 [res]', res);
                if(res.data.err.level < 3){
                  this.$Message.success('删除成功');
                  this.traverse();
                }else this.$Message.error('删除文件失败：' + res.data.err.msg);
              });
            },
          });
        }
      },
      // 重命名文件夹或者文件
      renameFile (dir, type){
        this.renameFileModal.type = type;
        this.renameFileModal.path = dir.path;
        this.renameFileModal.name = dir.name;
        this.renameFileModal.show = true;
      },
      renameFileConfirm (){
        console.log('this.renameFileModal', this.renameFileModal);
        if(this.renameFileModal.type === 1){ // 重命名文件夹
          const newPath = this.renameFileModal.path.split(/[\\,\/]+/).slice(0, -1).join('/') + '/' + this.renameFileModal.name;
          this.api.directory.rename(this.renameFileModal.path, newPath).then(res => {
            console.log('>>> 重命名文件夹 [res]', res);
            if(res.data.err.level < 3){
              this.renameFileModal.show = false;
              this.renameFileModal.name = '';
              this.renameFileModal.path = '';
              this.$Message.success('重命名成功');
              this.traverse();
            }else this.$Message.error('重命名失败：' + res.data.err.msg);
          });
        }else if(this.createFileModal.type === 2){ // 创建文件
          const newPath = this.renameFileModal.path.split(/[\\,\/]+/).slice(0, -1).join('/') + '/' + this.renameFileModal.name;
          this.api.file.rename(this.renameFileModal.path, newPath).then(res => {
            console.log('>>> 重命名文件 [res]', res);
            if(res.data.err.level < 3){
              this.renameFileModal.show = false;
              this.renameFileModal.name = '';
              this.renameFileModal.path = '';
              this.$Message.success('重命名成功');
              this.traverse();
            }else this.$Message.error('重命名失败：' + res.data.err.msg);
          });
        }
      },
      recursiveDir (dir){
        if(dir.isDir){
          return {
            title: dir.name,
            expand: true,
            children: dir.content.map(subDir => {
              return this.recursiveDir(subDir);
            }),
            render: (h, { root, node, data }) => {
              return h('span', {}, [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                dir.name,
                h('Poptip', {
                  props: {
                    trigger: 'hover',
                    placement: 'right',
                  },
                  class: {
                    'extra-action': true,
                  },
                  style: {
                    float: 'right',
                    marginRight: '8px'
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'settings'
                    },
                    class: {
                      'show-action': true,
                    },
                    style: {
                      // display: 'none',
                      color: '#dfdfdf',
                    }
                  }),
                  h('div', {
                    slot: 'content',
                    style: {
                      color: '#444'
                    }
                  }, [
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.createFile(dir, 2);
                        }
                      }
                    }, '新建文件'),
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.createFile(dir, 1);
                        }
                      }
                    }, '新建文件夹'),
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.renameFile(dir, 1);
                        }
                      }
                    }, '重命名文件夹'),
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.removeFile(dir);
                        }
                      }
                    }, '删除文件夹'),
                  ]),
                ]),
              ]);
            }
          };
        }else {
          return {
            title: dir.name,
            render: (h, { root, node, data }) => {
              return h('span', {}, [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: (e) => {
                      // 切换之间要检测是否有未保存文件
                      const tagName = e.target.tagName.toLowerCase();
                      console.log(tagName);
                      if(tagName === 'button'){
                        $('.ivu-tree .ivu-btn').removeClass('selected');
                        $(e.target).addClass('selected');
                      }else if(tagName === 'span'){
                        $('.ivu-tree .ivu-btn').removeClass('selected');
                        $(e.target.parentNode).addClass('selected');
                      }
                      this.onFileSelect(dir);
                    }
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'ios-paper-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  dir.name,
                ]),
                h('Poptip', {
                  props: {
                    trigger: 'hover',
                    placement: 'right',
                  },
                  class: {
                    'extra-action': true,
                  },
                }, [
                  h('Icon', {
                    props: {
                      type: 'settings'
                    },
                    class: {
                      'show-action': true,
                    },
                    style: {
                      display: 'inline-block',
                      color: '#dfdfdf',
                    }
                  }),
                  h('div', {
                    slot: 'content',
                    style: {
                      color: '#444'
                    }
                  }, [
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.renameFile(dir, 2);
                        }
                      }
                    }, '重命名'),
                    h('Button', {
                      props: {
                        type: 'text',
                        size: 'small'
                      },
                      on: {
                        click: () => {
                          this.removeFile(dir);
                        }
                      }
                    }, '删除文件'),
                  ]),
                ]),
              ]);
            }
          };
        }
      },
    }
  };
</script>

<style lang ="less">
  #tree-menu {
    height: 100%;
    position: relative;
    background-color: #404040;
    padding: 10px;
    .ivu-tree {
      .ivu-tree-children {
        li {
          color: #ffffff;
          .ivu-btn {
            color: #ffffff;
            font-size: 14px;
            &.selected, &:hover {
              color: #444;
              background-color: #ffffff;
            }
          }
          .ivu-poptip.extra-action {
            display: none;
            float: right;
            margin-top: 3px;
            .ivu-btn {
              color: #444;
              display: block;
              margin: 5px; 
              &:hover {
                background-color: #666;
                color: #ffffff;
              }
            }
          }
          &:hover {
            > span > .ivu-poptip.extra-action {
              display: inline-block;
            }
          }
        }
      }
    }
    .ivu-menu {
      height: 100%;
    }
    .action-bar {
      z-index: 999;
      position: absolute;
      bottom: 60px;
      left: 0;
      right: 0;
      text-align: center;
      .ivu-btn.create {
        color: #ffffff;
      }
      .ivu-btn.save {
        margin-top: 5px;
      }
    }
  }
</style>