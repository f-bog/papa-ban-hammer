// sound effects
const punchSound = new Audio('./punch.mp3');

// get images for game
const yodan = document.querySelector('.yodan');
const papa = document.querySelector('.papa');

// get width and height of body
const body = document.querySelector('body');
const bodyWidth = body.offsetWidth;
const bodyHeight = body.offsetHeight;

// score variable
let score = 0;

// Movement variables
let x = 0;
let y = 0;
const speed = 50;
let flipped = false;
let rotate = 0;

// Yodans random movement variables
let yodanX = Math.floor(Math.random() * bodyWidth + 1);
let yodanY = Math.floor(Math.random() * bodyHeight + 1);

// set yodans position on load
yodan.setAttribute(
  'style',
  `
    --rotateX: ${flipped ? '180deg' : '0'};
    --yodanX: ${yodanX}px;
    --yodanY: ${yodanY}px;
    --rotate: ${rotate}deg;
  `
);

// function to trigger on keydown
function handleKeyDown(e) {
  if (!e.key.includes('Arrow')) {
    return;
  }

  let rect1 = papa.getBoundingClientRect();
  let rect2 = yodan.getBoundingClientRect();
  switch (e.key) {
    case 'ArrowUp':
      y = y - 1;
      rotate = 90;
      break;
    case 'ArrowDown':
      y = y + 1;
      yodanX = yodanY = rotate = -90;
      break;
    case 'ArrowLeft':
      x = x - 1;
      rotate = 0;
      flipped = false;
      break;
    case 'ArrowRight':
      x = x + 1;
      rotate = 0;
      flipped = true;
      break;
    default:
      console.log('That is not a valid move');
      break;
  }
  // update papa
  papa.setAttribute(
    'style',
    `
    --rotateX: ${flipped ? '180deg' : '0'};
    --x: ${x * speed}px;
    --y: ${y * speed}px;
    --rotate: ${rotate}deg;
  `
  );

  // Check if papa and yodan overlap
  let overlap = !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
  // if overlap, change yodans position, play sound,nand add to score
  if (overlap) {
    function handleYodan() {
      return yodan.setAttribute(
        'style',
        `
          --rotateX: ${flipped ? '180deg' : '0'};
    --yodanX: ${Math.floor(Math.random() * bodyWidth) + 1}px;
    --yodanY: ${Math.floor(Math.random() * 500) + 1}px;
    --rotate: ${rotate}deg;
  `
      );
    }
    punchSound.play();
    score++;
    console.log(score);
    handleYodan();
  }
  document.querySelector('.score').textContent = `score: ${score}`;
}

window.addEventListener('keydown', handleKeyDown);
