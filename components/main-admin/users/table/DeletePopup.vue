<template>
    <BasePopup text="Do you want to remove this class?">
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
           ...mapActions('users', ['delete']),
           async accept() {
               try {
                   await this.delete(this.userId);
                   this.$root.$emit('removeuser');
               }
               catch (e) {
               }
               this.$emit('close');
           },
           deciline() {
               this.$emit('close');
           }
       }
   }
</script>