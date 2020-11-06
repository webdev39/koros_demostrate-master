<template>
    <div class="location-select">
        <div class="row_edit">
            <div class="param">
                State
            </div>
            <div class="value">
                <div class="form-group">
                    <div class="select-group">
                        <base-dict-select name="state" @input="selectState" :options="statesList" v-model="state" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row_edit">
            <div class="param">
                City
            </div>
            <div class="value">
                <div class="form-group">
                    <div class="select-group">
                        <base-dict-select ref="citiesList" @input="selectCity"
                                          name="city"
                                          :options="locationsList" v-model="location" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data: function () {
            return {
                statesList: [],
                locationsList: [],

                locationsBuffer: [],

                location: null,
                state: null
            }
        },
        props: {
            initialState: {
                default: ''
            },
            initialCity: {
                default: ''
            },
        },
        watch: {
            state: function (val) {
                let curObj = this;
                this.locationsList = this.locationsBuffer.filter(function (data) {
                    if (data.state_id === curObj.state.id) {
                        return data;
                    }
                });
                this.$refs.citiesList.disabled = false;
            },
            initialState: function (data) {
                this.state = data;
            },
            initialCity: function (data) {
                this.location = data;
            },
        },
        created() {
            this.statesList = this.account.dictionary.result.states;
            this.locationsBuffer = this.account.dictionary.result.cities;
        },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        methods: {
            selectState(e) {
                this.$emit('selectState', {state: this.state});
                this.location = null;
            },
            selectCity(e) {
                this.$emit('selectCity', {city: this.location});
            }
        }
    };
</script>
