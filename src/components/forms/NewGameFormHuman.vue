<template>
  <v-card>
    <v-card-title class="headline">
      New game VS human
    </v-card-title>

    <v-card-text>
      <div class="mt-0 mb-10">
        Choose your opponent among the players list.
      </div>

      <v-radio-group
        v-model="users"
        label="Players :"
      >
        <v-radio
          v-for="user in users"
          :key="user._id"
          :label="`${user.email}`"
          :value="user.email"
        />
      </v-radio-group>
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
        @click="start()"
        color="blue-grey darken-3"
        class="white--text"
      >
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule, BoardModule, StockfishModule } from '@/store/modules';

@Component<NewGameFormHuman>({})
export default class NewGameFormHuman extends Vue {
  public levels = [
    {
      name: 'Easy',
      value: 1,
    },
    {
      name: 'Medium',
      value: 2,
    },
    {
      name: 'Hard',
      value: 3,
    },
  ]

  get users() {
    return UserModule.users;
  }

  // get level() {
  //   return this.computerLevel;
  // }

  // set level(value: number) {
  //   StockfishModule.setComputerLevel(value);
  // }

  public cancel(): void {
    this.$emit('close');
  }

  public start(): void {
    this.$emit('close');
    // BoardModule.startNewGame();
  }

  public created() {
    UserModule.getAllUsers();
  }
}
</script>
