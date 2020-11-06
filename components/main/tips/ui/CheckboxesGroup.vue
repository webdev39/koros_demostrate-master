<template>
    <div class="sidebar-section">
        <h3 class="sidebar-title">{{ title }}</h3>
        <div class="checkbox-group" v-for="(item, i) in items">
            <input type="checkbox" v-model="selectedSync" :value="item" :id="id+i">
            <label :for="id+i">
                {{ item.name || item.title || `${item.first_name} ${item.last_name}` }}
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CheckboxesGroup',
        props: {
            title: {type: String},
            id: {type: String},
            items: {type: [Array, Object]},
            value: {type: Array},
        },
        data() {
            return {
                selected: [],
            };
        },
        computed: {
            selectedSync: {
                get() { return this.value; },
                set(val) {
                    this.selected = val;
                    this.$emit('input', this.selected);
                    this.$emit('change', this.selected);
                },
            }
        }
    }
</script>

<style scoped>

</style>