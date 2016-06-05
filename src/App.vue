<style>
@import '~vux/vux.css';

* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: Helvetica, sans-serif;
}

#app {
  display: flex;
  flex-flow: column nowrap;
}

.content {
  flex: 1 0 auto;
  padding-top: 84px;
}

.vux-tab {
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 43px;
}

.weui_switch:checked {
  background-color: rgb(0, 150, 136);
  border-bottom: 1px solid rgb(0, 150, 136);
  display: flex;
}
</style>

<style scoped>
.countdown {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  height: 43px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #e2e2e2;
  box-shadow: 1px 3px 5px 0 #fefefe;
  z-index: 3;
}

.item {
  flex: 1 0 33%;
  line-height: 43px;
  text-align: center;
}

.delta {
  border: 10px solid transparent;
  border-left: 20px solid rgb(0, 150, 136);
  display: inline-block;
  vertical-align: middle;
}

.cross {
  font-size: 1.6em;
  color: #f00;
  position: relative;
  left: -10px;
}

.cross:before {
  content: "×";
}

.circle {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid rgb(0, 150, 136);
  border-radius: 50%;
  vertical-align: middle;
}
</style>

<template>
  <div>
    <div class="countdown">
      <div class="item">
        <span class="circle"></span>
      </div>
      <div class="item" v-text="countdown_time"></div>
      <div class="item" @click="countdown">
        <span :class="{'delta': !start, 'cross': start}"></span>
      </div>
    </div>
    <tab active-color="rgb(0, 150, 136)">
      <tab-item :selected="$route.name === 'history'" v-link="{name: 'history'}">历史</tab-item>
      <tab-item :selected="$route.name === 'statistic'" v-link="{name: 'statistic'}">统计</tab-item>
      <tab-item :selected="$route.name === 'setting'" v-link="{name: 'setting'}">设置</tab-item>
    </tab>
    <confirm :show.sync="showAddConfirm" cancel-text="取消" title="添加一个番茄钟" confirm-text="确认" @on-confirm="onConfirm" @on-cancel="onCancel">
      <input class="tomato" type="text" v-model="tomato.title">
    </confirm>
    <div id="js-dark"></div>
    <router-view class="content" keep-alive></router-view>
  </div>
</template>

<script>
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Tab from 'vux/components/tab'
import TabItem from 'vux/components/tab-item'
import Icon from 'vux/components/icon'
import Confirm from 'vux/components/confirm'


import store from './store/store'
import { addItem } from './store/action'
import { host } from './store/getters'

import 'whatwg-fetch'


export default {
  data () {
    return {
      start: false,
      showAddConfirm: false,
      tomato: {
        title: '',
        start: 0,
        end: 0
      },
      countdown_timestamp: 25 * 1000 * 60
    }
  },
  store,
  ready() {
    if (localStorage.tomato) {
      this.countdown_timestamp = JSON.parse(localStorage.tomato).interval * 1000 * 60
    }
  },
  methods: {
    onConfirm() {
      fetch(`${this.host}/todos`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: `start=${this.tomato.start.getTime()}&end=${this.tomato.end.getTime()}&title=${this.tomato.title}`
      }).then((response) => response.json())
        .then((json) => {
        console.log('post json', json)
        this.tomato.ObjectId = json.ObjectId
        this.addItem(Object.assign({}, this.tomato))
        this.tomato.title = ''
      }).catch((err) => {
        console.log(err)
        this.addItem(Object.assign({}, this.tomato))
        this.tomato.title = ''
      })
    },
    onCancel() {

    },
    countdown() {
      console.log('hello,  world')
      this.start = !this.start;
      if (this.start) {
        let start_time = new Date(), 
            start_stamp = this.countdown_timestamp
        this.tomato.start = start_time
        let _test = () => {
          setTimeout(() => {
            let now = new Date()
            this.countdown_timestamp = start_stamp - (now - start_time)
            console.log(this.countdown_time)
            if (this.countdown_timestamp <= 1000) {
              this.start = false
              this.showAddConfirm = true
              this.tomato.end = new Date()
            }
            if (this.start) {
              _test()
            } else {
              this.countdown_timestamp = start_stamp
            }
          }, 500)
        }
        _test()
      } 
    }
  },
  computed: {
    countdown_time() {
      return new Date(this.countdown_timestamp).toLocaleTimeString('en-GB').slice(3)
    }
  },
  vuex: {
    actions: {
      addItem
    },
    getters: {
      host
    }
  },
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    Icon,
    Confirm
  }
}
</script>
