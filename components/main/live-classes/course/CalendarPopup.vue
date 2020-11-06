<template>
  <BasePopup
    iconSrc="/img/calendar.png"
    text="Add an event to your Calendar?"
    :theme="'white'"
  >
    <a :href="linkToGoogleCalendar"
        target="_blank"
        slot="buttons"
        class="calendar-link"
      >
      Yes, I use Google Calendar
    </a>
    <a :href="linkToOutlookCalendar"
        target="_blank"
        slot="buttons"
        class="calendar-link"
      >
      Yes, I use Outlook Calendar
    </a>
    <button
      class="btn decline"
      slot="buttons"
      @click="decline">
        Not now
    </button>
  </BasePopup>
</template>

<script>
import moment from 'moment';
  export default {
    props: {
      video: {
        type: Object
      }
    },
    computed: {
      startDateISO() { 
        return moment.unix(this.video.start_datetime).format('YYYYMMDDTHHmmss');
      },
      endDateISO() { 
        return moment.unix(this.video.end_datetime).format('YYYYMMDDTHHmmss');
      },
      calendarDescription() {
        return `${this.video.description} Link to translation - ${window.location.href}`;
      },
      linkToGoogleCalendar() {
        return `https://calendar.google.com/calendar/r/eventedit?text=${this.video.title}&dates=${this.startDateISO}/${this.endDateISO}&ctz=US&details=${this.calendarDescription}`;
      },
      linkToOutlookCalendar() {
        return `https://outlook.live.com/owa/?path=/calendar/action/compose#subject=${this.video.title}&body=${this.calendarDescription}&startdt=${this.startDateISO}&enddt=${this.endDateISO}&allday=false`;
      }
    },
    methods: {
      decline() {
        this.$emit('close');
      }
    }
  }
</script>