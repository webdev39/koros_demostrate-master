<template>
    <div class="users__name">
        {{data.last_token ? formatDateUSA(new Date(data.last_token.created_at)) : ''}}
    </div>
</template>

<script>
    import {formatDateUSA} from '../../../../helpers';

    export default {
        props: ['data', 'index', 'column'],
        methods: {
            formatDateUSA(date) {
                return formatDateUSA(date);
            }
        }
    }
</script>