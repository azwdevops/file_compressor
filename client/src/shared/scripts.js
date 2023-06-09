export const showNavbar = () => {
  // const toggle = document.getElementById("header-toggle")
  const nav = document.getElementById("nav-bar"),
    bodypd = document.getElementById("body-pd");

  // show navbar
  nav.classList.toggle("show");
  const menuBtnShow = document.getElementById("mobile__menuBtnShow");
  const menuBtnHide = document.getElementById("mobile__menuBtnHide");

  menuBtnShow.classList.toggle("hideBtn");
  menuBtnHide.classList.toggle("hideBtn");

  // add padding to body
  bodypd.classList.toggle("body-pd");
};
