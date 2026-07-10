// ================= LOADING SCREEN =================
window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 2000);

});

// ================= TYPING EFFECT =================
const typing = document.getElementById("typing");

const words = [
    "Learn Cyber Security",
    "Protect Your Data",
    "Stay Safe Online",
    "Fight Cyber Crime"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typingEffect, 1200);
            return;
        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            wordIndex++;
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }
    setTimeout(typingEffect, deleting ? 60 : 120);
}
typingEffect();

// ================= COUNTER =================
const counters = document.querySelectorAll(".counter");
const speed = 50;
counters.forEach(counter => {

    function updateCounter() {
        const target = +counter.dataset.target;
        const value = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (value < target) {
            counter.innerText = value + increment;
            setTimeout(updateCounter, 30);
        }

        else {

            counter.innerText = target;
        }
    }
    updateCounter();
});

// ================= DARK MODE =================
const darkBtn = document.getElementById("darkMode");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        darkBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
    }

    else{
        darkBtn.innerHTML='<i class="fa-solid fa-moon"></i>';
    }
});

// ================= MOBILE MENU =================
const menuBtn=document.getElementById("menuBtn");
const nav=document.querySelector("nav ul");
menuBtn.addEventListener("click",()=>{

    if(nav.style.display==="flex"){
        nav.style.display="none";
    }
    else{
        nav.style.display="flex";
        nav.style.flexDirection="column";
    }
});

// ================= PASSWORD CHECKER =================
const passwordInput=document.getElementById("passwordInput");
const strength=document.getElementById("strength");
const strengthText=document.getElementById("strengthText");
passwordInput.addEventListener("input",()=>{

let password=passwordInput.value;
let score=0;

if(password.length>=8) score++;

if(/[A-Z]/.test(password)) score++;
if(/[a-z]/.test(password)) score++;
if(/[0-9]/.test(password)) score++;
if(/[^A-Za-z0-9]/.test(password)) score++;

switch(score){

case 0:
strength.style.width="0%";
strength.style.background="red";
strengthText.innerHTML="Masukkan Password";
break;

case 1:
strength.style.width="20%";
strength.style.background="red";
strengthText.innerHTML="Sangat Lemah";
break;

case 2:
strength.style.width="40%";
strength.style.background="orange";
strengthText.innerHTML="Lemah";
break;

case 3:
strength.style.width="60%";
strength.style.background="gold";
strengthText.innerHTML="Sedang";
break;

case 4:
strength.style.width="80%";
strength.style.background="#00bfff";
strengthText.innerHTML="Kuat";
break;

case 5:
strength.style.width="100%";
strength.style.background="limegreen";
strengthText.innerHTML="Sangat Kuat";
break;
}
});

// ================= PASSWORD GENERATOR =================
function generatePassword(){

const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower="abcdefghijklmnopqrstuvwxyz";
const number="0123456789";
const symbol="!@#$%^&*()_+?><";

const all=upper+lower+number+symbol;

let password="";

password+=upper[Math.floor(Math.random()*upper.length)];
password+=lower[Math.floor(Math.random()*lower.length)];
password+=number[Math.floor(Math.random()*number.length)];
password+=symbol[Math.floor(Math.random()*symbol.length)];

for(let i=4;i<12;i++){
password+=all[Math.floor(Math.random()*all.length)];

}
password=password.split('').sort(()=>Math.random()-0.5).join('');
document.getElementById("generatedPassword").value=password;

}

// ================= COPY PASSWORD =================
function copyPassword(){
const password=document.getElementById("generatedPassword");

if(password.value===""){
alert("Silakan generate password terlebih dahulu.");

return;
}

navigator.clipboard.writeText(password.value);
alert("Password berhasil disalin.");
}

// ================= WEBSITE SECURITY CHECKER =================
function checkWebsite(){
const input=document.getElementById("websiteInput").value.trim();
const result=document.getElementById("websiteResult");

if(input===""){
result.style.color="orange";
result.innerHTML="Masukkan alamat website.";
return;
}

if(input.startsWith("https://")){
result.style.color="lime";
result.innerHTML="✅ Website menggunakan HTTPS dan lebih aman.";
}
else if(input.startsWith("http://")){
result.style.color="red";
result.innerHTML="❌ Website hanya menggunakan HTTP. Hindari memasukkan data penting.";
}
else{
result.style.color="gold";
result.innerHTML="⚠ Gunakan format http:// atau https://";
}
}

// ================= PHISHING SIMULATION =================
function checkEmail(answer){
const result=document.getElementById("emailResult");

if(answer){
result.style.color="red";
result.innerHTML="❌ Salah. Link menggunakan domain mencurigakan (.xyz). Ini adalah email phishing.";
}
else{
result.style.color="lime";
result.innerHTML="✅ Benar! Email tersebut merupakan phishing karena memakai domain palsu dan mendesak korban.";
}
}

// ================= THREAT INFORMATION =================
function showThreat(type){
const modal=document.getElementById("threatModal");
const title=document.getElementById("modalTitle");
const desc=document.getElementById("modalDescription");
const signs=document.getElementById("modalSigns");
const prevention=document.getElementById("modalPrevention");

modal.style.display="flex";

signs.innerHTML="";
prevention.innerHTML="";

let data={};

switch(type){

case "phishing":

data={

title:"🛡 PHISHING",

desc:"Phishing adalah upaya penipuan yang menyamar sebagai pihak terpercaya untuk mencuri informasi pribadi.",

signs:[
"✔ Meminta password",
"✔ Meminta kode OTP",
"✔ Link mencurigakan",
"✔ Menggunakan bahasa yang mendesak"
],

prevention:[
"• Periksa alamat website",
"• Jangan klik link asing",
"• Aktifkan Multi-Factor Authentication (MFA)",
"• Jangan membagikan OTP"
]

};

break;

case "malware":

data={

title:"🦠 MALWARE",

desc:"Malware adalah perangkat lunak berbahaya yang dirancang untuk merusak sistem atau mencuri data.",

signs:[
"✔ Komputer menjadi lambat",
"✔ Banyak iklan muncul",
"✔ File hilang",
"✔ Program berjalan sendiri"
],

prevention:[
"• Install antivirus",
"• Update sistem operasi",
"• Hindari software bajakan",
"• Download dari situs resmi"
]

};

break;

case "ransomware":

data={

title:"🔒 RANSOMWARE",

desc:"Ransomware mengenkripsi seluruh file korban dan meminta tebusan agar data dapat dibuka kembali.",

signs:[
"✔ File tidak bisa dibuka",
"✔ Muncul pesan tebusan",
"✔ Semua file berubah"
],

prevention:[
"• Backup data secara rutin",
"• Jangan buka lampiran email asing",
"• Update antivirus",
"• Hindari website mencurigakan"
]

};

break;

case "social":

data={

title:"🕵 SOCIAL ENGINEERING",

desc:"Social Engineering adalah teknik manipulasi psikologis untuk memperoleh informasi rahasia.",

signs:[
"✔ Mengaku sebagai admin",
"✔ Meminta OTP",
"✔ Mendesak korban",
"✔ Memanfaatkan rasa panik"
],

prevention:[
"• Verifikasi identitas",
"• Jangan mudah percaya",
"• Jangan bagikan password",
"• Konfirmasi ke pihak resmi"
]

};

break;

}

title.innerHTML=data.title;
desc.innerHTML=data.desc;
data.signs.forEach(item=>{
signs.innerHTML+=`<li>${item}</li>`;
});

data.prevention.forEach(item=>{
prevention.innerHTML+=`<li>${item}</li>`;
});
}

function closeModal(){
document.getElementById("threatModal").style.display="none";
}

window.onclick=function(event){
const modal=document.getElementById("threatModal");

if(event.target==modal){
modal.style.display="none";
}
}

// ================= CYBER QUIZ =================
const quizData = [
{
question:"1. Apa tujuan utama Cyber Security?",
options:[
"Mempercepat internet",
"Melindungi sistem dan data",
"Membuat komputer lebih mahal",
"Meningkatkan kapasitas RAM"
],
answer:1
},

{
question:"2. Apa itu Phishing?",
options:[
"Game Online",
"Penipuan untuk mencuri data",
"Virus Komputer",
"Firewall"
],
answer:1
},

{
question:"3. Password yang kuat sebaiknya...",
options:[
"123456",
"Tanggal Lahir",
"Kombinasi huruf, angka, simbol",
"Nama Sendiri"
],
answer:2
},

{
question:"4. HTTPS digunakan untuk...",
options:[
"Menghapus Virus",
"Mengamankan komunikasi website",
"Mempercepat WiFi",
"Menghemat baterai"
],
answer:1
},

{
question:"5. Malware adalah...",
options:[
"Program berbahaya",
"Browser",
"Mesin pencari",
"Sistem operasi"
],
answer:0
},

{
question:"6. OTP berfungsi untuk...",
options:[
"Menghapus akun",
"Autentikasi tambahan",
"Memperbesar penyimpanan",
"Mengganti email"
],
answer:1
},

{
question:"7. Ransomware bekerja dengan cara...",
options:[
"Mempercepat komputer",
"Mengenkripsi file korban",
"Menghapus browser",
"Membersihkan cache"
],
answer:1
},

{
question:"8. Social Engineering menyerang...",
options:[
"Perangkat keras",
"Psikologi manusia",
"RAM",
"Keyboard"
],
answer:1
},

{
question:"9. Yang paling aman adalah...",
options:[
"http://website.com",
"https://website.com",
"website123",
"ftp://website"
],
answer:1
},

{
question:"10. Backup data berguna untuk...",
options:[
"Mengurangi RAM",
"Cadangan jika data hilang",
"Mempercepat internet",
"Menghapus virus"
],
answer:1
}
];

let currentQuestion=0;
let score=0;

const question=document.getElementById("question");
const answers=document.querySelectorAll(".answer-btn");
const progress=document.getElementById("progressBar");
const next=document.getElementById("nextQuestion");

function loadQuestion(){

const q=quizData[currentQuestion];

question.innerHTML=q.question;

answers.forEach((btn,index)=>{

btn.innerHTML=q.options[index];

btn.disabled=false;

btn.style.background="#102235";

});

progress.style.width=((currentQuestion)/quizData.length)*100+"%";

}

loadQuestion();

function checkAnswer(index){

answers.forEach(btn=>btn.disabled=true);

if(index===quizData[currentQuestion].answer){

answers[index].style.background="green";

score++;

}
else{

answers[index].style.background="red";

answers[quizData[currentQuestion].answer].style.background="green";

}

}

next.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion<quizData.length){

loadQuestion();

}
else{

progress.style.width="100%";

document.querySelector(".quiz-box").innerHTML=
`
<h2>🎉 Quiz Selesai</h2>

<h1>Skor Kamu : ${score} / ${quizData.length}</h1>

<p>Terima kasih telah mengikuti Cyber Quiz.</p>
`;

}

});

// ================= FAQ =================

const acc=document.querySelectorAll(".accordion");

acc.forEach(item=>{

item.addEventListener("click",()=>{

item.classList.toggle("active");

const panel=item.nextElementSibling;

if(panel.style.display==="block"){

panel.style.display="none";

}
else{

panel.style.display="block";

}

});

});

// ================= CHAT BOT =================

const chatButton = document.getElementById("chatButton");
const chatbot = document.getElementById("chatbot");

// Sembunyikan chatbot saat halaman pertama kali dibuka
chatbot.style.display = "none";

chatButton.addEventListener("click", () => {

    if (chatbot.style.display === "none") {
        chatbot.style.display = "block";
    } else {
        chatbot.style.display = "none";
    }

});

function chatBot(topic){

const answer=document.getElementById("chatAnswer");

switch(topic){

case "password":

answer.innerHTML=
"<b>Password Aman:</b><br>Gunakan minimal 12 karakter yang terdiri dari huruf besar, huruf kecil, angka, dan simbol.";

break;

case "phishing":
answer.innerHTML=
"<b>Phishing:</b><br>Jangan klik link mencurigakan dan selalu cek alamat website.";
break;

case "malware":
answer.innerHTML=
"<b>Malware:</b><br>Gunakan antivirus dan jangan menginstal aplikasi dari sumber yang tidak terpercaya.";
break;

case "otp":
answer.innerHTML=
"<b>OTP:</b><br>Jangan pernah memberikan kode OTP kepada siapa pun.";
break;

default:

answer.innerHTML="Silakan pilih salah satu topik.";
}}



