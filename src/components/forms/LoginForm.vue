<template>
  <v-card>
    <v-card-title class="headline">
      Login
    </v-card-title>
    
    <v-card-text>
      <div class="mt-0 mb-10">
        Login to you Vue chess account to play with anybody around the world.
        You don't have an account yet ? Click <a>here</a> to sign up.
      </div>

      <v-text-field
        v-model="email"
        label="Email"
      />

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        counter
        @click:append="showPassword = !showPassword"
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

@Component<LoginForm>({
  components: {
  },
})
export default class LoginForm extends Vue {
  public email: string = '';
  public password: string = '';
  public showPassword: boolean = false;

  public rules = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters',
  }

  public cancel(): void {
    this.$emit('close');
  }
}
</script>
