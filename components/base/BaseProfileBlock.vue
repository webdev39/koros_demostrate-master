<template>
    <div class="block" :class="className">
        <slot name="topRight"></slot>
        <slot name="title"></slot>
        <BaseAvatar v-if="editable" :haveUpload="true" width="103px" height="103px" :url="photo" ref="photo"/>
        <BaseAvatar v-else :haveUpload="false" width="103px" height="103px" :url="photo" ref="photo"/>
        <div v-if="!editable" class="block__name">
            {{ firstName }} {{ lastName }}
        </div>
        <div v-if="!editable" class="block__geo">
            {{ city }}
        </div>
        <slot name="infoBlocks"></slot>
        <slot name="bottomBlock"></slot>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
        props: {
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            city: {
                type: String,
                default: ''
            },
            photo: {
                default: null
            },
            className: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: false
            }
        }
    };
</script>