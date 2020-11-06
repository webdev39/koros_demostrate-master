<template>
  <div class="avatar-double" :style="{width: blockWidth }">
    <div class="block__photo" :style="avatarSize">
      <div class="photo" :style="{ backgroundImage: `url(${photo})` }"></div>
    </div>
    <div class="block__photo" :style="avatarSize">
      <i class="fas fa-camera icon"/>
      <div class="photo" :style="{ backgroundImage: `url(${photoSub})` }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      photo: {
        type: String
      },
      photoSub: {
        type: String 
      },
      blockWidth: {
        type: String,
        default: "65px"
      },
      width: {
        type: String,
        default: '42px'
      },
      height: {
        type: String,
        default: '42px'
      }
    },
    computed: {
      avatarSize() { 
        return {
          width: this.width,
          height: this.height
        };
      }
    },
  }
</script>