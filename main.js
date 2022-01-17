const playerName = document.querySelector(".playerName");
const addButton = document.querySelector(".addButton");



//eventListeners

// addButton.addEventListener('click', addPlayer);
// playerName.addEventListener("keyup", (e) => {
//     if (e.key === "Enter") {
//       console.log('new player enter');
//       addPlayer();
//     }
//   });

//functions
function addPlayer(event) {
    // console.log(playerName.value);
    // event.preventDefault();
    const player = localStorage.getItem('Best-Player');
    localStorage.setItem('Player-Name', player);
    console.log(`Best Player :${player}`);
    console.log(`stored game BestScore : ${localStorage.getItem('bestScore')}`)
    

    // fetch('http://localhost:5000/api/scores', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({game: 'Test game', playerName: 'Anna', score: 10000}) 
    // }).then((response) => response.json())
    //   .then((data) =>console.log(data))
    //   .catch( (error) =>console.warn('Something went wrong.', error));
  }

function ifNoCurrentPlayer() {
     
      console.log('no  current player')
      
}