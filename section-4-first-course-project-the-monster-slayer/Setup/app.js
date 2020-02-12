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
      this.gameDialog.unshift(
        this.generateGameDialog(false, "player", "monster", damage)
      );
      if (this.isGameOver()) return;

      this.monsterAttack();
    },
    specialAttack() {
      const damage = this.generateRandomNum();
      this.monsterHealth -= damage;
      this.gameDialog.unshift(
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
        this.gameDialog.unshift(
          this.generateGameDialog(true, "monster", "player", damage)
        );
      } else {
        // normal attack
        const damage = this.generateRandomNum();
        this.yourHealth -= damage;
        this.gameDialog.unshift(
          this.generateGameDialog(false, "monster", "player", damage)
        );
      }
      this.isGameOver();
    },
    heal() {
      const heal = this.generateRandomNum();
      if (this.yourHealth + heal < 100) {
        this.yourHealth += heal;
        // random monster healing
        if (this.generateRandomNum() === 7 && this.monsterHealth + heal < 100) {
          this.monsterHealth += heal;
        }
      }
    },
    generateGameDialog(type, player1, player2, damage) {
      const result = isSpecial
        ? `Special Attack! ${player1} Hits ${player2} For ${damage}`
        : `${player1} Hits ${player2} For ${damage}`;
      switch (type.toLowerCase) {
        case "special":
          return `Special Attack! ${player1} Hits ${player2} For ${damage}`;
        case "heal":
          return `${player1} Heals For `;
      }
      return result.toUpperCase();
    },
    generateRandomNum(specialDamage = 1) {
      return (Math.floor(Math.random() * 10) + 1) * specialDamage;
    }
  }
});
