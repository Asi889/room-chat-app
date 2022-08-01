const checkbox = document.getElementById('checkbox');
const body = document.querySelector('body');
const indexHeader = document.querySelector('.index-header');
const indexHeaderTitle = document.querySelector('.index-header-title');
const indexLabels = document.querySelectorAll('.index-label');
const indexBody = document.querySelector('.index-body');
const changeMode = document.querySelector('.change-mode');
let whitemode = true;

window.addEventListener('load', () => {
    const colorMode = localStorage.getItem('color-mode');
    if (colorMode === "darkMode") {
        document.body.classList.toggle('dark');
        indexHeader.classList.toggle('dark');
        indexHeaderTitle.classList.toggle('dark');
        indexLabels.forEach(label => label.classList.toggle('dark'));
        indexBody.classList.toggle('dark');
        changeMode.classList.toggle('dark');
    }
});

checkbox.addEventListener('change', ()=>{
    whitemode = !whitemode
    let modeChanger = whitemode ? "white-mode" : "darkMode"
    localStorage.setItem('color-mode', modeChanger);
  document.body.classList.toggle('dark');
  indexHeader.classList.toggle('dark')
  indexHeaderTitle.classList.toggle('dark')
  indexLabels.forEach(label=>label.classList.toggle('dark'))
  console.log(indexBody);
  indexBody.classList.toggle('dark')
  
})