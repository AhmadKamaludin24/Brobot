const sendChatBtn = document.querySelector(".chat-input i")
const chatInput = document.querySelector(".chat-input textarea")
const chatBox = document.querySelector(".chatbox")
const showChat = document.querySelector(".content .btn1")
const hideChat = document.querySelector(".chatbot .header .close")
const chatContainer = document.querySelector(".chatbot")
let userMessage 
const API_KEY = "sk-proj-fgPoS1kKo2YJB4DKh0EXT3BlbkFJKRF0uD5diaq7e3wHfG4j"
const createChatLi = (message,className)=>{
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat",className);
  let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<i class="ri-skull-2-fill"></i><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi
}

// const generateResponse = ()=>{
//   const API_URL = "https://api.openai.com/v1/completions"
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${API_KEY}`
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{role:"user",content:userMessage}]
//     })
//   }
//   fetch(API_URL,requestOptions).then(res=>res.json()).then(data=>{
//     console.log(data)
//   }).catch((err)=>{
//     chatBox.appendChild(createChatLi(err,"incoming"))
//   })
// }

const bard = (incomingChatLi)=>{
  const messageElement = incomingChatLi.querySelector("p")
  fetch(`https://aemt.me/openai?text=${userMessage}`).then(res=>res.json()).then(data=>{
    messageElement.textContent = data.result
    if(data.result===""){
      chatBox.appendChild("Ada yang error nih")
    }
    console.log(data)
  }).catch((err)=>{
    chatBox.appendChild("Ada yang error nih")
  }).finally(()=>{
    chatBox.scrollTo(5,chatBox.scrollHeight)
  })
}

const handleChat = ()=>{
  userMessage = chatInput.value.trim();
  console.log(userMessage)
  if(!userMessage) return
  chatInput.value = "";
  
  
  chatBox.appendChild(createChatLi(userMessage,"outgoing"))
  chatBox.scrollTo(0,chatBox.scrollHeight)
  setTimeout(()=>{
      const incomingChatLi = createChatLi("Memproses data...","incoming")
      chatBox.appendChild(incomingChatLi)
      chatBox.scrollTo(0,chatBox.scrollHeight)
      bard(incomingChatLi)
  },600)
  
}
showChat.addEventListener("click",()=>{
  chatContainer.classList.remove("show-popup");
  console.log("ah")
})
hideChat.addEventListener("click",()=>{
  chatContainer.classList.add("show-popup");
  console.log("ah")
})

function popup(btnShow, btnHide, popupContent){
  document.querySelector(btnShow).addEventListener("click",()=>{
    document.querySelector(popupContent).classList.remove("show-popup")
  })
  document.querySelector(btnHide).addEventListener("click",()=>{
    document.querySelector(popupContent).classList.add("show-popup")
})}

popup(".content .btn2", ".popup-about .btnn",".popup-about");

document.querySelector(".content .btn3").addEventListener("click",()=>{
  window.location.href = "https://sociabuzz.com/brajatikswa/tribe"
})


sendChatBtn.addEventListener("click", handleChat)