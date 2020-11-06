<template>
    <div class="popup" :class="theme">
        <img class="popup__img" :src="iconSrc">
        <div class="popup__text">
            {{text}}
        </div>
        <div class="popup__buttons">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            iconSrc: {
                default: '/img/icons/remove-popup.svg'
            },
            text: {
                type: String,
                default: 'Do you want to remove this user?'
            },
            theme: {
                type: String,
                default: 'dark'
            }
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>