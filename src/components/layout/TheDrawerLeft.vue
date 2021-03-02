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
          v-if="!loggedIn"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-login
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t('options.signup') }}
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
              {{ $t('options.login') }}
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
              {{ $t('options.logout') }}
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
          @click="newGameVsComputerDialogIsOpened = true"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-plus
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t('options.newComputerGame') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="newGameVsHumanDialogIsOpened = true"
          link
        >
          <v-list-item-action>
            <v-icon>
              mdi-plus
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t('options.newHumanGame') }}
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
              {{ $t('options.settings') }}
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
        <my-account-form
          @close="myAccountDialogIsOpened = false"
        />
      </v-dialog>

      <v-dialog
        v-model="newGameVsComputerDialogIsOpened"
        max-width="500"
      >
        <new-game-form-computer @close="newGameVsComputerDialogIsOpened = false"/>
      </v-dialog>

      <v-dialog
        v-model="newGameVsHumanDialogIsOpened"
        max-width="500"
      >
        <new-game-form-human @close="newGameVsHumanDialogIsOpened = false"/>
      </v-dialog>

    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  LayoutModule,
  UserModule,
} from '@/store/modules';

import NewGameFormComputer from '@/components/forms/NewGameFormComputer.vue';
import NewGameFormHuman from '@/components/forms/NewGameFormHuman.vue';
import SignupForm from '@/components/forms/SignupForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';
import MyAccountForm from '@/components/forms/MyAccountForm.vue';

@Component<TheDrawerLeft>({
  components: {
    NewGameFormComputer,
    NewGameFormHuman,
    SignupForm,
    LoginForm,
    MyAccountForm,
  },
})
export default class TheDrawerLeft extends Vue {
  public newGameVsComputerDialogIsOpened: boolean = false;
  public newGameVsHumanDialogIsOpened: boolean = false;
  public signupDialogIsOpened: boolean = false;
  public loginDialogIsOpened: boolean = false;
  public myAccountDialogIsOpened: boolean = false;

  get drawerLeftIsOpened() {
    return LayoutModule.drawerLeftIsOpened;
  }

  get loggedIn() {
    return UserModule.loggedIn;
  }

  get opened() {
    return this.drawerLeftIsOpened;
  }

  set opened(value: boolean) {
    LayoutModule.setDrawerLeft(value);
  }

  public logout() {
    UserModule.logout();
  }
}
</script>
