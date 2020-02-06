new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    yourHealth: 100,
    monsterHealth: 100
  },
  methods: {
    startGame() {
      this.gameStarted = !this.gameStarted;
    },
    attack() {
      this.monsterHealth -= 10;
      monsterAttack();
    },
    monsterAttack() {
      const randomNum = Math.floor(Math.random() * 10);
      if (randomNum === 7) {
        // special attack
        this.yourHealth -= 30;
      } else {
        // normal attack
        this.yourHealth -= 10;
      }
    }
  }
});
