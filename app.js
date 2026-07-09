
const stops = [
  {
    id:'entry',
    title:'Start: Harbor Lobby / Orientation',
    time:'5 min',
    tags:['Start'],
    note:'Get your bearings, check the official map, and decide whether you want the full route or highlights only.',
    image:'assets/logo-full.jpg',
    alt:'The Aquarium Guide logo artwork'
  },
  {
    id:'mountain',
    title:'Mountain Forest',
    time:'12 min',
    tags:['Must see'],
    note:'Begin with the inland side of South Carolina: waterfalls, stream life, birds and river otters if they are active.',
    image:'assets/mountain-forest.png',
    alt:'Soft pastel illustration of Mountain Forest with a bald eagle, waterfall, and river otters'
  },
  {
    id:'piedmont',
    title:'Piedmont',
    time:'10 min',
    tags:['SC habitats'],
    note:'Use this as the “mountains to sea” transition, with rivers, wetlands, amphibians and native fish.',
    image:'assets/piedmont.png',
    alt:'Soft pastel illustration of the Piedmont exhibit with tree frogs and freshwater fish'
  },
  {
    id:'touch',
    title:'Boneyard Beach Touch Tank Experience',
    time:'10–15 min',
    tags:['Must see','Kids'],
    note:'A good pause point with sea stars, rays and touch-tank wildlife. Move slowly, follow staff guidance and wash hands afterward.',
    image:'assets/touch-tank.png',
    alt:'Soft pastel illustration of a touch tank with rays, sea stars, and gentle hands reaching in'
  },
  {
    id:'aviary',
    title:'Saltmarsh Aviary',
    time:'12 min',
    tags:['Photos'],
    note:'Watch for birds, marsh life and panoramic harbor atmosphere as you move into the coastal Lowcountry.',
    image:'assets/saltmarsh-aviary.png',
    alt:'Soft pastel illustration of the Saltmarsh Aviary with a roseate spoonbill and coastal marsh water'
  },
  {
    id:'ocean',
    title:'Ocean / Great Ocean Tank',
    time:'15–20 min',
    tags:['Must see'],
    note:'Slow down here. Look for sharks, rays, schooling fish and the Aquarium’s famous sea turtle at different tank levels.',
    image:'assets/great-ocean-tank.png',
    alt:'Soft pastel underwater illustration of the Great Ocean Tank with sharks, rays, fish, and a sea turtle'
  },
  {
    id:'jurassic',
    title:'Jurassic Seas',
    time:'10–15 min',
    tags:['Featured exhibit'],
    note:'A prehistoric ocean-themed stop and one of the best “wow” moments for the visit.',
    image:'assets/jurassic-seas.png',
    alt:'Soft pastel illustration of Jurassic Seas with a marine reptile skeleton and fossils'
  },
  {
    id:'turtles',
    title:'Zucker Family Sea Turtle Recovery™',
    time:'15 min',
    tags:['Must see','Conservation'],
    note:'End with the rescue and rehabilitation story. Look for patient updates and conservation takeaways from the sea turtle hospital.',
    image:'assets/sea-turtle-care-center.png',
    alt:'Soft pastel illustration of the Sea Turtle Care Center with a rescued sea turtle in rehabilitation'
  },
  {
    id:'gift',
    title:'Gift Shop / Harbor View',
    time:'5–10 min',
    tags:['Finish'],
    note:'Grab a souvenir, then take a last look toward the harbor and Ravenel Bridge area.',
    image:'assets/logo-mark.jpg',
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

const completed = new Set(JSON.parse(localStorage.getItem('completedStops') || '[]'));
const list = document.getElementById('tourList');
const highlightGrid = document.getElementById('highlightGrid');
const featuredHighlights = stops.filter(s => !['entry','gift'].includes(s.id));

function renderHighlights(){
  if(!highlightGrid) return;
  highlightGrid.innerHTML = featuredHighlights.map(s => `
    <button class="highlight-card" data-jump="${s.id}" type="button" aria-label="Jump to ${s.title}">
      <img src="${s.image}" alt="${s.alt}" loading="lazy">
      <div class="highlight-copy">
        <span class="highlight-time">${s.time}</span>
        <strong>${s.title}</strong>
      </div>
    </button>`).join('');
}


function renderStops(){
  list.innerHTML = stops.map(s=>`
    <li class="stop ${completed.has(s.id)?'done':''}" data-id="${s.id}" tabindex="0" role="button" aria-pressed="${completed.has(s.id)}">
      <input type="checkbox" data-id="${s.id}" ${completed.has(s.id)?'checked':''} aria-label="Mark ${s.title} complete">
      <div class="stop-media ${s.id==='entry' || s.id==='gift' ? 'logo-media' : ''}">
        <img src="${s.image}" alt="${s.alt}" loading="lazy">
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
  updateProgress();
}

function toggleStop(id){
  completed.has(id) ? completed.delete(id) : completed.add(id);
  localStorage.setItem('completedStops', JSON.stringify([...completed]));
  renderStops();
}

function updateProgress(){
  const pct = Math.round((completed.size / stops.length) * 100);
  document.querySelector('#progressBar span').style.width = `${pct}%`;
}

list.addEventListener('click', e=>{
  const stop = e.target.closest('.stop');
  if(!stop) return;
  toggleStop(stop.dataset.id);
});
list.addEventListener('keydown', e=>{
  if(e.key !== 'Enter' && e.key !== ' ') return;
  const stop = e.target.closest('.stop');
  if(!stop) return;
  e.preventDefault();
  toggleStop(stop.dataset.id);
});

document.getElementById('resetProgress').addEventListener('click',()=>{
  completed.clear();
  localStorage.removeItem('completedStops');
  renderStops();
});

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

document.addEventListener('click', e=>{
  const card = e.target.closest('.highlight-card');
  if(!card) return;
  const id = card.dataset.jump;
  activateTab('tour', false);
  const target = document.querySelector(`.stop[data-id="${id}"]`);
  if(target){
    target.scrollIntoView({behavior:'smooth', block:'center'});
    target.classList.add('pulse');
    setTimeout(()=>target.classList.remove('pulse'), 1200);
  }
});

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
}
renderHighlights();
renderStops();
renderFood();
