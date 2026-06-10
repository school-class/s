// ======================
// スクロールフェード
// ======================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document
.querySelectorAll(
'.story-block,.stat-card,.spot-card,.gallery-item'
)
.forEach(el => observer.observe(el));


// ======================
// カウントアップ
// ======================

const counters =
document.querySelectorAll(".stat-card h3");

counters.forEach(counter => {

    const target =
    parseInt(counter.innerText);

    if(isNaN(target)) return;

    let current = 0;

    const update = () => {

        current += target / 80;

        if(current < target){

            counter.innerText =
            Math.floor(current);

            requestAnimationFrame(update);

        }else{

            counter.innerText = target;

        }

    };

    update();

});


// ======================
// マウスライト
// ======================

const light =
document.createElement("div");

light.classList.add("cursor-light");

document.body.appendChild(light);

document.addEventListener("mousemove",(e)=>{

    light.style.left =
    e.clientX + "px";

    light.style.top =
    e.clientY + "px";

});


// ======================
// パララックス
// ======================

window.addEventListener("scroll",()=>{

    const scrolled =
    window.pageYOffset;

    const hero =
    document.querySelector(".hero");

    hero.style.backgroundPositionY =
    scrolled * 0.5 + "px";

});


// ======================
// スムーズ登場
// ======================

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});
