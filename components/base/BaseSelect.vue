<template>
    <div class="select-group">
        <div class="select"
             :tabindex="tabindex"
             @blur="open = false">
            <div class="selected"
                 :name="name"
                 :class="{open: open}"
                 @click="open = !open">
                {{labelFormatter(selected)}}
            </div>
            <div class="items" :class="{hide: !open}">
                <div class="item"
                     v-for="(option, i) in list"
                     :key="i"
                     @click="handleSelect(option)">
                    {{labelFormatter(option)}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                selected: this.value ? this.value : null,
                open: false
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            value: {
                type: Object
            },
            name: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: 'form-input form-input_select'
            },
            labelFormatter: {
                type: Function,
                default: function (value) {
                    return value;
                }
            },
            tabindex: {
                type: Number,
                required: false,
                default: 0
            },
        },
        computed: {},
        mounted() {},
        watch: {
            value(val) {
                this.selected = val;
            }
        },
        methods: {
            handleSelect(option) {
                this.open = false;
                this.selected = option;
                this.$root.$emit('selected', option);
            }
        }
    };
</script>
