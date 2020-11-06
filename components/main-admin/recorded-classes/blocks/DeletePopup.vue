<template>
    <BasePopup>
        <button class="yes" slot="buttons" @click="accept">Yes</button>
        <button class="cancel" slot="buttons" @click="deciline">Cancel</button>
    </BasePopup>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        props: {
            userId: {
                type: Number
            }
        },
        methods: {
            ...mapActions('classes', ['delete']),
            async accept() {
                try {
                    await this.delete(this.userId).then(
                        (res) => {
                            this.$root.$emit('removerecord');
                            this.$emit('close');
                        }
                    );
                } catch (e) {}
            },
            deciline() {
                this.$emit('close');
            }
        }
    }
</script>