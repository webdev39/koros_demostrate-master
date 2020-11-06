<template>
  <div class="block block-view double">
    <router-link
      class="block-edit-link" :to="{ name: 'instructorProfileEdit'}">
      <img src="/img/icons/pen.svg"/>
    </router-link>
    <div class="profile-title">
      Instructor Profile
    </div>
    <div class="double-profile">
      <div class="half-profile">
        <div class="instructor-main">
          <BaseAvatar width="103px" height="103px" :url="photoInstr1"/>
          <div class="instructor-data">
            <div class="instructor-name">
              {{ fullnameInstr1 }}
            </div>
            <div class="city">{{ cityInstr1 }}</div>
          </div>
        </div>
        <ul class="profile-info">
          <li class="info-item">
            <div class="item-title">Birthday</div>
            <div class="item-data">{{ birthdayInstr1 }}</div>
          </li>
          <li class="info-item">
            <div class="item-title">Gender</div>
            <div class="item-data">{{ genderInstr1 }}</div>
          </li>
        </ul>
      </div>
      <div class="half-profile">
        <div class="instructor-main">
          <BaseAvatar width="103px" height="103px" :url="photoInstr2"/>
          <div class="instructor-data">
            <div class="instructor-name">
              {{ fullnameInstr2 }}
            </div>
            <div class="city">{{ cityInstr2 }}</div>
          </div>
        </div>
        <ul class="profile-info">
          <li class="info-item">
            <div class="item-title">Birthday</div>
            <div class="item-data">{{ birthdayInstr2 }}</div>
          </li>
          <li class="info-item">
            <div class="item-title">Gender</div>
            <div class="item-data">{{ genderInstr2 }}</div>
          </li>
        </ul>
      </div>
    </div>
    <ul class="profile-info common">
      <li class="info-item">
        <div class="item-title">Email</div>
        <div class="item-data">{{ email }}</div>
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
    photoInstr1: {
      type: String
    },
    photoInstr2: {
      type: String
    },
    fullnameInstr1: {
      type: String
    },
    fullnameInstr2: {
      type: String
    },
    cityInstr1: {
      type: String
    },
    cityInstr2: {
      type: String
    },
    birthdayInstr1: {
      type: String
    },
    birthdayInstr2: {
      type: String
    },
    genderInstr1: {
      type: String
    },
    genderInstr2: {
      type: String
    },
    email: {
      type: String
    },
    bio: {
      type: String
    }
  }
}
</script>