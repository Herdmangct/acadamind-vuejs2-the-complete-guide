new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    yourHealth: 100,
    monsterHealth: 100,
    gameDialog: [],
    damage: 0
  },
  methods: {
    startGame() {
      this.gameStarted = !this.gameStarted;
      this.gameDialog = [];
      this.yourHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      this.monsterHealth -= 10;
      this.monsterAttack();
    },
    monsterAttack() {
      const randomNum = Math.floor(Math.random() * 10);
      if (randomNum === 7) {
        // special attack
        this.damage = 30;
        this.yourHealth -= this.damage;
        this.gameDialog.push(
          `Special Attack! Monster Hits Player For ${this.damage}`
        );
      } else {
        // normal attack
        this.damage = 10;
        this.yourHealth -= this.damage;
        this.gameDialog.push(`Monster Hits Player For ${this.damage}`);
      }
    }
  }
});
