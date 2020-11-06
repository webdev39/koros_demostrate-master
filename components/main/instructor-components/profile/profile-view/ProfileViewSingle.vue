<template>
  <div class="block block-view single">
    <router-link
      class="block-edit-link" :to="{ name: 'instructorProfileEdit'}">
      <img src="/img/icons/pen.svg"/>
    </router-link>
    <BaseAvatar width="103px" height="103px" :url="photo"/>
    <div class="instructor-data">
      <div class="instructor-name">
        {{ fullName }}
      </div>
      <div class="city">{{ location }}</div>
    </div>
    <ul class="profile-info view">
      <li class="info-item">
        <div class="item-title">Email</div>
        <div class="item-data">{{ email }}</div>
      </li>
      <li class="info-item">
        <div class="item-title">Birthday</div>
        <div class="item-data">{{ birthday }}</div>
      </li>
      <li class="info-item">
        <div class="item-title">Gender</div>
        <div class="item-data">{{ gender }}</div>
      </li>
      <li class="info-item bio">
        <div class="item-title">Bio</div>
        <div class="item-data">{{ bio }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: String
    },
    fullName: {
      type: String
    },
    location: {
      type: String
    },
    birthday: {
      type: String
    },
    gender: {
      type: String
    },
    email: {
      type: String
    },
    bio: {
      type: String
    }
  },
}
</script>