<template>
    <button class="button" :class="className" @click="$emit('clicked')">{{text}}</button>
</template>

<script>
    export default {
        data: function () {
            return {
                mutatedModel: this.model
            }
        },
        props: {
            text: {
                type: String,
                default: 'Button'
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {},
        methods: {
        }
    };
</script>