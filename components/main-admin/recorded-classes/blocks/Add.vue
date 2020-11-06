<template>
    <div class="record-add">
        <div @click="closeModal" class="close">
            <i class="fas fa-times"></i>
        </div>
        <div class="title">Create Recorded Class</div>
        <div class="record-add__info">
            <div class="photo__wrap">
                <div class="label">Thumbnail<br>Photo</div>
                <BaseVideoPlayer
                        className="recorded_class_thumbnail add_recorded_class_thumbnail"
                        width="102px" height="102px"
                        :haveUpload="true" ref="video"/>
            </div>
            <div class="fields">
                <div class="name_wrap">
                    <div class="input__wrap">
                        <div class="label">Title</div>
                        <div class="form-group">
                            <input v-model="title" type="text" autocomplete="off"
                                   class="form-input input__title_name" name="title">
                        </div>
                    </div>
                </div>
                <div class="input__wrap">
                    <div class="label">Instructor</div>
                    <div class="form-group">
                        <base-select
                                :labelFormatter="function(value) {
                                    return !!value?value.first_name + ' ' + value.last_name:null;
                                }"
                                :list="instructors"
                                v-model="instructorModel"
                                className="form-input instructor_autocomplete"
                                name="instructor"/>
                    </div>
                </div>
                <div class="input__wrap">
                    <div class="label">Level</div>
                    <div class="form-group">
                        <div class="select-group">
                            <base-dict-select
                                    @input="selectLevel" :options="proficiencyLevelList"
                                    v-model="level" name="level"/>
                        </div>
                    </div>
                </div>
                <div class="input__wrap description">
                    <div class="label">Description</div>
                    <div class="form-group">
                        <textarea
                                v-model="description" class="form-input"
                                name="description" cols="45"/>
                    </div>
                </div>
            </div>
        </div>
        <button @click="addRecord" class="add">
            Add
        </button>
    </div>
</template>
<script>
    import {mapActions, mapState} from 'vuex';
    import Autocomplete from 'vuejs-auto-complete';
    import {authHeader} from '../../../../helpers';
    import {store} from "../../../../store";

    export default {
        props: ['category'],
        data() {
            return {
                title: '',
                description: '',
                level: this.proficiencyLevelList !== undefined ? this.proficiencyLevelList[0] : {id: '', name: ''},
                instructorModel: null,
                instructor: '',
                videoAwsUrl: ''
            };
        },
        components: {
            Autocomplete,
        },
        computed: {
            ...mapState('account', {
                proficiencyLevelList: state => state.dictionary.result ? state.dictionary.result.proficiency_level : [],
            }),
            ...mapState({
                instructors(state) {
                    return state.users.all.items ? state.users.all.items : [];
                }
            }),
            authHeaders() {
                return authHeader();
            },
        },
        mounted() {
            this.getAll({page: 1, params: {role: 3}});
            this.$root.$on('selected', (data) => {
                this.instructor = data;
            });
            this.$root.$on('uploadvideo', async (data) => {
                try {
                    store.commit('ui/startRouteLoading', null, {root: true});
                    this.videoAwsUrl = await this.uploadVideo({url: data.link, file: this.$refs.video.video});
                    store.commit('ui/endRouteLoading', null, {root: true});
                } catch (err) {
                    store.commit('ui/endRouteLoading', null, {root: true});
                }
            });
        },
        destroyed() {
            this.$root.$off('uploadvideo');
        },
        methods: {
            ...mapActions('classes', ['add', 'uploadVideo']),
            ...mapActions('users', ['getAll']),
            async addRecord() {
                const {title, description, level, instructor, category} = this;
                const photo = this.$refs.video.photo;
                store.commit('ui/startRouteLoading', null, {root: true});
                try {
                    let obj = {
                        title, description, level: level.id,
                        instructor: instructor.id, category, photo, videoAwsUrl: this.videoAwsUrl
                    };
                    var data = await this.add(obj);
                    console.log('success. record add');
                    store.commit('ui/endRouteLoading', null, {root: true});
                } catch (e) {
                    console.log('error', e);
                    store.commit('ui/endRouteLoading', null, {root: true});
                    return;
                }
                this.$emit('close');
                this.$root.$emit('removerecord');
            },
            selectLevel(value) {
                this.level = value;
            },
            closeModal() {
                this.$emit('close');
            },
        }
    }
</script>