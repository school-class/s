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

document.querySelectorAll('.story-block, .stat-card, .spot-card, .gallery-item').forEach(el => {
    observer.observe(el);
});


// ======================
// カウントアップ
// ======================

const counters = document.querySelectorAll(".stat-card h3");

counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    if(isNaN(target)) return;

    let current = 0;
    const update = () => {
        current += target / 80;
        if(current < target){
            counter.innerText = Math.floor(current);
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

const light = document.createElement("div");
light.classList.add("cursor-light");
document.body.appendChild(light);

document.addEventListener("mousemove", (e) => {
    // requestAnimationFrame to optimize
    requestAnimationFrame(() => {
        light.style.left = e.clientX + "px";
        light.style.top = e.clientY + "px";
    });
});


// ======================
// パララックス
// ======================

const hero = document.querySelector(".hero");
if (hero) {
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + "px";
    });
}


// ======================
// スムーズ登場
// ======================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


// ======================
// 四季の切り替え
// ======================

// パスの調整（実行場所によってプレフィックスを変更）
const isSubPage = window.location.pathname.includes('/pages/');
const isDetailPage = window.location.pathname.includes('/details/');
const pathPrefix = isDetailPage ? '../../' : (isSubPage ? '../' : '');

const seasonData = {
    "春": {
        title: "春の埼玉",
        desc: "羊山公園の芝桜や、権現堂堤の桜と菜の花のコントラスト。県内がピンクと黄色に染まります。",
        img: "https://images.unsplash.com/photo-1621235619177-3e198126759c?auto=format&fit=crop&q=80&w=800",
        link: pathPrefix + "pages/details/hitsujiyama.html"
    },
    "夏": {
        title: "夏の埼玉",
        desc: "長瀞のライン下りや、秩父の清流。暑い夏を涼しく彩る水辺の絶景が広がります。",
        img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=800",
        link: pathPrefix + "pages/details/nagatoro.html"
    },
    "秋": {
        title: "秋の埼玉",
        desc: "中津峡や嵐山渓谷の紅葉。燃えるような赤と黄色の世界が山々を包み込みます。",
        img: "https://images.unsplash.com/photo-1570191831885-3e28420e6592?auto=format&fit=crop&q=80&w=800",
        link: pathPrefix + "pages/spots.html"
    },
    "冬": {
        title: "冬の埼玉",
        desc: "三十槌の氷柱や、秩父夜祭の灯火。寒さの中に幻想的な風景が浮かび上がります。",
        img: "https://images.unsplash.com/photo-1542360663-8034a30b6910?auto=format&fit=crop&q=80&w=800",
        link: pathPrefix + "pages/spots.html"
    }
};

const seasonBtns = document.querySelectorAll(".season-tabs button");
const seasonDisplay = document.querySelector(".season-display");

if (seasonBtns.length > 0 && seasonDisplay) {
    seasonBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const season = btn.innerText;
            const data = seasonData[season];

            if(data) {
                seasonDisplay.style.opacity = 0;
                setTimeout(() => {
                    seasonDisplay.innerHTML = `
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <div style="margin-top:20px; height:300px; border-radius:20px; background:url('${data.img}') center/cover;"></div>
                        <div style="margin-top:20px;">
                            <a href="${data.link}" class="btn-small">詳細を見る</a>
                        </div>
                    `;
                    seasonDisplay.style.opacity = 1;
                }, 300);
            }
        });
    });
}


// ======================
// 絶景診断
// ======================

const quizContainer = document.querySelector(".quiz-container");
if (quizContainer) {
    const questionBox = document.getElementById("quiz-question");
    const resultBox = document.getElementById("quiz-result");
    const resultText = document.getElementById("result-text");
    const optBtns = document.querySelectorAll(".quiz-opt-btn");
    const resetBtn = document.querySelector(".reset-quiz");

    optBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const choice = btn.getAttribute("data-choice");
            let result = "";

            if (choice === "1") {
                result = "あなたにおすすめなのは「長瀞」です！ライン下りや岩畳で自然を満喫しましょう。";
            } else if (choice === "2") {
                result = "あなたにおすすめなのは「川越」です！小江戸の街並みで歴史の息吹を感じてください。";
            }

            resultText.innerText = result;
            questionBox.classList.add("hidden");
            resultBox.classList.remove("hidden");
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            resultBox.classList.add("hidden");
            questionBox.classList.remove("hidden");
        });
    }
}
