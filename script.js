const randomText = document.getElementById("randomText")
const textArea = document.getElementById("textArea")
const btn = document.getElementById("btn")
const timer = document.getElementById("timer")
let startTime,endTime;
const webApi = "https://api.quotable.io/random"

    function RandomQuote(){
    return fetch(webApi)
    .then(Response => Response.json())
    .then(data=> data.content)
}

textArea.addEventListener("input", function(){
    const arrayText=randomText.querySelectorAll("span")
   
    const arrayValue = textArea.value.split('')
    // console.log(arrayValue)
    arrayText.forEach((span, index)=>{
        const character = arrayValue[index]
        if(character===null){
            span.classList.remove('active')
            span.classList.remove('notActive')
        }
        else if(character===span.innerText){
            span.classList.add('active')
            span.classList.remove('notActive')
        }else{
            span.classList.add('notActive')
            span.classList.remove('active')
        }
    })
})
async function getNextText(){
    const text = await RandomQuote()
    randomText.innerHTML = text
    text.split('').forEach(singleLetter =>{
        const createSingleLetter = document.createElement("span")
        // console.log(createSingleLetter)
        createSingleLetter.innerText = singleLetter
        randomText.appendChild(createSingleLetter)
    })
} 

function playGame(){
    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done"

}

function endPlay(){
    let date = new Date();
    endTime = date.getTime();

    let totalTime = ((endTime-startTime)/1000)
    console.log(totalTime)

    timer.innerText = `you took ${totalTime} Sec.`
}



btn.addEventListener("click", function(){
    if(this.innerText == "Start"){
        textArea.value = ''
        textArea.disabled = false;
        textArea.focus()
        getNextText();
        playGame();
        timer.innerText = `Your Time`
    }else if(this.innerText == "Done"){
        textArea.disabled = true;
        btn.innerText = "Start";
        endPlay();

    }
})