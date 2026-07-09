
const stops = [
  {
    id:'entry',
    title:'Start: Harbor Lobby / Orientation',
    time:'5 min',
    tags:['Start'],
    note:'Get your bearings, check the official map, and decide whether you want the full route or highlights only.',
    image:'assets/logo-full.png',
    alt:'The Aquarium Guide logo artwork'
  },
  {
    id:'mountain',
    title:'Mountain Forest',
    time:'12 min',
    tags:['Must see'],
    note:'Begin with the inland side of South Carolina: waterfalls, stream life, a bald eagle and river otters if they are active.',
    image:'assets/mountain-forest-panel-light.jpg',
    darkImage:'assets/mountain-forest-panel-light.jpg',
    alt:'Soft pastel illustration of Mountain Forest with a bald eagle, waterfall, and river otters'
  },
  {
    id:'piedmont',
    title:'Piedmont',
    time:'10 min',
    tags:['SC habitats'],
    note:'Continue through freshwater habitats with tree frogs, native fish and the feeling of moving from foothills toward the coast.',
    image:'assets/piedmont-panel-light.jpg',
    darkImage:'assets/piedmont-panel-light.jpg',
    alt:'Soft pastel illustration of the Piedmont exhibit with tree frogs and freshwater fish'
  },
  {
    id:'touch',
    title:'Boneyard Beach Touch Tank Experience',
    time:'10–15 min',
    tags:['Must see','Kids'],
    note:'Pause for a hands-on moment with sea stars, rays and touch-tank wildlife. Move slowly and follow staff guidance.',
    image:'assets/touch-tank-panel-light.jpg',
    darkImage:'assets/touch-tank-panel-light.jpg',
    alt:'Soft pastel illustration of a touch tank with rays, sea stars, and gentle hands reaching in'
  },
  {
    id:'aviary',
    title:'Saltmarsh Aviary',
    time:'12 min',
    tags:['Photos'],
    note:'Step into the coastal Lowcountry with marsh birds, harbor views, terrapins and saltmarsh life.',
    image:'assets/saltmarsh-aviary-panel-light.jpg',
    darkImage:'assets/saltmarsh-aviary-panel-light.jpg',
    alt:'Soft pastel illustration of the Saltmarsh Aviary with a roseate spoonbill and coastal marsh water'
  },
  {
    id:'ocean',
    title:'Ocean / Great Ocean Tank',
    time:'15–20 min',
    tags:['Must see'],
    note:'Slow down at the big ocean moment. Look for sharks, rays, schooling fish and the Aquarium’s famous sea turtle at different tank levels.',
    image:'assets/great-ocean-tank-panel-light.jpg',
    darkImage:'assets/great-ocean-tank-panel-light.jpg',
    alt:'Soft pastel underwater illustration of the Great Ocean Tank with sharks, rays, fish, and a sea turtle'
  },
  {
    id:'jurassic',
    title:'Jurassic Seas',
    time:'10–15 min',
    tags:['Featured exhibit'],
    note:'Add the prehistoric ocean stop for fossils, marine reptile skeletons and one of the strongest wow moments in the visit.',
    image:'assets/jurassic-seas-panel-light.jpg',
    darkImage:'assets/jurassic-seas-panel-light.jpg',
    alt:'Soft pastel illustration of Jurassic Seas with a marine reptile skeleton and fossils'
  },
  {
    id:'turtles',
    title:'Zucker Family Sea Turtle Recovery™',
    time:'15 min',
    tags:['Must see','Conservation'],
    note:'End with the rescue and rehabilitation story. Look for patient updates and conservation takeaways from the sea turtle hospital.',
    image:'assets/sea-turtle-care-center-panel-light.jpg',
    darkImage:'assets/sea-turtle-care-center-panel-light.jpg',
    alt:'Soft pastel illustration of the Sea Turtle Care Center with a rescued sea turtle in rehabilitation'
  },
  {
    id:'gift',
    title:'Gift Shop / Harbor View',
    time:'5–10 min',
    tags:['Finish'],
    note:'Wrap up with a souvenir or a final harbor view before heading out for food nearby.',
    image:'assets/logo-mark.png',
    alt:'Aquarium Guide round logo mark'
  }
];

const food = [
  {name:'Fleet Landing', kind:['seafood'], walk:'Waterfront seafood option near the Aquarium area.', note:'Good choice for a more coastal Charleston meal.', url:'https://www.google.com/maps/search/?api=1&query=Fleet%20Landing%20186%20Concord%20St%20Charleston%20SC'},
  {name:'East Bay Deli', kind:['quick'], walk:'Casual sandwiches and salads downtown.', note:'Practical lunch if you want quick and familiar.', url:'https://www.google.com/maps/search/?api=1&query=East%20Bay%20Deli%20Charleston%20SC'},
  {name:'Carmella’s Cafe & Dessert Bar', kind:['dessert','quick'], walk:'Dessert, coffee, gelato and light bites on East Bay Street.', note:'Good after-aquarium treat stop.', url:'https://www.google.com/maps/search/?api=1&query=Carmella%27s%20198%20E%20Bay%20Street%20Charleston%20SC'},
  {name:'The Griffon', kind:['quick'], walk:'Pub food near Vendue Range.', note:'Fish and chips, burgers and a casual downtown feel.', url:'https://www.google.com/maps/search/?api=1&query=The%20Griffon%2018%20Vendue%20Range%20Charleston%20SC'},
  {name:'Charleston City Market Area', kind:['quick','dessert'], walk:'Cluster of casual bites, sweets and sit-down restaurants nearby.', note:'Good if your group wants multiple options.', url:'https://www.google.com/maps/search/?api=1&query=restaurants%20near%20Charleston%20City%20Market'}
];

const list = document.getElementById('tourList');
const themeToggle = document.getElementById('themeToggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function currentTheme(){
  return document.documentElement.dataset.theme || 'dark';
}
function pickAsset(lightSrc, darkSrc){
  return currentTheme() === 'dark' ? (darkSrc || lightSrc) : lightSrc;
}
function updateThemeControls(){
  const dark = currentTheme() === 'dark';
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  if(themeMeta) themeMeta.setAttribute('content', dark ? '#020d1c' : '#eef7f8');
  if(themeToggle){
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(dark));
    const icon = themeToggle.querySelector('.theme-icon');
    const text = themeToggle.querySelector('.theme-text');
    if(icon) icon.textContent = dark ? '☾' : '☀';
    if(text) text.textContent = dark ? 'Dark' : 'Light';
  }
  document.querySelectorAll('.theme-image').forEach(img => {
    const src = pickAsset(img.dataset.light || img.getAttribute('src'), img.dataset.dark);
    if(img.getAttribute('src') !== src) img.setAttribute('src', src);
  });
}


function renderStops(){
  list.innerHTML = stops.map(s=>`
    <li class="stop route-stop" data-id="${s.id}">
      <div class="stop-media ${s.id==='entry' || s.id==='gift' ? 'logo-media' : ''}">
        <img class="${s.darkImage ? 'theme-image' : ''}" src="${pickAsset(s.image, s.darkImage)}" data-light="${s.image}" data-dark="${s.darkImage || s.image}" alt="${s.alt}" loading="lazy">
      </div>
      <div class="stop-copy">
        <div class="stop-topline">
          <h3>${s.title}</h3>
          <span class="meta">${s.time}</span>
        </div>
        <p>${s.note}</p>
        <div>${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </li>`).join('');
}

function activateTab(tabId, shouldScroll=true){
  document.querySelectorAll('.tab,.nav-tab,.panel').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll(`[data-tab="${tabId}"]`).forEach(el=>{
    if(el.classList.contains('tab') || el.classList.contains('nav-tab')) el.classList.add('active');
  });
  const panel = document.getElementById(tabId);
  if(panel){
    panel.classList.add('active');
    if(shouldScroll) panel.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

document.querySelectorAll('.tab,.nav-tab,.jump-tab,.feature-action').forEach(btn=>btn.addEventListener('click', e=>{
  if(btn.dataset.tab) e.preventDefault();
  activateTab(btn.dataset.tab);
}));

function renderFood(filter='all'){
  const items = food.filter(f=>filter==='all' || f.kind.includes(filter));
  document.getElementById('foodList').innerHTML = items.map(f=>`
    <a class="food-card" href="${f.url}" target="_blank" rel="noopener">
      <h3>${f.name}</h3>
      <p class="meta">${f.kind.join(' • ')}</p>
      <p>${f.walk}</p>
      <p>${f.note}</p>
    </a>`).join('');
}

document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  renderFood(btn.dataset.filter);
}));

if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('aquariumGuideTheme', next);
    updateThemeControls();
  });
}

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
}
updateThemeControls();
renderStops();
renderFood();
