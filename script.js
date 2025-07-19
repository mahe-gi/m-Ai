const main = document.getElementById("main");
const newChat = document.getElementById("newChat");

newChat.addEventListener("click", () => {
  const inp = document.createElement("input");
  inp.setAttribute("type", "text");
  inp.setAttribute("id", "userInp");
  const askBtn = document.createElement("button");
  askBtn.setAttribute("id", "askbtn");
  askBtn.textContent = "ask";
  main.append(inp, askBtn);
});
