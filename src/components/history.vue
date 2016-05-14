<style>
.weui_cells_title {
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0;
  background-color: #fff;
  color: #009688;
  opacity: .8;
  font-weight: 600;
}

span.lable {
  padding: 5px;
  color: #fff;
  border-radius: 4px;
  background-color: #009688;
  font-size: 0.9em;
}

.tomato {
  width: 100%;
  height: 2rem;
  font-size: 1.1rem;
  outline: none;
  border: 0;
  background-color: #fafafc;
  padding-left: 10px;
  border-bottom: 1px solid rgb(0, 150, 136);
}

.weui_btn_dialog.primary {
  color: rgb(0, 150, 136);
}
</style>

<template>
  <div>
    <group :title="group | groupTitle" v-for="group in groupItems | orderBy 'time' -1">
      <cell :title="item.title | removeLabel" :inline-desc="item.start | timeto item.end" :value="item.title | addLable" v-touch:press="onPress(item)" v-for="item in group.tomatos | orderBy 'start' -1" track-by="$index"></cell>
    </group>
    <action-sheet :menus="menus" :show.sync="show.menu" @menu-click="onMenu"></action-sheet>
    <confirm :show.sync="show.confirm" cancel-text="取消" title="修改一个番茄钟" confirm-text="确认" @on-confirm="onConfirm" @on-cancel="onCancel">
      <input class="tomato" type="text" v-model="activeCell.title">
    </confirm>
    <loading :show="show.loading"></loading>
    <alert :show.sync="show.alert" button-text="确认" title="请确认网络连接"></alert>
  </div>
</template>

<script>
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import ActionSheet from 'vux/components/actionsheet'
import Confirm from 'vux/components/confirm'
import XInput from 'vux/components/x-input'
import Loading from 'vux/components/loading'
import Panel from 'vux/components/panel'
import Alert from 'vux/components/alert'

import { groupItems, host } from '../store/getters'
import { addItem, removeItem, loadItems } from '../store/action'

export default {
  data () {
    return {
      title: '',
      scrollTop: 0,
      activeCell: {title: 'Defined Title'},
      oldTitle: '',
      onLine: false,
      show: {
        alert: false,
        loading: true,
        menu: false,
        confirm: false
      },
      menus: {
        edit: '编辑',
        delete: '删除'
      }
    }
  },
  vuex: {
    getters: {
      groupItems,
      host
    },
    actions: {
      addItem,
      removeItem,
      loadItems
    }
  },
  ready() {
    this.$http.get(`${this.host}/todos`).then(({data}) => {
      console.log('fetch todos ...', data)
      this.loadItems(data.results)
        this.onLine = true;
        this.show.loading = false;
      }).catch((err) => {
        console.log('fetch err:', err)
      this.onLine = false;
      this.show.loading = false;
      this.show.alert = true;
    })
  },
  methods: {
    onPress(item) {
      this.activeCell = item
      this.show.menu = true
      this.oldTitle = item.title
    },
    onMenu(target) {
      if (target === 'edit') {
        this.show.confirm = true
      } else {
        fetch(`${this.host}/todos/${this.activeCell.objectId}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'DELETE'
        }).then(res => {
            console.log('res:', res)
            if (res.ok) {
              return res.json()
            }
          }).then((data) => {
            console.log('data:', data)
            this.removeItem(this.activeCell)
          }).catch((err) => {
            console.log('err:', err)
            this.removeItem(this.activeCell)
          })
      }
    },
    onConfirm() {

    },
    onCancel() {
      this.activeCell.title = this.oldTitle;
    }
  },
  route: {
    activate ({next}) {
      next()
      document.body.scrollTop = this.scrollTop
    },
    deactivate () {
      this.scrollTop = document.body.scrollTop;
    }
  },
  filters: {
    timeto (start, end) {
      start = start.toLocaleTimeString('en-GB').slice(0, -3)
      end = end.toLocaleTimeString('en-GB').slice(0, -3)
      return `${start} - ${end}`
    },
    removeLabel (value) {
      let replace_str = value.replace(/#.+?\b/g, '').trim();
      if (replace_str === '') {
        replace_str = value.slice(1)
      }
      return replace_str
    },
    addLable (value) {
      let match = value.match(/#.+?\b/g);
      if (match !== null) {
        return match.map((item) => `<span class="lable">${item}</span>`).join('\n')
      }
    },
    groupTitle (group) {
      return `<div>${group.time.toLocaleDateString()} <span style="float: right">${group.tomatos.length}</span> </div>`
    }
  },
  components: {
    Group,
    Cell,
    ActionSheet,
    Confirm,
    XInput,
    Loading,
    Alert
  }
}
</script>