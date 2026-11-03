// ====== DATA HASIL ======
// Mau pakai gambar sendiri? Taruh file di folder images/ lalu isi img,
// Sekarang sudah diisi: images/wk.jpg, images/netral.jpg, images/bk.jpg
// Kalau file gambarnya belum ada / gagal dimuat, otomatis pakai perisai bawaan.
// Mau pakai perisai bawaan terus? Kosongkan jadi img:""
var R={
wk:{n:"White Knight",e:"🛡️",col:"#3b82f6",img:"images/wk.jpg",t:"Pembela game garis depan",d:"Game favoritmu itu rumah kedua. Kalau ada yang menghina, kamu maju paling depan buat membela. Setia banget! Cuma hati-hati, nggak semua kritik itu hinaan."},
nt:{n:"Netral",e:"⚖️",col:"#94a3b8",img:"images/netral.jpg",t:"Penjaga kewarasan komunitas",d:"Kamu menikmati game tanpa drama. Kritik didengar, pujian disyukuri. Komunitas butuh orang kayak kamu supaya tetap adem."},
bk:{n:"Black Knight",e:"🗡️",col:"#ef4444",img:"images/bk.jpg",t:"Roaster profesional",d:"Kamu senang nge-roast game, apalagi yang lagi dipuja-puja. Seru sih, asal masih bercanda dan nggak bikin orang beneran sakit hati."}
};
// ====== DAFTAR PERTANYAAN ======
// Format: ["pertanyaan", ["jawaban","wk"], ["jawaban","nt"], ["jawaban","bk"]]
// wk = White Knight, nt = Netral, bk = Black Knight
var Q=[
["Ada yang bilang game favoritmu jelek banget. Reaksimu?",["Santai, selera orang beda-beda","nt"],["Jelasin pelan-pelan kenapa game itu bagus","wk"],["Ikut ketawa, bahkan nambahin hinaannya","bk"]],
["Ada orang nge-roast game yang kamu mainin tiap hari di kolom komentar.",["Skip aja, nggak penting","nt"],["Bales panjang lebar, bela mati-matian","wk"],["Bales balik pakai meme paling nyelekit","bk"]],
["Game favoritmu rilis update jelek dan banyak yang kritik.",["Kritiknya wajar, ikut kecewa","nt"],["Tetap dibela, devnya lagi usaha!","wk"],["Spam “game mati” di semua grup","bk"]],
["Kamu lihat orang debat soal game yang nggak kamu mainin.",["Cuma nonton, nggak ikut","nt"],["Bela salah satu pihak yang kamu kenal","wk"],["Masuk cuma buat manas-manasin","bk"]],
["Temenmu bilang game kesukaanmu itu pay to win.",["Ya memang ada sisi P2W-nya","nt"],["Nggak kok, bisa F2P asal skill!","wk"],["Betul, makanya aku bilang sampah","bk"]],
["Seberapa sering kamu bikin thread pembelaan buat game yang kamu suka?",["Hampir nggak pernah","nt"],["Sering banget, wajib dilurusin","wk"],["Aku malah bikin thread kebalikannya","bk"]],
["Ada game rival yang lagi naik daun.",["Coba aja, kalau bagus ya bagus","nt"],["Tetap setia, rival itu biasa aja","wk"],["Nyari-nyari kekurangannya buat diejek","bk"]],
["Ada yang bilang “itu cuma game”.",["Iya, bener juga","nt"],["Bagiku lebih dari itu, jangan diremehkan","wk"],["Bodoh banget serius sama game","bk"]]
];
var app=document.getElementById("app"),i,sc;
function shield(r){
return'<svg viewBox="0 0 120 140" width="100%" height="100%"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+r.col+'"/><stop offset="1" stop-color="'+r.col+'" stop-opacity=".6"/></linearGradient></defs><path d="M60 6 L108 24 V70 C108 102 86 124 60 134 C34 124 12 102 12 70 V24 Z" fill="url(#sg)" stroke="#fff" stroke-width="4" stroke-opacity=".7"/><text x="60" y="88" text-anchor="middle" font-size="52">'+r.e+'</text></svg>'}
function fallback(el,k){el.onerror=null;var p=el.parentNode;p.className="bdg";p.innerHTML=shield(R[k])}
function badge(r){
var st='--ac:'+r.col;
if(r.img){var k=Object.keys(R).filter(function(x){return R[x]===r})[0];
return'<div class="bdg pic" style="'+st+'"><img src="'+r.img+'" alt="'+r.n+'" onerror="fallback(this,\''+k+'\')"></div>'}
return'<div class="bdg" style="'+st+'">'+shield(r)+'</div>'}
function start(){
i=0;sc={wk:0,nt:0,bk:0};document.documentElement.style.removeProperty("--ac");
app.className="card c";
app.innerHTML='<div class="bdg" style="width:110px;height:125px">'+shield({e:"⚔️",col:"#6366f1"})+'</div><h1><span class="g">Seberapa WK</span><br>Kamu?</h1><p>Di komunitas game, ada tiga tipe orang. Kamu yang mana?</p><div class="chips"><span class="chip" style="background:var(--wk)">White Knight</span><span class="chip" style="background:var(--nt)">Netral</span><span class="chip" style="background:var(--bk)">Black Knight</span></div><p>White Knight nggak terima kalau game kesukaannya dihina. Black Knight kebalikannya. Jawab '+Q.length+' pertanyaan jujur ya!</p><button class="btn" id="go">Mulai kuis</button>';
document.getElementById("go").onclick=ask}
function ask(){
if(i>=Q.length)return done();
var q=Q[i];app.className="card";
app.innerHTML='<div class="top"><span>Pertanyaan '+(i+1)+' / '+Q.length+'</span><span>'+Math.round(i/Q.length*100)+'%</span></div><div class="bar"><i id="pb"></i></div><p class="q"></p><div id="o"></div>';
setTimeout(function(){document.getElementById("pb").style.width=(i/Q.length*100)+"%"},20);
app.querySelector(".q").textContent=q[0];
var o=document.getElementById("o");
q.slice(1).forEach(function(a,k){var b=document.createElement("button");b.className="opt";b.style.animationDelay=(k*70)+"ms";b.innerHTML="<b>"+"ABC"[k]+"</b><span></span>";b.lastChild.textContent=a[0];b.onclick=function(){sc[a[1]]++;i++;ask()};o.appendChild(b)})}
function done(){
var n=Q.length,pct=Math.round((sc.wk*100+sc.nt*50)/n),k=pct>=62?"wk":pct>=34?"nt":"bk",r=R[k];
document.documentElement.style.setProperty("--ac",r.col);
app.className="card c";
var rows="";[["wk","White Knight"],["nt","Netral"],["bk","Black Knight"]].forEach(function(x){rows+='<div><span>'+x[1]+'</span><i><u data-w="'+Math.round(sc[x[0]]/n*100)+'" style="background:'+R[x[0]].col+'"></u></i><em style="font-style:normal;width:36px;text-align:right">'+Math.round(sc[x[0]]/n*100)+'%</em></div>'});
app.innerHTML=badge(r)+'<div class="rn">'+r.n+'</div><p class="tl">'+r.t+'</p><div class="pct" id="pc">0%</div><p>tingkat WK kamu</p><div class="meter"><b id="mk"></b></div><div class="lab"><span>Black Knight</span><span>Netral</span><span>White Knight</span></div><div class="bk3">'+rows+'</div><p class="d">'+r.d+'</p><div class="row"><button class="btn" id="sh">Bagikan hasil</button><button class="btn s" id="re">Ulangi</button></div><div id="msg"></div>';
setTimeout(function(){document.getElementById("mk").style.left=pct+"%";app.querySelectorAll("u").forEach(function(u){u.style.width=u.dataset.w+"%"})},60);
var c=0,t=setInterval(function(){c+=Math.max(1,Math.round(pct/30));if(c>=pct){c=pct;clearInterval(t)}document.getElementById("pc").textContent=c+"%"},30);
document.getElementById("re").onclick=start;
document.getElementById("sh").onclick=function(){
var tx="Aku "+pct+"% WK, tipeku "+r.n+" "+r.e+". Kamu seberapa WK? Coba kuisnya!";
var m=document.getElementById("msg");
function manual(){m.innerHTML='<input class="cp" readonly>';var f=m.firstChild;f.value=tx;f.focus();f.select()}
try{if(navigator.share){navigator.share({text:tx}).catch(manual)}else{navigator.clipboard.writeText(tx).then(function(){m.innerHTML='<p style="margin-top:12px">Teks hasil sudah disalin ✅</p>'},manual)}}catch(e){manual()}}}
start();
