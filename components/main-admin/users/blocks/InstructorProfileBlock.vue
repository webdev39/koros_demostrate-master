<template>
    <div class="block block_double" :class="className">
        <slot name="topRight"></slot>
        <slot name="title"></slot>
        <div class="avatar-wrap">
            <div class="left">
                <BaseAvatar v-if="editable" :haveUpload="true" width="103px"
                            height="103px" :url="photo" ref="photo"/>
                <BaseAvatar v-else :haveUpload="false" width="103px"
                            height="103px" :url="photo" ref="photo"/>
                <div v-if="!editable" class="block__name">
                    {{ firstName }} {{ lastName }}
                </div>
                <div v-if="!editable" class="block__geo">
                    {{ city }}
                </div>
                <slot name="leftInfoBlocks"></slot>
            </div>
            <div v-if="hasSubprofile" class="right">
                <BaseAvatar v-if="editable" :haveUpload="true" width="103px"
                            height="103px" :url="photoSubprofile" ref="photoSubprofile"/>
                <BaseAvatar v-else :haveUpload="false" width="103px"
                            height="103px" :url="photoSubprofile" ref="photoSubprofile"/>
                <div v-if="!editable" class="block__name">
                    {{ firstNameSubprofile }} {{ lastNameSubprofile }}
                </div>
                <div v-if="!editable" class="block__geo">
                    {{ citySubprofile }}
                </div>
                <slot name="rightInfoBlocks"></slot>
            </div>
        </div>
        <slot name="infoBlocks"></slot>
        <slot name="bottomBlock"></slot>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
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
            firstNameSubprofile: {
                type: String,
                default: ''
            },
            lastNameSubprofile: {
                type: String,
                default: ''
            },
            citySubprofile: {
                type: String,
                default: ''
            },
            photoSubprofile: {
                default: null
            },
            className: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: false
            },
            hasSubprofile: {
                default: false
            }
        },
        methods: {}
    };
</script>