<template>
    <div :class="{'tips-list': true, 'is-mobile': isMobile}">
        <!--<router-link :to="itemRoute" v-for="tip in tips" :key="tip.id">
                <grid-line-wide :item="tip">

                </grid-line-wide>
            </router-link>-->

        <div class="grid-list">
            <grid-line-wide v-for="tip in tips" :key="tip.id" :item="tip" :has-bookmark="true" :has-play="true" @play="onPlay" @bookmark="onBookmark">
                <template slot="manage.actions">
                    <div class="live-classes">
                        <div class="class-management">
                            <!--<div :class="{'management-action': true, 'disabled': !(isAdmin || tip.is_own)}">
                                <div class="action-icon btn-bookmark" title="Bookmark" @click="bookmark(tip, $event)" :key="'bookmark'">
                                    @todo User bookmark
                                </div>
                            </div>-->
                            <div :class="{'management-action': true, 'disabled': !(isAdmin || tip.is_own)}" style="height: 21px;">
                                <div class="action-icon btn-deactivate" title="Deactivate" @click="deactivate(tip, $event)" v-if="tip.is_active" :key="'deactivate'">
                                    <i class="fas fa-ban"></i>
                                    <!--<img src="/img/icons/stop.svg" />-->
                                </div>
                                <div class="action-icon btn-activate" title="Activate" @click="activate(tip, $event)" v-if="!tip.is_active" :key="'activate'">
                                    <i class="fas fa-ban"></i>
                                    <!--<img src="/img/icons/activate.svg" />-->
                                </div>
                            </div>
                            <div :class="{'management-action': true, 'disabled': !(isAdmin || tip.is_own)}">
                                <div class="action-icon" @click="edit(tip, $event)">
                                    <i class="fas fa-edit"></i>
                                </div>
                            </div>
                            <div :class="{'management-action': true, 'disabled': !(isAdmin || tip.is_own)}">
                                <div class="action-icon" @click="onDelete(tip, $event)">
                                    <svg width="18px" height="17px"><use href="#close-icon"></use></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </grid-line-wide>
        </div>

    </div>
</template>

<script>
    import TipsView from './TipsView';
    import BaseClassRating from '../../base/BaseClassRating';
    import GridLineWide from './ui/GridLineWide';
    import MobileWidthMixin from '../../../mixins/MobileWidthMixin';
    import {mapGetters, mapMutations} from 'vuex';
    import {api} from '../../../helpers';
    import TipForm from './TipForm';
    import ConfirmPopup from './ui/ConfirmPopup';

    export default {
        name: 'TipsList',
        mixins: [MobileWidthMixin],
        components: {TipForm, GridLineWide, BaseClassRating},
        props: {
            filters: {type: Object},
        },
        watch: {
            filters: {
                handler: function (/*val, oldVal*/) {
                    this.loadTips();
                },
                deep: true
            },
        },
        data() {
            return {
                tipsResponse: {result: {}}
            };
        },
        computed: {
            ...mapGetters({
                isUser: 'account/isUser',
                isAdmin: 'account/isAdmin',
                isInstructor: 'account/isInstructor',
            }),
            itemRoute() {
                return { name: 'adminTips', params: { id: TipsView } };
            },
            tips: {
                get() { return this.tipsResponse.result.data; },
            },
        },
        mounted() {
            this.loadTips();
        },
        methods: {
            ...mapMutations({
                alertError: 'alert/error',   // @todo Why this isn't a global library `alert` or `notice`?
                alertSuccess: 'alert/success',
            }),
            async loadTips() {
                let params = {
                    page: 1,
                    ...this.filters
                };
                let response = await api.get('tips', {params: params});

                this.$set(this, 'tipsResponse', response.data);
            },
            async activate(tip, e) {
                if (!(this.isAdmin || tip.is_own)) return false; // @todo Move to TipModel
                await api.post(`tips/${tip.id}/activate`).then(response => {
                    tip.is_active = true;
                    this.alertSuccess('The tip was activated');
                }).catch(err => {
                    this.alertError(err);
                });
            },
            async deactivate(tip, e) {
                if (!(this.isAdmin || tip.is_own)) return false; // @todo Move to TipModel

                await api.post(`tips/${tip.id}/deactivate`).then(response => {
                    tip.is_active = false;
                    this.alertSuccess('The tip was deactivate');
                }).catch(err => {
                    this.alertError(err);
                });
            },
            edit(tip, e) {
                if (!(this.isAdmin || tip.is_own)) return false;

                this.$modal.show(TipForm, {
                    tipId: tip.id,
                    item: tip,
                    onSaved: () => {
                        this.loadTips();
                    },
                }, {
                    name: 'TipFormModal',
                    width: 508,
                    height: 'auto',
                    classes: ['add-record-modal'],
                    scrollable: true,
                    clickToClose: false
                })
            },
            async onDelete(tip, e) {
                if (!(this.isAdmin || tip.is_own)) return false;

                // @todo Move to global mixin-method confirmPopup. Use as `this.$modal.show('dialog', {buttons: [{}, {}]})`, see: http://bit.ly/2HiWGw8
                this.$modal.show(ConfirmPopup, {
                    text: 'Do you want to remove this tip?',
                    onOk: async () => {
                        await this.deleteTip(tip.id);
                    },
                    onCancel: async () => {
                        // @note Your code..
                    }
                }, {
                    width: 350,
                    height: 262,
                    classes: 'add-user-modal',
                    clickToClose: false
                });
            },
            async deleteTip(id) {
                await api.delete(`tips/${id}`);
                await this.loadTips();
            },
            onPlay({item}) {
                console.log('onPlay:', item);
                api.post(`tips/${item.id}/watch`).then(response => {
                    console.log('response:', response.data);
                });
            },
            onBookmark({item}) {
                let params = {type: 'tip', id: item.id, status: item.is_favorite};
                api.post(`favorite/save`, params).then(response => {
                    item.is_favorite ? this.alertSuccess('The tip was added to favorite') : this.alertSuccess('The tip was deleted from favorite');
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .tips-list { width: 100%; }
    .btn-activate { color: #c42f6f; }
</style>