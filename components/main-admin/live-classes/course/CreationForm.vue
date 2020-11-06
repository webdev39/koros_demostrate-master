<template>
  <div class="block create-class">

    <div class="class-photo">
      <div class="photo"
        :style="{ backgroundImage: `url(${imageUrl})` }"
        name="image"
      ></div>
      <div class="action">
        <input type="file" id="image" @change="addImage" />
        <label for="image">
          <i class="fas fa-camera"></i>
        </label>
      </div>
    </div>

    <div class="management-form">
      <div class="radio-group">
        <div class="radio">
          <input type="radio" id="public" v-model="isProtected" :value="false">
          <label for="public">Public</label>
        </div>
        <div class="radio">
          <input type="radio" id="private" v-model="isProtected" :value="true">
          <label for="private">Private</label>
        </div>
      </div>
      <div class="input-group" v-if="isProtected">
        <label>Access Code</label>
        <div class="access">{{ secret }}</div>
      </div>
      <div class="input-group">
        <label>Title</label>
        <div>
          <input
            type="text"
            autocomplete="off"
            autocapitalize="off"
            v-model="title"
            name="title"
          />
        </div>
      </div>

      <div class="inline-select" v-if="isAdmin">
        <label>Instructor</label>
        <base-dict-select :options="instructorOptions" v-model="instructor" />
      </div>

      <div class="inline-select">
        <label>Level</label>
        <base-dict-select
          :options="difficultyLevels"
          v-model="diffLevel"
          name="difficulty_level_id"/>
      </div>

      <div class="inline-select">
        <label>Type</label>
        <base-dict-select
          :options="classTypes"
          v-model="classType"
          name="class_type_id"
        />
      </div>

      <div class="input-group">
        <label>Weeks</label>
        <div>
          <input
            type="text"
            autocomplete="off"
            autocapitalize="off"
            v-model="weeks"
            name="weeks"
            v-inputfilter="'positive-integer'"
          />
        </div>
      </div>

      <div class="input-combined">
        <label>Start Date & Time </label>
        <div class="inputs">
          <div class="date-wrapper">
            <input
              type="text"
              readonly
              autocomplete="off"
              autocapitalize="off"
              :value="startDate"
              ref="date"
              name="start_date"
            />
          </div>
          <div class="inline-select">
            <base-dict-select
              :options="startTimeOptions"
              v-model="startTime"
              name="start_time"
            />
          </div>
          <span class="to">to</span>
          <div class="inline-select">
            <base-dict-select
              :options="endTimeOptions"
              v-model="endTime"
              name="end_time"
            />
          </div>
          <span class="time">Eastern Time (GMT-05:00)</span>
        </div>
      </div>

      <div class="input-group textarea">
        <label>Description</label>
        <div>
          <textarea
            autocomplete="off"
            autocapitalize="off"
            v-model="description"
            name="description"
          />
        </div>
      </div>

      <div class="button-group">
        <button
          class="btn btn-primary"
          @click="handleSubmit"
          :disabled="loading"
          >
            <span v-if="loading">
              <i class="fa fa-spinner fa-pulse"></i>
            </span>
            {{ btnLabel }}
          </button>
        <button
          class="btn btn-secondary"
          @click="$router.push({ name: 'main' })">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from 'js-datepicker';
import moment from 'moment';
import { mapState, mapGetters } from 'vuex';
import { getTimeOptions } from '../../../../helpers';

  export default {
    data() {
      return {
        picker: null,
        image: null,
        imageUrl: null,
        isProtected: false,
        instructor: null,
        diffLevel: null,
        classType: null,
        title: null,
        weeks: null,
        secret: this.createAccessCode(),
        startDate: null,
        timeOptions: [],
        startTime: null,
        endTime: null,
        description: null
      }
    },
    props: {
      btnLabel: {
        type: String,
        default: 'Create'
      }
    },
    created() {
      this.startTimeOptions = getTimeOptions();
      if (this.liveClassCourse) {
        this.imageUrl = this.liveClassCourse.image;
        this.image = this.liveClassCourse.image;
        this.title = this.liveClassCourse.title;
        this.instructor = this.liveClassCourse.instructor ?   this.instructorOptions.find(i => i.id ===   this.liveClassCourse.instructor.id) : null;
        this.diffLevel = this.liveClassCourse.difficulty_level;
        this.classType = this.liveClassCourse.class_type;
        this.startDate = this.liveClassCourse.start_date ? moment(this.liveClassCourse.start_date).format('L') : null;
        this.startTime = this.liveClassCourse.start_time 
          ? this.startTimeOptions.find(option => {
            return option.name === moment(this.liveClassCourse.start_time, 'HH:mm:ss').format('LT')
            })
          : null;
        this.endTime = this.liveClassCourse.end_time 
        ? this.endTimeOptions.find(option => {
          return option.name === moment(this.liveClassCourse.end_time, 'HH:mm:ss').format('LT')
          })
        : null;
        this.weeks = this.liveClassCourse.weeks;
        this.description = this.liveClassCourse.description;
        this.isProtected = this.liveClassCourse.protected;
        if (this.liveClassCourse.protected) {
          this.secret = this.liveClassCourse.secret;
        }
      }
    },
    mounted() {
      this.picker = datepicker(this.$refs.date, {
        startDate: moment().toDate(),
        minDate: moment().toDate(),
        formatter: (input, date, instance) => {
          const value = moment(date).format('L')
          input.value = value
          this.startDate = value
        }
      });
    },
    computed: {
      ...mapState('account', {
        user: state => state.user,
        instructors: state => state.dictionary.result.instructors,
        classTypes: state => state.dictionary.result.class_types,
        difficultyLevels: state => state.dictionary.result.difficulty_levels
      }),
      ...mapState('classes', {
        liveClassCourse: state => state.liveClassCourse
      }),
      ...mapState('ui', {
        loading: state => state.loading
      }),
      ...mapGetters({
        isAdmin: 'account/isAdmin'
      }),
      instructorOptions() {
        return this.instructors.map(i => {
          return {
            id: i.id,
            name: `${i.first_name} ${i.last_name}`
          }
        })
      },
      startTimeIndex() {
        return this.startTime && this.startTimeOptions.findIndex(option => option.id === this.startTime.id);
      },
      endTimeOptions() {
        return this.startTime 
          ? this.startTimeOptions.slice(this.startTimeIndex + 1)
          : this.startTimeOptions;
      }
    },
    methods: {
      addImage(e) {
        this.image = e.target.files[0];
        this.imageUrl = URL.createObjectURL(this.image);
      },
      createAccessCode() {
        let accessCode = '';
        for (let i = 0; i < 6; i ++) {
          accessCode += String(Math.floor(Math.random() * 10))
        }
        return accessCode;

      },
      handleSubmit() {
        let data = {
          image: typeof(this.image) === 'object' ? this.image : null,
          title: this.title,
          difficulty_level_id: this.diffLevel ? this.diffLevel.id : null,
          class_type_id: this.classType ? this.classType.id : null,
          weeks: this.weeks,
          start_date: this.startDate ? moment(this.startDate).format('YYYY-MM-DD') : null,
          start_time: this.startTime ? moment(this.startTime.name, 'LT').format('HH:mm') : null,
          end_time: this.endTime ? moment(this.endTime.name, 'LT').format('HH:mm') : null,
          description: this.description
        };
        if (this.isProtected) {
          data.secret = this.secret;
        }
        if (this.user.role_id === 1) {
          data.instructor_id = this.instructor ? this.instructor.id : null
        }

        this.$emit('submitForm', data);
      }
    }
  }
</script>