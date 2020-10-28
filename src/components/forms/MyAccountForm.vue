<template>
  <v-card>
    <v-card-title class="headline">
    My account
    </v-card-title>
    
    <v-card-text>
      <div class="mt-0 mb-10">
        Add some information about you. This will be visible when other players choose to play with you.
      </div>

      <v-text-field
        v-model="firstName"
        label="First name"
      />

      <v-text-field
        v-model="lastName"
        label="Last name"
      />

      <v-text-field
        v-model="age"
        label="Age"
      />

      <v-textarea
        v-model="bio"
        label="About me"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      
      <v-btn
        @click="cancel()"
        color="blue-grey darken-3"
        text
      >
        Cancel
      </v-btn>

      <v-btn
        color="blue-grey darken-3"
        class="white--text"
      >
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component<MyAccountForm>({
  components: {
  },
})
export default class MyAccountForm extends Vue {
  public firstName: string = '';
  public lastName: string = '';
  public age: string = '';
  public bio: string = '';

  public rules = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters',
  }

  public cancel(): void {
    this.$emit('close');
  }
}
</script>
