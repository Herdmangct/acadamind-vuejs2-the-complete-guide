new Vue({
  el: "#app",
  data: {
    gameStarted: false,
    yourHealth: 100,
    monsterHealth: 100,
    gameDialog: []
  },
  methods: {
    changeGameStatus(gameStarted = !this.gameStarted) {
      this.gameStarted = gameStarted;
      this.gameDialog = [];
      this.yourHealth = 100;
      this.monsterHealth = 100;
    },
    isGameOver() {
      if (this.monsterHealth <= 0) {
        if (confirm("You Win! New Game?")) {
          this.changeGameStatus(true);
        } else {
          this.gameStarted = false;
        }
      } else if (this.yourHealth <= 0) {
        if (confirm("Monster Wins! New Game?")) {
          this.changeGameStatus(true);
        } else {
          this.gameStarted = false;
        }
      }
    },
    attack() {
      const damage = this.generateRandomNum();
      this.monsterHealth -= damage;
      this.gameDialog.push(
        this.generateGameDialog(false, "player", "monster", damage)
      );

      if (this.isGameOver()) return;

      this.monsterAttack();
    },
    specialAttack() {
      const damage = this.generateRandomNum();
      this.monsterHealth -= damage;
      this.gameDialog.push(
        this.generateGameDialog(true, "player", "monster", damage)
      );

      if (this.isGameOver()) return;

      this.monsterAttack();
    },
    monsterAttack() {
      if (this.generateRandomNum() === 7) {
        // special attack
        const damage = this.generateRandomNum(3);
        this.yourHealth -= damage;
        this.gameDialog.push(
          this.generateGameDialog(true, "monster", "player", damage)
        );
      } else {
        // normal attack
        const damage = this.generateRandomNum();
        this.yourHealth -= damage;
        this.gameDialog.push(
          this.generateGameDialog(false, "monster", "player", damage)
        );
      }
      this.isGameOver();
    },
    heal() {
      if (this.yourHealth < 100) {
        this.yourHealth += this.generateRandomNum();
        this.yourHealth = this.yourHealth > 100 ? 100 : this.yourHealth;
        if (this.generateRandomNum() === 7 && this.monsterHealth < 100) {
          this.monsterHealth += this.generateRandomNum();
        }
      }
    },
    generateGameDialog(isSpecial, player1, player2, damage) {
      const result = isSpecial
        ? `Special Attack! ${player1} Hits ${player2} For ${damage}`
        : `${player1} Hits ${player2} For ${damage}`;
      return result.toUpperCase();
    },
    generateRandomNum(specialDamage = 1) {
      return (Math.floor(Math.random() * 10) + 1) * specialDamage;
    }
  }
});
