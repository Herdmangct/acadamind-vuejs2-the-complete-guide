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
    changeGameStatus() {
      this.gameStarted = !this.gameStarted;
      this.gameDialog = [];
      this.yourHealth = 100;
      this.monsterHealth = 100;
    },
    gameOver() {
      if (this.yourHealth <= 0 || this.monsterHealth <= 0) {
        this.changeGameStatus();
      }
    },
    attack() {
      this.damage = this.generateRandomNum();
      this.monsterHealth -= this.damage;
      this.gameDialog.push(this.generateGameDialog(false, "player", "monster"));
      this.monsterAttack();
      this.gameOver();
    },
    specialAttack() {
      this.damage = this.generateRandomNum() * 3;
      this.monsterHealth -= this.damage;
      this.gameDialog.push(this.generateGameDialog(true, "player", "monster"));
      this.monsterAttack();
      this.gameOver();
    },
    monsterAttack() {
      if (this.generateRandomNum === 7) {
        // special attack
        this.damage = this.generateRandomNum() * 3;
        this.yourHealth -= this.damage;
        this.gameDialog.push(
          this.generateGameDialog(true, "monster", "player")
        );
      } else {
        // normal attack
        this.damage = this.generateRandomNum();
        this.yourHealth -= this.damage;
        this.gameDialog.push(
          this.generateGameDialog(false, "monster", "player")
        );
      }
      this.gameOver();
    },
    generateGameDialog(isSpecial, player1, player2) {
      const result = isSpecial
        ? `Special Attack! ${player1} Hits ${player2} For ${this.damage}`
        : `${player1} Hits ${player2} For ${this.damage}`;
      return result.toUpperCase();
    },
    generateRandomNum() {
      return Math.floor(Math.random() * 10);
    }
  }
});
