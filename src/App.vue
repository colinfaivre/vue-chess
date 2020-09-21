<template>
  <v-app>
    <v-app-bar
      app
      color="brown darken-3"
      dark
    >
      <div class="d-flex align-center">
        <v-icon>
          mdi-chess-knight
        </v-icon>

        <h3>Vue-chess</h3>
      </div>

      <v-spacer/>
    </v-app-bar>

    <v-main>
      <board/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Board from './components/Board.vue';

@Component<App>({
  components: {
    Board,
  },
})
export default class App extends Vue {
  public noteDialog: boolean = false;
  public commentDialog: boolean = false;
  public tab: number = 0;
}
</script>
