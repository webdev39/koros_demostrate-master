<template>
    <div
      class="select"
      :tabindex="tabindex"
      @blur="open = false"
    >
      <div
        class="selected"
        :name="name"
        :class="{open: open}"
        @click="open = !open"
      >
        {{ selectedName }}
      </div>
      <div
        class="items"
        :class="{hide: !open}"
      >
        <div
          class="item"
          v-for="(option, i) in options"
          :key="i"
          @click="handleSelect({id:option.id, name:option.name})"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    value: {
      type: Object
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: this.options.length > 0 && this.value ? this.value : null,
      open: false
    };
  },
  computed: {
    selectedName() {
      return this.selected ? this.selected.name : ''
    }
  },
    methods: {
    handleSelect(option) {
      this.open = false;
      this.$emit('input', option);
    }
  },
  watch: {
      value(val) {
          this.selected = val;
      }
  }
};
</script>