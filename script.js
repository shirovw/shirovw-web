const linkPool = [
{ iconFile: "latest.svg", url: "https://shirovw.fanlink.tv/blisspill" },
{ iconFile: "show.svg", url: "upcomingshows.html" },
  { iconFile: "sphv.svg", url: "https://splitheaven.org" },
  { iconFile: "ig.svg", url: "https://instagram.com/shirovw_" },
  { iconFile: "twt.svg", url: "https://x.com/shirovw_" },
  { iconFile: "spotify.svg", url: "https://open.spotify.com/artist/0HuC8TOrkGYxe1KVtPuEJJ" },
  { iconFile: "sc.svg", url: "https://soundcloud.com/shirovw" },
  { iconFile: "yt.svg", url: "https://youtube.com/shirovw" },
  { iconFile: "bc.svg", url: "https://shirovw.bandcamp.com" }
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
