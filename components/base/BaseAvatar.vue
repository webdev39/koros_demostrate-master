<template>
    <div :class="className">
        <div class="block__photo" :style="avatarSize">
            <i class="fas fa-camera icon"/>
            <div class="photo" v-if="mutatedUrl !== null"
                 :style="[{backgroundImage: 'url(' + mutatedUrl + ')'}, avatarSize]"
            >
            </div>
            <div class="photo" v-else
                 :style="[{backgroundImage: 'url(' + url + ')'}, avatarSize]"
            >
            </div>
            <div class="delete-photo" v-if="mutatedUrl && haveUpload" @click="deleteImage">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </div>
        </div>
        <div class="change-photo" v-if="haveUpload">
            <label @click="trigger">Change Photo</label>
            <input
                    type="file"
                    id="file"
                    accept=".jpg,.jpeg,.png"
                    ref="fileInput"
                    @change="uploadFile"
            />
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data: function () {
            return {
                mutatedUrl: this.url,
                photo: null
            }
        },
        props: {
            url: {
                type: String,
                default: null
            },
            haveUpload: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: '42px'
            },
            height: {
                type: String,
                default: '42px'
            },
            className: {
                type: String,
                default: 'avatar'
            }
        },
        computed: {
            avatarSize() {
                return {
                    width: this.width,
                    height: this.height
                };
            }
        },
        watch: {
            url: function (val) {
                this.mutatedUrl = val;
            }
        },
        methods: {
            ...mapActions('account', ['deletePhoto']),
            deleteImage(e) {
                if (this.mutatedUrl) {
                    this.mutatedUrl = '';
                    this.photo = '';
                }
            },
            uploadFile(e) {
                this.photo = this.$refs.fileInput.files[0];
                this.mutatedUrl = URL.createObjectURL(this.photo);
            },
            trigger() {
                this.$refs.fileInput.click();
            }
        }
    };
</script>
