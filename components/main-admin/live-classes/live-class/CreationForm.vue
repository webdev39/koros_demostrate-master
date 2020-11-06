<template>
  <div class="block create-class">

    <div class="class-photo">
      <div
        class="photo"
        name="image"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      ></div>
      <div class="action">
        <input type="file" id="image" @change="addImage" />
        <label for="image">
          <i class="fas fa-camera"></i>
        </label>
      </div>
    </div>

    <div class="management-form">

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
      
      <div class="inline-select">
        <label>Level</label>
        <base-dict-select
          :options="difficultyLevels"
          v-model="diffLevel"
          name="difficulty_level_id" />
      </div>

      <div class="input-group">
        <label>Start Date & Time </label>
        <div class="inputs" name="datetime">
          <input
            type="text"
            readonly
            autocomplete="off"
            autocapitalize="off"
            :value="startDate"
            ref="date"
          />
          <div class="inline-select">
            <base-dict-select
              :options="startTimeOptions"
              v-model="startTime"
              name="start_datetime"
            />
          </div>
          <span class="to">to</span>
          <div class="inline-select">
            <base-dict-select
              :options="endTimeOptions"
              v-model="endTime"
              name="end_datetime"
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
          :disabled="status.loading"
          >
            <span v-if="status.loading"><i class="fa fa-spinner fa-pulse"></i></span>
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
import { mapState, mapActions } from 'vuex';
import { getTimeOptions } from '../../../../helpers';

  export default {
    props: {
      btnLabel: {
        type: String,
        default: 'Create'
      },
    },
    data() {
      return {
        picker: null,
        image: null,
        imageUrl: null,
        title: null,
        diffLevel: null,
        startDate: null,
        startTime: null,
        endTime: null,
        description: null
      }
    },
    created() {
      this.startTimeOptions = getTimeOptions();
      if (!this.liveClass) {
        this.startDate = this.liveClassCourse.start_date ? moment(this.liveClassCourse.start_date).add(7 * (this.weekNumber - 1), 'd').format('L') : null;
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
      }
      if (this.liveClass) {
        this.imageUrl = this.liveClass.image;
        this.image = this.liveClass.image;
        this.title = this.liveClass.title;
        this.diffLevel = this.liveClass.difficulty_level;
        this.startDate = this.liveClass.start_datetime ? moment(this.liveClass.start_datetime).format('L') : null;
        this.startTime = this.liveClass.start_datetime 
          ? this.timeOptions.find(option => {
            return option.name === moment(this.liveClass.start_datetime).format('LT')
            })
          : null;
        this.endTime = this.liveClass.end_time 
        ? this.timeOptions.find(option => {
          return option.name === moment(this.liveClass.end_datetime).format('LT')
          })
        : null;
        this.description = this.liveClass.description;
      }
    },
    mounted() {
      this.picker = datepicker(this.$refs.date, {
        startDate: moment().toDate(),
        minDate: moment(this.liveClassCourse.start_date).add(7 * (this.weekNumber - 1), 'd').toDate(),
        maxDate: moment(this.liveClassCourse.start_date).add(7 * (this.weekNumber - 1) + 6, 'd').toDate(),
        formatter: (input, date, instance) => {
          const value = moment(date).format('L')
          input.value = value
          this.startDate = value
        }
      });
    },
    computed: {
      ...mapState('account', {
        instructors: state => state.dictionary.result.instructors,
        classTypes: state => state.dictionary.result.class_types,
        difficultyLevels: state => state.dictionary.result.difficulty_levels,
        status: state => state.status
      }),
      ...mapState('classes', {
        liveClass: state => state.liveClass,
        liveClassCourse: state => state.liveClassCourse,
        weekNumber: state => state.weekNumber
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
      handleSubmit() {
        const startDate = this.startDate && moment(this.startDate).format('YYYY-MM-DD')

        let data = {
          title: this.title,
          difficulty_level_id: this.diffLevel ? this.diffLevel.id : null,
          start_datetime: startDate && this.startTime ? moment(`${startDate} ${this.startTime.name}`).format('Y-MM-DD HH:mm:ss') : null,
          end_datetime: startDate && this.endTime ? moment(`${startDate} ${this.endTime.name}`).format('Y-MM-DD HH:mm:ss') : null,
          image: typeof(this.image) === 'object' ? this.image : null,
          description: this.description
        }

        this.$emit('submitForm', {
          courseId: this.$route.params.courseId,
          data
        });
      }
    }
  }
</script>