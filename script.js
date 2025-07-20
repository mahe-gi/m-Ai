// const apiKey = "";

const main = document.getElementById("main");
const newChat = document.getElementById("newChat");

const inp = document.createElement("textarea");

const askBtn = document.createElement("button");
inp.setAttribute("type", "text");
inp.setAttribute("id", "userInp");
inp.placeholder = "ask something...";
askBtn.setAttribute("id", "askbtn");
askBtn.textContent = "🔎";
const inpWrapper = document.createElement("div");
inpWrapper.setAttribute("id", "inpWrapper");
const btnWrapper = document.createElement("div");
btnWrapper.setAttribute("id", "btnWrapper");
const wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");

newChat.addEventListener("click", () => {
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
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: inp.value,
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
    .catch((err) => console.log(err));
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
