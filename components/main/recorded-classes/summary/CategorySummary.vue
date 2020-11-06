<template>
    <a class="category" @click="onClickPreventSliding" style="cursor: pointer">
        <div class="category-thumbnail" :style="{ backgroundImage: 'url(' + category.image + ')' }"></div>
        <div class="category-name">
            <!--<router-link :to="{name: 'category', params: {categoryId: category.id}}">
                {{ category.name }}
            </router-link>-->
            <a>{{ category.name }}</a>
        </div>
    </a>
</template>

<script>
    export default {
        props: {
            category: {type: Object, required: true},
        },
        methods: {
            onClickPreventSliding(e) {
                // @note Prevent a click event after sliding
                let isSlidingEvent = e.target.parentNode.parentNode.dataset.isSlidingEvent;
                if (isSlidingEvent) return false;

                this.$router.push({name: 'category', params: {categoryId: this.category.id}});
            }
        }
    }
</script>