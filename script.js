const chintu = "AIzaSyCWOyU_5gt2kftgMrFkw6v2IwSg2-Cgb5s";
// give a prompt that can
const prompt = "give me short and clear and precise";

const main = document.getElementById("main");
const newChat = document.getElementById("newChat");

const inp = document.createElement("textarea");
const askBtn = document.createElement("button");
inp.setAttribute("id", "userInp");
askBtn.setAttribute("id", "askbtn");
inp.setAttribute("type", "text");
inp.placeholder = "ask something...";
askBtn.textContent = "🔎";

const inpWrapper = document.createElement("div");
inpWrapper.setAttribute("id", "inpWrapper");
const btnWrapper = document.createElement("div");
btnWrapper.setAttribute("id", "btnWrapper");
const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");

newChat.addEventListener("click", () => {
  div.textContent = "";

  main.append(wrapper);
  wrapper.append(inpWrapper, btnWrapper);
  inpWrapper.append(inp);
  btnWrapper.append(askBtn);
});

askBtn.addEventListener("click", () => {
  getAiData(inp);
});

let chatData = [];

function getAiData(inp) {
  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application / json",
        "X-goog-api-key": chintu,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt + inp.value,
              },
            ],
          },
        ],
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let obj = {
        user: inp.value,
        aiAns: data.candidates[0].content.parts[0].text,
      };
      chatData.push(obj);
      inp.value = "";
      displayChat(chatData);
    })
    .catch((err) => {
      span1.textContent = "err ";
      console.error(err);
      ai.append(span1);
      chatDiv.append(ai);
    });
}

const div = document.createElement("div");
div.setAttribute("id", "chatArea");
main.append(div);

function displayChat(chatData) {
  const userWrapper = document.createElement("div");
  userWrapper.setAttribute("id", "userWrapper");
  const user = document.createElement("p");
  user.setAttribute("id", "userP");
  const span = document.createElement("span");
  span.setAttribute("id", "userSpan");
  const ai = document.createElement("p");
  ai.setAttribute("id", "aiP");
  const span1 = document.createElement("span");
  span1.setAttribute("id", "aiSpan");

  const chatDiv = document.createElement("div");
  div.setAttribute("id", "chatDiv");

  chatData.forEach((el) => {
    user.append(span);
    ai.append(span1);
    span.textContent = el.user;
    span1.textContent = el.aiAns;
    div.append(chatDiv);
    userWrapper.append(user);
    chatDiv.append(userWrapper, ai);
  });
}

inp.addEventListener("input", () => {
  inp.style.height = "auto";
  inp.style.height = inp.scrollHeight + "px";
});

const menu = document.getElementById("menuWrapper");
const history = document.getElementById("history");
const menuWrapper = document.getElementById("menuWrapper");
menu.addEventListener("click", () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) {
    history.style.display = "block";
    menuWrapper.style.display = "none";
  }
});
history.addEventListener("click", () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 600) {
    console.log("The current screen width is: " + screenWidth + " pixels.");
    history.style.display = "none";
    menuWrapper.style.display = "block";
  }
});
