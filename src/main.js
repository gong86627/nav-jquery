const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "http://www.bilibili.com" }
];

const simplifyUrl = (url) => {
    return url
      .replace(/^(http:\/\/|https:\/\/)(www\.)?/i, "")
      .replace(/\/.*/, "");
  }

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
            <div class="logo">${simplifyUrl(node.logo)}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi);

    $li.on('click', ()=>{
        window.open(node.url);
        
    })

    $li.on('click', '.close', (e)=>{
        e.stopPropagation();
        hashMap.splice(index, 1)
        render()
    })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么?");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
  render();
});

window.onbeforeunload = () => {
  localStorage.setItem("x", JSON.stringify(hashMap));
};

$(document).on('keypress', (e)=>{
  const {key} = e  //const key = e.key 是这个写法的简写
  for(let i=0; i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
})

//阻止输入框的冒泡
$('input').on('keypress', (e)=>{
  e.stopPropagation();
})