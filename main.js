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
    
    const corsOptions = { origin :"*" , optionsSuccessStatus : 200 ,  // some legacy browsers 
    } ; app.use ( cors ( corsOptions ) ) ;


    fetch('http://localhost:5000/api/games', {
      method: 'GET'
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    }).then(function (data) {
      console.log(data);
      console.log('try to post score');
    }).catch(function (error) {
      console.warn('Something went wrong.', error);
    });


  }
function ifNoCurrentPlayer() {
     
      console.log('no  current player')
      
}
addPlayer();


