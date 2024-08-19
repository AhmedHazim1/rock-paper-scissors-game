let main = document.querySelector("main")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext('2d')

let rules_card = document.querySelector(".rules_card")
// rules background we will use that
// in the show_rules function to low 
// the opacity of the element in the background
let rules_background = document.querySelectorAll(".rules_background");
let rules_on = false;

let rules_bt = document.querySelector("#rules_bt")
let score_text = document.getElementById("score_num")

let black_circle = `<div class="black_circle"></div>`
let text1 = "<p>YOU PICKED</p>"
let text2 = "<p>THE HOUSE PICKED</p>"
let win_text = "YOU WIN"
let lose_text = "YOU LOSE"
let draw_text = "DRAW" 

let buttonsContainer = document.querySelector(".buttons_container")
let playAgainBt = document.querySelector(".playAgain_bt")

// players_container will cotain the player and the house choises
let players_container = document.createElement('div')
let result_and_playAgainBt_container = document.querySelector("#result_container")

let player_win = false;
let score = 0;

// player_options code we will use when player/house chose 
// 0 Index = paper, 1 Index = scissors, 2 Index = rock
let player_options = [
    `<div class="notbt" id="paper">
        <img class="img" src="./images/icon-paper.svg" alt="paper">
    </div>`,
    
    `<div class="notbt" id="scissors">
        <img class="img" src="./images/icon-scissors.svg" alt="scissors">
    </div>`,

    `<div class="notbt rock">
        <img class="img"  src="./images/icon-rock.svg" alt="rock">
    </div>`,
]

canvas.width = 0
canvas.height = 0

class particles{
    constructor(x, y,width, height, color, velocity){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.velocity = velocity
    }
    draw(){
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update(){
        this.y += this.velocity
        this.draw()
    }
}
function win(particlesCount){
    let particlesArr = []
    for(let i=0;i < particlesCount;i++){
        const random = (a, b) => Math.random() * (a - b) + b;

        let x = random(innerWidth, 0) 
        let y = random(-100, -5)
        
        let velocity = random(8, 4)
        let color = `rgb(${random(255,0)}, ${random(255,0)}, ${random(255,0)})`
        let size = random(8, 5)
        
        particlesArr.push(new particles(x, y, size, size, color, velocity))
    }
    function animate(){
        myAnimationRequest = requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particlesArr.forEach((particle,index)=>{
            // removeing the particles if it outside the the page
            if(particle.y > canvas.height + 10){
                particlesArr.splice(index, 1)
            }
            else
                particle.update()
        })
    }

    animate()
}
function house(options,index,container){
    container.innerHTML = options[index];
    container.classList = "house";
}
function result(player,house){
    if(house === player) player_win = false

    else if (house === "paper" && player === "rock")
        player_win = false
    else if (house === "rock" && player === "scissors")
        player_win = false
    else if (house === "scissors" && player === "paper")
        player_win = false
    else player_win = true
}
const start = (player_is)=>{
    let player_code = undefined;
    switch (player_is){
        case "paper":
            player_code = player_options[0]
            break;
        case "scissors":
            player_code = player_options[1]
            break;
        case "rock":
            player_code = player_options[2]
            break;
    }

    players_container.classList = "players_container"
    players_container.innerHTML = 
        `<div class="grid">
            ${player_code}
            ${text1}
        </div>
        <div class="grid">
            ${black_circle}
            ${text2}
        </div>`

    buttonsContainer.style.display = "none"
    main.style.background = "none"
    main.append(players_container)
    
    setTimeout(() => {
        result_string = document.createElement("h3")
        let black_circle = document.querySelector(".black_circle")
        let options_index = Math.floor(Math.random() * player_options.length);
        let house_is = house(player_options,options_index,black_circle);
        
        switch(options_index){
            case 0: house_is = "paper"; break;
            case 1: house_is = "scissors"; break;
            case 2: house_is = "rock"; break;
        }

        result(player_is, house_is)
        if(player_win){
            result_string.innerHTML = win_text
            score++
            canvas.width = innerWidth
            canvas.height = innerHeight        
            win(200)
        } else{
            result_string.innerHTML = lose_text
        }
        
        rules_bt.style.cssText = "margin-top: 7em"
        result_string.classList = "result"
        playAgainBt.style.display = "block"

        score_text.innerText = score
        result_and_playAgainBt_container.append(result_string)
    }, 1500);
}

// buttons functions
const show_rules = ()=>{    
    if(!rules_on){
        rules_background.forEach(element => {
            element.style.opacity = .5});

        rules_card.style.display = "grid"
        rules_on = true;
    } else{
        rules_background.forEach(element => {
            element.style.opacity = 1;});

        rules_card.style.display = "none"
        rules_on = false;
    }
}
const playAgain=()=>{
    let players_container = document.querySelector(".players_container")
    players_container.remove()

    buttonsContainer.style.display = "grid"
    main.style.background = ""
    
    rules_bt.style.cssText = "margin-top: auto"
    playAgainBt.style.display = "none"
    result_string.remove();
    
    if(player_win)
        canvas.width = 0
        canvas.height = 0
        cancelAnimationFrame(myAnimationRequest)
}