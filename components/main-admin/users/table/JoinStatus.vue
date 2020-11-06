<template>
    <div class="users__name">
        {{upperFirst(data.status)}} {{data.created_at?formatDateUSA(new Date(data.created_at)):''}}
    </div>
</template>

<script>
    import upperFirst from 'lodash/upperFirst';
    import {formatDateUSA} from '../../../../helpers';

    export default {
        props: ['data', 'index', 'column'],
        methods: {
            upperFirst(text) {
               return upperFirst(text);
            },
            formatDateUSA(text) {
                return formatDateUSA(text);
            }
        }
    }
</script>