<template>
    <v-navigation-drawer
      v-model="opened"
      app
      color="blue-grey darken-4"
      dark
    >
      <v-list dense>
        <v-list-item class="pt-1 pb-3">
            <v-icon color="blue-grey">
                mdi-chess-knight
            </v-icon>

            <h3 class="ml-2 blue-grey--text">
              Vue chess
            </h3>
        </v-list-item>

        <v-divider/>

        <v-list-item
          @click="signupDialogIsOpened = true"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-login
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Sign up
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="loginDialogIsOpened = true"
          v-if="!loggedIn"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-account
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Log in
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item
          @click="logout"
          v-if="loggedIn"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-logout
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              Log out
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="myAccountDialogIsOpened = true"
          v-if="loggedIn"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-card-account-details
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              My account
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item
          @click="newGameDialogIsOpened = true"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-plus
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              New game
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>
              mdi-cog
            </v-icon>
          </v-list-item-action>
          
          <v-list-item-content>
            <v-list-item-title>
              Settings
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-dialog
        v-model="signupDialogIsOpened"
        max-width="500"
      >
        <signup-form @close="signupDialogIsOpened = false"/>
      </v-dialog>

      <v-dialog
        v-model="loginDialogIsOpened"
        max-width="500"
      >
        <login-form @close="loginDialogIsOpened = false"/>
      </v-dialog>

      <v-dialog
        v-model="myAccountDialogIsOpened"
        max-width="500"
      >
        <my-account-form @close="myAccountDialogIsOpened = false"/>
      </v-dialog>

      <v-dialog
        v-model="newGameDialogIsOpened"
        max-width="500"
      >
        <new-game-form @close="newGameDialogIsOpened = false"/>
      </v-dialog>

    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { namespace } from 'vuex-class';
import { getModule } from 'vuex-module-decorators';

import {
  LayoutModule,
  UserModule,
} from '@/store/modules';
const layoutModule = namespace('layout');
const userModule = namespace('user');

import NewGameForm from '@/components/forms/NewGameForm.vue';
import SignupForm from '@/components/forms/SignupForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';
import MyAccountForm from '@/components/forms/MyAccountForm.vue';

@Component<TheDrawerLeft>({
  components: {
    NewGameForm,
    SignupForm,
    LoginForm,
    MyAccountForm,
  },
})
export default class TheDrawerLeft extends Vue {
  public newGameDialogIsOpened: boolean = false;
  public signupDialogIsOpened: boolean = false;
  public loginDialogIsOpened: boolean = false;
  public myAccountDialogIsOpened: boolean = false;

  @layoutModule.State
  private drawerLeftIsOpened!: boolean;

  @userModule.Getter
  private loggedIn!: boolean;

  get opened() {
    return this.drawerLeftIsOpened;
  }

  set opened(value: boolean) {
    const layoutModule = getModule(LayoutModule, this.$store);
    layoutModule.setDrawerLeft(value);
  }

  public logout() {
    const userModule = getModule(UserModule, this.$store);
    
    userModule.logout()
  } 
}
</script>
