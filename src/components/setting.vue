<style>
.range-quantity {
  background-color: rgb(0, 150, 136);
}
</style>

<template>
  <div>
    <group title="基本设置">
      <switch title="夜间模式"></switch>
      <switch title="省流量模式" inline-desc="仅在 wifi 模式下加载图片"></switch>
    </group>
    <group title="账号设置">
      <cell :title="`账号和密码(${username || '未登录'})`" inline-desc="修改账号和密码，绑定社交账号" @click="login.show=true"></cell>
    </group>
    <group title="番茄设置">
      <cell title="番茄时长" primary="content" :inline-desc="tomato.interval + ' min'">
        <range slot="value" :range-bar-height="4" :min="0" :max="60" :value.sync="tomato.interval"></range>
      </cell>
      <cell title="每日目标" primary="content" :inline-desc="tomato.dayTarget + ' 个钟'">
        <range slot="value" :range-bar-height="4" :min="6" :max="20" :value.sync="tomato.dayTarget"></range>
      </cell>
      <cell title="每周目标" primary="content" :inline-desc="tomato.weekTarget + ' 个钟'">
        <range slot="value" :range-bar-height="4" :min="20" :max="60" :value.sync="tomato.weekTarget"></range>
      </cell>
    </group>
    <form-panel title="Login" :show.sync="login.show" @submit="sign_in" :warn="login.error">
      <span @click="login.show = false, register.show = true">SignUp</span>
    </form-panel>
    <form-panel title="Register" :show.sync="register.show" @submit="sign_up" :warn="register.error">
      <span @click="login.show = true, register.show = false">SignIn</span>
    </form-panel>
  </div>
</template>

<style>

</style>

<script>
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Switch from 'vux/components/switch'
import Popup from 'vux/components/popup'
import Range from 'vux/components/range'

import FormPanel from './form-panel.vue'
import { host } from '../store/getters'

export default {
  data () {
    return {
      tomato: {
        interval: 25,
        dayTarget: 8,
        weekTarget: 40
      },
      login: {
        show: false,
        error: ''
      },
      register: {
        show: false,
        error: ''
      },
      username: ''
    }
  },
  ready() {
    if (localStorage.tomato) {
      this.tomato = JSON.parse(localStorage.tomato)
    }
  },
  methods: {
    sign_in (username, password) {
      let form_data = new FormData()
      form_data.append('username', username)
      form_data.append('password', password)
      fetch(`${this.host}/login`, {
        method: 'POST',
        body: form_data
      }).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          this.login.error = 'Not Found'
        }
      }).then(data => {
        console.log(data)
        if (data.error === 0) {
          sessionStorage.token = data['token'];
          sessionStorage.username = username
          this.login.show = false
          this.login.error = ''
          this.username = username
        } else {
          console.log('login err:', data.error)
          this.login.error = data.error
        }
      }).catch(err => {
        console.log('login err', err)
      })
    },
    sign_up (username, password) {
      let form_data = new FormData()
      form_data.append('username', username)
      form_data.append('password', password)
      fetch(`${this.host}/reg`, {
        method: 'POST',
        body: form_data
      }).then(res => {
        if (res.ok) {
          return res.json()
        }
      }).then(data => {
        console.log(data)
        if (data.error === 0) {
          sessionStorage.token = data['token'];
          sessionStorage.username = username
          this.register.show = false
          this.register.error = ''
          this.username = username
        } else {
          console.log('register err:', data.error)
          this.register.error = data.error
        }
      }).catch(err => {
        console.log('register err', err)
      })
    }
  },
  vuex: {
    actions: {
    },
    getters: {
      host
    }
  },
  watch: {
    'tomato': {
      handler (value) {
        localStorage.tomato = JSON.stringify(value)
      },
      deep: true
    }
  },
  components: {
    Group,
    Cell,
    Switch,
    Range,
    Popup,
    FormPanel
  }
}
</script>
