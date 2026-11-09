const quoteText = document.querySelector("#quote-text");
const quoteAuthor = document.querySelector("#quote-author");
const quoteButton = document.querySelector("#new-quote");

const quotes = [
  ["The secret of getting ahead is getting started.", "Mark Twain"],
  ["It always seems impossible until it is done.", "Nelson Mandela"],
  ["The future depends on what you do today.", "Mahatma Gandhi"],
  ["Small steps every day can make a big change.", "A simple learning idea"]
];

if (quoteButton) {
  let quoteIndex = 0;
  quoteButton.addEventListener("click", () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.textContent = quotes[quoteIndex][0];
    quoteAuthor.textContent = quotes[quoteIndex][1];
  });
}

const startButton = document.querySelector("#start-game");
const target = document.querySelector("#game-target");
const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time-left");
const gameMessage = document.querySelector("#game-message");

if (startButton && target) {
  let score = 0;
  let timeLeft = 20;
  let timer;

  function moveTarget() {
    const board = target.parentElement;
    const maxX = board.clientWidth - target.offsetWidth;
    const maxY = board.clientHeight - target.offsetHeight;
    target.style.left = `${Math.max(0, Math.random() * maxX)}px`;
    target.style.top = `${Math.max(0, Math.random() * maxY)}px`;
    target.style.transform = "none";
  }

  function endGame() {
    window.clearInterval(timer);
    target.disabled = true;
    startButton.disabled = false;
    gameMessage.textContent = `Time is up! Your final score is ${score}.`;
  }

  startButton.addEventListener("click", () => {
    score = 0;
    timeLeft = 20;
    scoreText.textContent = score;
    timeText.textContent = timeLeft;
    gameMessage.textContent = "Click the star as many times as you can!";
    target.disabled = false;
    startButton.disabled = true;
    moveTarget();

    timer = window.setInterval(() => {
      timeLeft -= 1;
      timeText.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  });

  target.addEventListener("click", () => {
    if (target.disabled) return;
    score += 1;
    scoreText.textContent = score;
    moveTarget();
  });
}
