<template>
    <div class="users__name">
        Membership {{data.id}}
    </div>
</template>

<script>
    export default {
        props: ['data', 'index', 'column'],
        methods: {}
    }
</script>