<style scoped>
.span {
  border-radius: 50%;
  background-color: red;
  display: inline-block;
  position: absolute;
}

.circle {
  position: relative;
}
</style>

<template>
    <div class="circle">
      <span :style="{width: 2 * data.r + 'px', height: 2 * data.r + 'px', top: data.x - data.r + 'px', left: data.y - data.r + 'px'}" class="span"></span>
      <canvas :width="width" :height="height" v-canvas="data"></canvas>
    </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    data: {
      type: Object
    }
    // x: {
    //   type: Number
    // },
    // y: {
    //   type: Number
    // },
    // r: {
    //   type: Number
    // },
    // startAngle: {
    //   type: Number
    // },
    // endAngle: {
    //   type: Number
    // }
    // full: {
    //   type: Boolean
    // }
  },
  ready() {
    
  },
  directives: {
    canvas: {
      bind() {
        CanvasRenderingContext2D.prototype.sector = function (x, y, radius, startAngle, endAngle) {
          // 初始保存
          this.save();
          // 位移到目标点
          this.translate(x, y);
          this.beginPath();
          // 画出圆弧
          this.arc(0,0,radius,startAngle, endAngle);
          // 再次保存以备旋转
          this.save();
          // 旋转至起始角度
          this.rotate(endAngle);
          // 移动到终点，准备连接终点与圆心
          this.moveTo(radius,0);
          // 连接到圆心
          this.lineTo(0,0);
          // 还原
          this.restore();
          // 旋转至起点角度
          this.rotate(startAngle);
          // 从圆心连接到起点
          this.lineTo(radius,0);
          this.closePath();
          // 还原到最初保存的状态
          this.restore();
          return this;
        }
      },
      update(value) {
        var ctx = this.el.getContext('2d');
        ctx.fillStyle = '#333';
        this.vm.$nextTick(() => {
          ctx.sector(value.x, value.y, value.r, 0, value.size * 2 * Math.PI).fill();
        })
      }
    }
  }
}
</script>