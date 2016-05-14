<style scoped>
.headline {
  font-size: 1.4rem;
  padding-left: 8px;
}

.panel {
  position: absolute;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  top: 0;
  color: rgb(0, 150, 136);
  background-color: rgba(0,0,0,.6);
}

.panel-body {
  padding: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  box-shadow: 2px 2px 2px 0 #777;
  position: relative;
  width: 100%;
}

.form-group {
  padding: 7px 0;
}

.form-group > input {
  outline: none;
  width: 100%;
  border-width: 0;
  border-bottom: 1px solid rgb(0, 150, 136);
  background-color: transparent;
  height: 2rem;
  font-size: 1.1rem;
  padding-left: 8px;
}

.footer {
  text-align: right;
  padding-top: 10px;
}

.text-warn {
  color: #f00;
  float: left;
  padding-top: 10px;
}
</style>

<template>
  <div class="panel" v-show="show" @click="hide">
    <div class="panel-body">
      <div class="headline" v-text="title"></div>
      <div class="form-group">
        <input type="text" placeholder="username" name="username" v-model="username">
      </div>
      <div class="form-group">
        <input type="password" placeholder="password" name="password" v-model="password">
      </div>
      <p class="text-warn" v-text="warn"></p>
      <p class="footer">
        <span @click="submit">Submit</span>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    warn: {
      type: String
    }
  },
  methods: {
    submit() {
      this.$dispatch('submit', this.username, this.password)
    },
    hide(event) {
      if (event.currentTarget === event.target) {
        this.show = false
      }
    }
  }
}
</script>