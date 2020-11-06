<template>
    <div class="users__name">
        $ {{new Intl.NumberFormat('en-US').format(data.id)}}
    </div>
</template>

<script>
    export default {
        props: ['data', 'index', 'column'],
        methods: {}
    }
</script>