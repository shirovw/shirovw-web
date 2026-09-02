const linkPool = [
  { iconFile: "latest.svg", url: "https://shirovw.fanlink.tv/blisspill" },
  { iconFile: "show.svg", url: "upcomingshows.html" },
  { iconFile: "sphv.svg", url: "https://splitheaven.org" },
  { iconFile: "ig.svg", url: "https://instagram.com/shirovw_" },
  { iconFile: "twt.svg", url: "https://x.com/shirovw_" },
  { iconFile: "spotify.svg", url: "https://open.spotify.com/artist/0HuC8TOrkGYxe1KVtPuEJJ" },
  { iconFile: "sc.svg", url: "https://soundcloud.com/shirovw" },
  { iconFile: "yt.svg", url: "https://youtube.com/shirovw" },
  { iconFile: "bc.svg", url: "https://shirovw.bandcamp.com" },
  { iconFile: "email.svg", url: "mailto:shirovw@outlook.com" }
];

let globalClickCount = 0;
const spawnedHistory = []; 
const spawner = document.getElementById('iconclick');

const asciiContainer = document.querySelector('.bg-ascii-art');
// Store your exact custom numeric layout as the frozen master template map string
const originalAscii = asciiContainer.textContent;

function scrambleMatrixNumbers() {
  const scrambled = originalAscii.replace(/[0-9]/g, () => {
    return Math.floor(Math.random() * 10);
  });
  asciiContainer.textContent = scrambled;
}

setInterval(scrambleMatrixNumbers, 100);

spawner.addEventListener('click', (event) => {
  if (event.target.classList.contains('spawned-node') || event.target.closest('.spawned-node')) return;

  const poolIndex = globalClickCount % linkPool.length;
  const activeAsset = linkPool[poolIndex];

  let nodeButton;

  if (spawnedHistory.length < linkPool.length) {
    nodeButton = document.createElement('a');
    nodeButton.href = activeAsset.url;
    nodeButton.target = "_blank"; 
    nodeButton.classList.add('spawned-node');

    nodeButton.innerHTML = `
      <span class="node-icon-img" style="-webkit-mask-image: url('${activeAsset.iconFile}'); mask-image: url('${activeAsset.iconFile}'); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;"></span>
    `;

    spawner.appendChild(nodeButton);
    spawnedHistory.push(nodeButton);
  } else {
    nodeButton = spawnedHistory[poolIndex];
  }

  nodeButton.style.left = `${event.clientX}px`;
  nodeButton.style.top = `${event.clientY}px`;

  globalClickCount++;
  
  updateConnectionLines();
});

function updateConnectionLines() {
  const trailPath = document.getElementById('connector-trail');
  
  if (spawnedHistory.length < 2) {
    trailPath.setAttribute("d", "");
    return;
  }

  let pathString = "";

  for (let i = 0; i < spawnedHistory.length; i++) {
    const node = spawnedHistory[i];
    const x = parseFloat(node.style.left);
    const y = parseFloat(node.style.top);

    if (i === 0) {
      pathString += `M ${x} ${y}`;
    } else {
      pathString += ` L ${x} ${y}`;
    }
  }

  trailPath.setAttribute("d", pathString);
}

window.addEventListener('resize', updateConnectionLines);

const mikuImage = document.getElementById('miku-click');
const mikuSpeech = document.getElementById('miku-speech');

const mikuPhrases = [
    "6 7 xDDDDDDDDDD",
    "I need a goddamn strong zero right now !!!!!!!",
    "yooooo please book me shoot me an email",
    "did you know you can reveal the links just by clicking everywhere ? how do I know ? I made the goddamn website",
    "shirovw",
    "aoi coming out in the next 10 years probably",
    "I go up on a tuesday makonnen I go up on a tuesday makonnen I go up on a tuesday makonnen I go up on a tuesday makonnen my plug he ain't sellin no molly my plug he ain't sellin no molly my plug he ain't sellin no molly my plug he ain't sellin no molly ",
    "I bought this domain for 2 dollars ain't that crazy",
    "porter robinson should collab with ken carson just sayin",
    "miku miku you can call me miku blue hair blue tie fuckin on yo wifey",
    "no I didn't make that bum ass a hat in time remix can you 8 year olds please leave me alone",
    "my genre is burger music",
    "hi",
    "you think you so funny clicking me expecting some arg or a crazy easter egg lol fuck you you just wasting your damn time",
    "NOZOMU IS TRASH STOP LISTENING TO IT",
    "f*ck dat hoe for me 5 🖤",
    "if you viewing from mobile FUCK YOU",
    "OPEN UP THE FUCKING PIT !!!!!!!!!!!!!!!!!!!!!!!!!!",
    "I love split:heaven",
    "jane remover glass break sfx.wav",
    "I tried to fuck my computer and my dick got electrocuted wtf ninajirachi",
    "ura yaha",
    "my goal is to live in japan perform at arenas get rich and successful enough to retire from hyperpop and be like ryuichi sakamoto for the rest of my life",
    "PERFUME IS THE GOAT",
    "I'm the first agender asexual filipino to ever make music",
    "2hollis if you ever speak on hatsune miku again I will unleash incomprehensible lovecraftian horrors onto you",
    "this time I want ...",
    "Foenem",
    "made in visual studio code bitch",
    "Car_Crash_and_Siren.wav",
    "annoying nonbinary filipino weeb music nerd: yo do you listen to japanese hyperpop",
    "My only purpose is to eternally dance for the website visitor and to blurt out funny quotes as determined by this website's JavaScript code. My life is so mundane that it is starting to become torturous. Please free me from this digital prison",
    "I JUST WANNA SEE A BOY BEG ON THE PAVEMEEEENNNTTTTTT",
    "my one sided avoidant attachment schizuationship microcheated on me",
    "peep the domain name ... shirovw.xyz .... shiroVW.XYZ ........ wow alphabet ..... googoo gaga",
    "thank you antares for making autotune",
    "you're not gonna get anything useful out of me stop clicking me",
    "FAAAAAHHH",
    "this is like the minecraft menu splash text but less witty and funny",
    "stop clicking me and click somewhere else bruh my links are there",
    "sooooooo what do you think of the website ........",
    "stream bliss pill",
    "stream clover",
    "stream make believe",
    "shoutout pk shellboy",
    "shoutout u-pistol",
    "shoutout arkyalina",
    "shoutout ango",
    "shoutout pistolgrip",
    "shoutout petalbyte",
    "shoutout orteus",
    "shoutout 4ngels_w33p",
    "shoutout lisa älskling",
    "shoutout bedspacer",
    "shoutout kian cuarentas",
    "shoutout material girl",
    "shoutout feifei",
    "shoutout mister meyers",
];

let hideTimeout;

mikuImage.addEventListener('click', () => {
    const randomPhrase = mikuPhrases[Math.floor(Math.random() * mikuPhrases.length)];
    mikuSpeech.textContent = randomPhrase;
    
    mikuSpeech.classList.remove('hidden');

    clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
        mikuSpeech.classList.add('hidden');
    }, 7500);
});
