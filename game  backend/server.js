const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const randomNum = () => {
  return Math.floor(Math.random() * 99 + 1);
};

let randomNumber = randomNum();
let guessChance;

console.log("Random number (for testing):", randomNumber);

const chooseMode = () => {
  console.log("Choose Mode");
  console.log("1. easy mode");
  console.log("2. medium mode");
  console.log("3. difficult mode");

  rl.question("Enter the number of your choice: ", (answer) => {
    if (['1', '2', '3'].includes(answer)) {
      setGuessCount(answer);
      startGame();
    } else {
      console.log("Invalid choice! Exiting...");
      rl.close();
    }
  });
};

const setGuessCount = (mode) => {
  if (mode === '1') guessChance = 8;
  else if (mode === '2') guessChance = 5;
  else if (mode === '3') guessChance = 3;

  console.log(`You have ${guessChance} chances to guess the correct number.`);
};

const startGame = () => {
  const askGuess = () => {
    rl.question("Guess the number (1-99): ", (input) => {
      const userGuess = parseInt(input);

      if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
        console.log("❌ Please enter a valid number between 1 and 99.");
        askGuess();
        return;
      }

      if (userGuess === randomNumber) {
        console.log("🎉 Congratulations! You guessed the correct number.");
        rl.close();
      } else {
        guessChance--;
        if (guessChance === 0) {
          console.log(`💀 You lost! The correct number was ${randomNumber}`);
          rl.close();
        } else {
          console.log(`❌ Wrong guess. You have ${guessChance} chance(s) left.`);
          askGuess();
        }
      }
    });
  };

  askGuess();
};

chooseMode();
