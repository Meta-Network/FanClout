<template>
  <div
    :style="{
      width: size,
      height: size
    }"
    class="g-avatar"
  >
    <el-image
      :src="src"
      class="img-lazy"
      alt="avatar"
    >
      <template #error>
        <div
          class="image-slot"
        >
          <i
            :style="{ 'font-size': `calc(${ size } * 0.7)` }"
            class="el-icon-user-solid"
          />
        </div>
      </template>
    </el-image>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '1rem'
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.imgObjectFitCover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-lazy {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.g-avatar {
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #ececec;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    .imgObjectFitCover();
  }
  .icon-avatar {
    .imgObjectFitCover();
    color: #c1c4cc;
  }
  .icon-crack {
    width: 50%;
    height: 50%;
    object-fit: cover;
    color: #5d5d5d;
  }
}

</style>

<style lang="less">
.g-avatar .el-icon-user-solid {
  font-size: 18px;
  color: #848484;
}
</style>
