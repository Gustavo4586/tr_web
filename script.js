class MobileNavbar {
    constructor(mobileMenu,navLinks,navList) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            
            link.style.animation
                ? (link.style.animation = '')
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`); 
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks(); 
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click" , this.handleClick);
    }

    init() {
        if (this.mobileMenu){
           this.addClickEvent();  
        }
        return this;
    }

    
};

const mobileNavbar = new MobileNavbar(
        ".mobile-menu",
        ".nav-list",
        ".nav-list li",
);





const inputQuestion = document.getElementById("pergunta");
const result = document.getElementById("resposta");

inputQuestion.addEventListener("keypress",(k)=>{
    if(inputQuestion.value && k.key === "Enter")
        sendQuestion();
});

const OPEN_API_KEY = "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";

function sendQuestion(){
    var sQuestion = inputQuestion.value;

    fetch("https://api.openai.com/v1/completions",{
        method: "POST",
        headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },

        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, // Tamanho da Resposta
            temperature: 0.5, // Criatividade da Resposta
        }),

    })
    .then((response) => response.json())
    .then((json) =>{
        if(result.value) result.value += "\n"

        if(json.error?.message){
            result.value += `Error: ${json.error.mesage}`
        }else if (json.choices?.[0].text){
            var text = json.choices[0].text || "Sem Resposta";
            result.value +="Chat GPT: " + text;
        }
        result.scrollTop = result.scrollHeight;
    })
    .catch((error)=>console.error("Error: ", error))
    .finally(()=>{
        inputQuestion.value = "";
        inputQuestion.disabled = true;
        inputQuestion.focus();
    })

    if(result.value) result.value += "\n\n\n";
        result.value += `Eu: ${sQuestion}`
        inputQuestion.value = "Carregando...."
        inputQuestion.disabled = true;

        result.scrollTop = result.scrollHeight;
}

mobileNavbar.init();