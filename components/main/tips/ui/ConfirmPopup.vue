<template>
    <BasePopup :text="text">
        <button class="yes" slot="buttons" @click="ok">Yes</button>
        <button class="cancel" slot="buttons" @click="cancel">Cancel</button>
    </BasePopup>
</template>

<script>
    import BasePopup from '../../../base/BasePopup';

    export default {
        name: 'ConfirmPopup',
        components: {BasePopup},
        props: {
            text: {type: String, default: 'Are you sure?'},
            onOk: {type: Function},
            onCancel: {type: Function},
        },
        methods: {
            ok() {
                this.onOk && this.onOk();
                this.$emit('ok');
                this.$emit('close');
            },
            cancel() {
                this.onCancel && this.onCancel();
                this.$emit('cancel');
                this.$emit('close');
            },
        }
    }
</script>

<style scoped>

</style>