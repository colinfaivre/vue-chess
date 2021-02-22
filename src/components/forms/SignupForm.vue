<template>
  <v-card>
    <v-card-title class="headline">
      Sign up
    </v-card-title>

    <v-card-text>
      <div class="mt-0 mb-10">
        Create your Vue chess account to play with anybody around the world.
        You already have an account ? Click <a>here</a> to log in.
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
        @click="close()"
        color="blue-grey darken-3"
        text
      >
        Cancel
      </v-btn>

      <v-btn
        @click="signup()"
        color="blue-grey darken-3"
        class="white--text"
      >
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  UserModule,
} from '@/store/modules';

import {
  ISignupUserRequestParams,
} from '@/types/store/user';

@Component<SignupForm>({})
export default class SignupForm extends Vue {
  public email: string = '';
  public password: string = '';
  public showPassword: boolean = false;

  public rules = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters',
  }

  public close(): void {
    this.$emit('close');
  }

  public signup() {
    const signupUserParams: ISignupUserRequestParams = {
      email: this.email,
      password: this.password,
    };

    UserModule
      .signup(signupUserParams)
      .then(() => {
        this.close();
      });
  }
}
</script>
