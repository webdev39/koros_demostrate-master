<template>
    <div class="slider" data-is-sliding-event="" v-dragscroll.x="true" @dragscrollstart="slideStart" @dragscrollend="slideEnd"> <!-- @dragscrollmove="slideMove($event.detail.deltaX)" -->
        <div :class="['cell', {'is-clickable': isClickable}]" v-for="(item, i) in items" :key="i" @click="clickSlide($event, item)">
            <slot name="item" :item="item"> <!--:item="item"-->
                <ui-thumbnail :url="item.thumbnail || item.image || item.photo" :size="size" :can-play="canPlay"></ui-thumbnail>
                <h5 class="title">{{ item.title || item.name }}</h5>
            </slot>
        </div>
    </div>
</template>

<script>
    import UiThumbnail from './UiThumbnail';

    export default {
        name: 'UiSlider',
        components: {UiThumbnail},
        props: {
            items: {type: [Array, Object, Promise], default: () => [], required: true}, // , Promise
            type: {type: String, default: '', }, // videos
            // @note Next the <ui-thumbnail> props
            size: {type: String},
            canPlay: {type: Boolean},
        },
        computed: {
            isClickable() { return !!this.$listeners.clickSlide; },
        },
        methods: {
            clickSlide(e, item) {
                // @note Prevent a fake click event after sliding
                let sliderNode = e.target.closest('.slider');
                let isSlidingEvent = sliderNode ? sliderNode.dataset.isSlidingEvent : false;
                if (isSlidingEvent) return false;

                this.$emit('clickSlide', e, item)
            },
            slideStart(e) {
                e.target.dataset.isSlidingEvent = 'true'; // @note Prevent a fake click event after sliding
            },
            slideMove(e) {
                // ...
            },
            slideEnd(e) {
                setTimeout(() => {
                    e.target.dataset.isSlidingEvent = ''; // @note Prevent a fake click event after sliding
                }, 300);
            },
        }
    }
</script>

<style scoped>
    .slider { display: flex; overflow: hidden; /*align-items: flex-start;*/ }
    .slider .cell { position: relative; margin-right: 25px; }
    .slider .cell.is-clickable { cursor: pointer }
    .slider .cell .title { text-align: center; font-family: "Avenir Medium"; font-size: 18px; font-weight: 500; margin: 10px 0; }
</style>