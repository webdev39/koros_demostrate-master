<template>
    <div class="buttons">
        <img @click="deactivateOrActivateFunc"
             class="deactivate"
             :src="data['deactivate']?'/img/icons/activate.svg':'/img/icons/stop.svg'"/>
        <router-link class="edit"
                     :to="{ name: 'editClass',
                            params: {classId: data.id},
                            query: { categoryName: data.category.name}
        }"
        >
            <img src="/img/icons/edit.svg"/>
        </router-link>
        <img @click="deleteFunc"
             class="delete" src="/img/icons/remove.svg"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import DeletePopup from './DeletePopup';

    export default {
        props: ['data'],
        data() {
            return {};
        },
        methods: {
            ...mapActions('classes', ['deactivateOrActivate']),
            deactivateOrActivateFunc() {
                let curObj = this;
                console.log('this.data ', this.data);
                this.deactivateOrActivate(this.data.id).then(function () {
                    curObj.$root.$emit('removerecord');
                });
            },
            async deleteFunc() {
                try {
                    console.log('this.data', this.data);
                    this.$modal.show(DeletePopup, {userId: this.data.id}, {
                        width: 350,
                        height: 262,
                        classes: 'add-user-modal',
                        scrollable: true,
                        clickToClose: false
                    });
                } catch (e) {
                }
            },
            selectLevel(value) {
                this.level = value;
            },
        }
    }
</script>