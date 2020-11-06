<template>
  <div class="content-mobile">
    <header class="mobile-header">
      <h1 class="mobile-title">Filter</h1>
      <div class="button-left">
        <div
          role="button"
          class="menu-button"
          @click="switchComponent({
            page: 'liveClasses',
            component: 'ListingMobile'
          })"
        >
          <svg
            width="14px"
            height="15px"
          >
            <use href="#close-icon"></use>
          </svg>
        </div>
      </div>
      <div class="button-right">
        <div
          role="button"
          class="menu-button reset"
          @click="resetChecked"
        >
          Reset 
        </div>
      </div>
    </header>
    <div class="content-filter">
      <div class="filter-section">
        <h3 class="section-title">Instructor</h3>
        <div class="section-content">
          <div
            v-for="i in instructors"
            :key="i.id"
            class="user-class"
            :class="{ checked : isInsctructorChecked(i) }"
            @click="selectInstructor(i)">
            <div class="user-avatar">
              <base-avatar
                v-if="!i.subprofile"
                :url="i.photo"
                width="38px"
                height="38px"
              />
              <base-double-avatar
                v-else
                :photo="i.photo"
                :photoSub="i.subprofile.photo"
                width="38px"
                height="38px"
                blockWidth="59px"
              />
            </div>
            <div class="user-name">
              {{ classInstructorName(i) }}
            </div>
          </div>
        </div>
      </div>
      <div class="filter-section">
        <h3 class="section-title">Type of Class</h3>
        <div class="section-content">
          <vue-multi-select
            v-model="checkedClassTypes"
            :options="multiSelectOptions"
            :selectOptions="classTypes"
            :btnLabel="multiSelectLabel"
          />
        </div>
      </div>
      <div class="filter-section">
        <h3 class="section-title">Difficulty Level</h3>
        <div class="section-content">
          <vue-multi-select
            v-model="checkedDiffLevels"
            :options="multiSelectOptions"
            :selectOptions="difficultyLevels"
            :btnLabel="multiSelectLabel"
          />
        </div>
      </div>
      <div class="btn-section">
        <button
          class="btn btn-primary"
          @click="filterLiveClassCourses"
        >Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import vueMultiSelect from 'vue-multi-select';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
  export default {
    data() {
      return {
        multiSelectOptions: {
          multi: true,
          cssSelected: (option) =>
            option.selected
              ? { color: '#d3acbe', 'font-family': 'Helvetica' }
              : ''
        },
        multiSelectLabel: () => '',
        checkedClassTypes: [],
        checkedDiffLevels: []
      }
    },
    components: {
      vueMultiSelect
    },
    methods: {
      ...mapMutations('ui', [
        'switchComponent'
      ]),
      ...mapMutations('classes', [
        'checkInstructor',
        'checkClassTypes',
        'checkDiffLevels',
        'resetCheckedInstrs'
      ]),
      ...mapActions('classes', ['findLiveClassCourses']),
      selectInstructor(i) {
        this.checkInstructor(i.id);
      },
      isInsctructorChecked(i) {
        return this.instructorIds.indexOf(i.id) !== -1;
      },
      filterLiveClassCourses() {
        this.checkClassTypes(
          this.checkedClassTypes.map(type => type.id)
        );
        this.checkDiffLevels(
          this.checkedDiffLevels.map(level => level.id)
        );
        this.findLiveClassCourses();
        this.switchComponent({
          page: 'liveClasses',
          component: 'ListingMobile'
        });
      },
      resetChecked() {
        this.checkedClassTypes = [];
        this.checkedDiffLevels = [];
        this.resetCheckedInstrs();
      }
    },
    computed: {
      ...mapState('account', { 
        instructors: state => state.dictionary.result.instructors,
        classTypes: state => state.dictionary.result.class_types,
        difficultyLevels: state => state.dictionary.result.difficulty_levels
      }),
      ...mapState('classes', {
        instructorIds: state => state.instructorIds
      }),
      ...mapGetters({
        classInstructorName: 'classes/classInstructorName'
      })
    }
  }
</script>