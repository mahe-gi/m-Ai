const main = document.getElementById("main");
const newChat = document.getElementById("newChat");

const inp = document.createElement("input");

const askBtn = document.createElement("button");
inp.setAttribute("type", "text");
inp.setAttribute("id", "userInp");
askBtn.setAttribute("id", "askbtn");
askBtn.textContent = "ask";
newChat.addEventListener("click", () => {
  main.append(inp, askBtn);
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
        "X-goog-api-key": "your api key",
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
      displayChat(chatData);
    })
    .catch((err) => console.log(err));
}

const div = document.createElement("div");
div.setAttribute("id", "chatArea");
main.append(div);

function displayChat(chatData) {
  const user = document.createElement("p");
  const ai = document.createElement("p");
  chatData.forEach((el) => {
    user.textContent = el.user;
    ai.textContent = el.aiAns;
    div.append(user, ai);
  });
}
