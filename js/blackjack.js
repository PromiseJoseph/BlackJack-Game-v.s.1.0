
const newCard = document.querySelector(".newcard");

const newBut=document.querySelector(".start")

const restartGme = document.querySelector(".restart")

const Cards = document.querySelector(".cards")

const Sums = document.querySelector(".sum")

const earnDsp = document.querySelector(".earnings")

const withdraw = document.querySelector(".withdraw")

const continuePly = document.querySelector('.continue')

const fundGme = document.querySelector('.fund')

const endGme = document.querySelector('.endgame')

const Content= document.querySelector('.content')

const itemEl = document.querySelector(".main-container")

console.log(newCard,newBut,restartGme,Cards,Sums,earnDsp,withdraw,Content)
 
let Card = []

let currentEarn = 200;

var losses = []

var wons = []

var funds =[]

let earnings = new Map();


//     console.log(localStorage.getItem(wons));
//     console.log(localStorage.getItem(losses));
//     console.log(localStorage.getItem(earnings));

// console.log(Card)
let drawCrd=`let play a new game`

let alive= false;

let blackjack=false


let msg = `Let's play a new game`
let sum = 0


console.log(sum)

earnDsp.value =`$ ${currentEarn}`;

restartGme.style.display= 'none'

newCard.style.display = 'none'

withdraw.style.display = 'none'

continuePly.style.display ='none'

endGme.style.display = 'none'

fundGme.style.display = 'none'


console.log(newBut)

chckSetStatuse();

/*=== card sum random number generator  ===*/

function randomNum(){
  let random = Math.floor(Math.random()*10)
  console.log(random)
 
  if(random === 1){
    return 11
  }

   else if(random > 7){
    return 5
  }

  else {
    return random;
  }

}/*=== end of randomNum()  ===*/


/*=== method that controls the game play interphase with the execution of truthy statement, 
      checking to set for black jack through sum  variance ===*/

function Game(){

     Cards.textContent= `Cards: `
      console.log(Cards)

      for(i=0;i<Card.length;i++){
        
        Cards.textContent += " " + Card[i]
      }

      Sums.textContent= ` sum: ${sum}`

      if(sum < 21){

      msg = `Do you wish to draw a new card!`

      newBut.style.display="none"

      newCard.style.display = "block"

      withdraw.style.display = "none"
      
    }

    else if(sum===21){
        msg= `You have black jack`

        blackjack = true

        newBut.style.display="none"

        newCard.style.display = "none"

        withdraw.style.display = "block"

        // restartGme.textContent =  "CONTINUE PLAYING"
         
        continuePly.style.display = 'block'

        // newBut.textContent="Withdraw"// text content not valid
          endRound();

          chckSetStatuse();

         restartGme.textContent=  "CONTINUE PLAYING"
    }
    else if(sum > 21){
        msg= `SORRY! game over`

          blackjack = false;

        newBut.style.display="none"

        newCard.style.display ="none"

         restartGme.textContent=  "RESTART"

       restartGme.style.display= 'block'// not valid
      

       endRound()
    }

    Content.textContent = `${msg}`
}/*=== end of Game() ===*/


/*=== method for new game only executed once at the begining of the game  
      also sets alive to true===*/

function startGme(){
    alive = true

    funds.push(200) //  currentEarn could be manipulated thus 200 is pushed automatically

     earnings.set('funds',funds)   

    let crdOne= randomNum()

    sum+= crdOne 

    Card=[crdOne]   

    Game()

}/*=== end of startGme()  ===*/



/*=== method for new new card re-occurrence ===*/

function drwNew(){
    let newcard= randomNum()

    sum+=newcard

    Card.push(newcard)

    Game();
}/*end of drwNew()


/*=== restar function for the restart button
     reoccurring events that deal with restarting  ===*/

function restart(){
   
   
   msg = 'Draw a card'

   Game() 

   chckSetStatuse();
   
   restartGme.style.display= "none"

   continuePly.style.display = "none"

}/*=== end of restart()  ===*/



/*=== set status for alive base on current earn===*/

function chckSetStatuse(){

     currentEarn > 0 ? alive = true :  alive = false

    if(alive === false && currentEarn === 0 ){

    msg= `Dear player you've exhausted your account to $ ${currentEarn},You need to fund your account to continue`

    newCard.style.display = "none"

    newBut.style.display = "none"

    restartGme.style.display = "none"

    endGme.style.display = 'block'

    fundGme.style.display = 'block'

    Content.textContent =`${msg}`

    }  
}/*=== end of chckSetStatuse ===*/


/*=== method for ending each round of a game  ===*/

  function endRound(){
     if (blackjack === true){

    currentEarn += 100

    // wons=JSON.parse(wons)

    wons.push(100)

    // wons= JSON.stringify(wons)

    earnings.set('wons',wons)
    
    }
  else if(blackjack === false){
     
      currentEarn -= 50

      // losses=JSON.parse(losses)

      losses.push(50);

      // losses = JSON.stringify(losses)

      earnings.set('losses',losses);
    }

    currentEarn= trackfund();
    
    earnDsp.value =`$ ${currentEarn}`; // displays funds value with "$" format 

    sum = 0;

    Card=[];

    localStorage.setItem('wons', wons);

    localStorage.setItem('losses',losses)

    localStorage.setItem('earnings',earnings)

    console.log(earnings);
   console.log(currentEarn);
   

  }/*=== end of endround() ===*/


  /*=== withdrawal function for minimum choice for black jack withdrawal
        only works after a walk away pops up after having a black jack  ===*/

function withdrawFund(){

    const minWitd = 250 // to set the minnimum withdrawal of a user

     const verifyWitd= trackfund()

    if(verifyWitd === minWitd || verifyWitd > minWitd){

         withdraw.style.display = "none"

         restartGme.style.display = "none"

       
         itemEl.innerHTML = `

         <div class="header">
            
            <h2 id="blackjack">BLACK JACK</h2>

        </div>

        <div class="item">
                
                <div class="withdraw">
                
                    <p> You walked away with  $ ${ currentEarn} </p>

                </div

         </div>
        
         `

        itemEl.classList.remove('main-container');  

        itemEl.classList.add('walkAway');
    }
    else if( verifyWitd < minWitd && verifyWitd > 0 ){ 

        msg = `You can only  withdraw a minimum amount of $ ${minWitd} you need to earn $ ${minWitd - verifyWitd} more  `

        withdraw.style.display="none";

    }
    
     Content.textContent =`${msg}`

  }/*=== end of withdrawFund()  ===*/


/*=== ends the game and can only be executable only when with 0 funds ===*/
    function endGame(){

        itemEl.innerHTML = `

         <div class="header">
            
            <h2 id="blackjack">BLACK JACK</h2>

        </div>

        <div class="item">
                
                <div class="withdraw">
                
                    <p> You lose! please try again later </p>

                </div

         </div>
        
         `

    }/*=== end of endGame() ===*/


  /*=== checking and setting fund if the user is out of funds  ===*/

  function fund(){

    if(currentEarn === 0 && alive != true){

    currentEarn += 200

    funds.push(200); 

    earnings.set('funds', funds)

    console.log(funds)

    endGme.style.display = 'none'

    fundGme.style.display = 'none'

    msg = ' You are account have been successfully funded'
    
    Content.textContent =`${msg}`

    restart();

    currentEarn = trackfund()

    earnDsp.value =`$ ${currentEarn}`;


  }
  else if(alive === true && currentEarn > 0){

    msg = ' You are trying to cheat lol'

  }

    Content.textContent = `${msg}`

}/*=== end of funds()  ===*/


/*=== tracking of funds from the mapped array ===*/

const trackfund = ()=>{

 var allLosses; var allWins; var allFunds;  var trackedLoss; var trackedWin; var trackedFund;

 allLosses = earnings.get('losses') ? allLosses = earnings.get('losses') :allLosses = [] 

 allWins = earnings.get('wons') ? allWins = earnings.get('wons'): allWins = []

 allFunds =earnings.get('funds') ? allFunds = earnings.get('funds') : allFunds = [] 

 console.log(allLosses,allWins,allFunds);

trackedLoss=sumLoop(allLosses);

trackedWin = sumLoop(allWins);

trackedFund = sumLoop(allFunds);

var curFundstus = (trackedFund+trackedWin) -  trackedLoss

 return curFundstus
}/*=== End of tracking of funds ===*/


/*=== summing of looped item  from array ===*/

function sumLoop(arr){
    var sum = 0

    for(i=0;i<arr.length;i++){
        var sum = sum+arr[i]
        }
    return sum
}/*=== end  of loop item ===*/



































// function startGme(){
//     let Crd=rdmCrd[0] //Crd for tracking rdmCrd && card
//     let dsp= document.querySelector('.content')
//     dsp.textContent= Crd
//     console.log(dsp)
//     card= Crd
//     console.log(card)
//     butt=document.querySelector(".start")
//     butt.style.display="none"
//     alive=true
// }
// if(alive===true){
// function drwNew(){
//    con = document.querySelector('.content')
//    let newCrd = rdmCrd[1]
//     card = newCrd
//     console.log(card)
//     con.textContent=card
//      if(card>25){
//          alive=false
//         con.textContent='GAME OVER'
//         }
//      }
// }
// }
// else if(alive=== false){
//     document.querySelector('body').textContent = 'GAME OVER'
// }

