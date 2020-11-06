<template>
    <div :class="'classes'">
        <router-view :key="$route.path"></router-view>
    </div>
</template>
<script>
    import {mapActions} from "vuex"; 

    export default {
        data() {
            return {};
        },
        async mounted() {
        },
        methods: {
        }
    }
</script>