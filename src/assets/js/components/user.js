import { addCookie } from "./cookies.js";
export const bindLoginAction = () => {
  const submitLoginBtn = document.querySelector(".login");
  submitLoginBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const emailValue = document.querySelector("#Email").value;
    const passwordValue = document.querySelector("#Password").value;
    await loginAction(emailValue, passwordValue);
  });
};

const loginAction = async (email, password) => {
  const response = await loginUser({ email, password });
  if (response) {
    addCookie("token", response);
    onSuccessLogin();
    // await initCards();
  }
};

const onSuccessLogin = () => {
  const loginBtn = document.querySelector(".login");
  const createVisitBtn = document.querySelector("#createVisitBtn");
  loginBtn.classList.add("hide");
  createVisitBtn.classList.remove("hide");
};
bindLoginAction();
