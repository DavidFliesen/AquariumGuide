const stops = [
  {id:'entry', title:'Start: Harbor Lobby / Orientation', time:'5 min', tags:['Start'], note:'Get bearings, check the official map, and decide whether you want the full route or highlights only.'},
  {id:'mountain', title:'Mountain Forest', time:'12 min', tags:['Must see'], note:'Look for Liberty the bald eagle, waterfalls, stream fish, and the river otters Charlie and Beau.'},
  {id:'piedmont', title:'Piedmont & Freshwater Habitats', time:'10 min', tags:['SC habitats'], note:'Use this as the “from the mountains to the sea” transition: rivers, wetlands, reptiles, amphibians, and native fish.'},
  {id:'touch', title:'Touch Tank / Hands-on Moment', time:'10–15 min', tags:['Must see','Kids'], note:'Good pause point. Wash hands, move slowly, and ask staff which animals are most active.'},
  {id:'aviary', title:'Saltmarsh Aviary / Coast', time:'12 min', tags:['Photos'], note:'Watch for birds, marsh life, and the visual shift from inland habitats toward the coast.'},
  {id:'ocean', title:'Great Ocean Tank', time:'15–20 min', tags:['Must see'], note:'Take your time here. Look for sharks, rays, large fish, and sea turtles moving through different levels of the tank.'},
  {id:'jurassic', title:'Jurassic Seas', time:'10–15 min', tags:['New exhibit'], note:'A prehistoric-ocean themed stop with fossils, marine reptiles, VR/interactives, and a strong “wow” factor.'},
  {id:'turtles', title:'Sea Turtle Care Center™', time:'15 min', tags:['Must see','Conservation'], note:'End with the rescue and rehabilitation story. Look for patient updates and daily conservation tips.'},
  {id:'gift', title:'Gift Shop / Final Harbor View', time:'5–10 min', tags:['Finish'], note:'Grab a souvenir, then take a last look toward the harbor, Ravenel Bridge, or Fort Sumter area.'}
];
const food = [
  {name:'Fleet Landing', kind:['seafood'], walk:'Waterfront seafood option, roughly a short drive or longer scenic walk from the Aquarium area.', note:'Good for shrimp & grits / coastal meal.', url:'https://www.google.com/maps/search/?api=1&query=Fleet%20Landing%20186%20Concord%20St%20Charleston%20SC'},
  {name:'East Bay Deli', kind:['quick'], walk:'Casual sandwiches and salads downtown.', note:'Easy, practical lunch if you want quick and familiar.', url:'https://www.google.com/maps/search/?api=1&query=East%20Bay%20Deli%20Charleston%20SC'},
  {name:'Carmella’s Cafe & Dessert Bar', kind:['dessert','quick'], walk:'Dessert, coffee, gelato, and light bites at 198 E Bay Street.', note:'Good after-aquarium treat stop.', url:'https://www.google.com/maps/search/?api=1&query=Carmella%27s%20198%20E%20Bay%20Street%20Charleston%20SC'},
  {name:'The Griffon', kind:['quick'], walk:'Pub food near Vendue Range.', note:'Fish & chips, burgers, casual downtown feel.', url:'https://www.google.com/maps/search/?api=1&query=The%20Griffon%2018%20Vendue%20Range%20Charleston%20SC'},
  {name:'Charleston City Market Area', kind:['quick','dessert'], walk:'Cluster of casual bites, sweets, and sit-down restaurants nearby.', note:'Good if the group wants choices.', url:'https://www.google.com/maps/search/?api=1&query=restaurants%20near%20Charleston%20City%20Market'}
];
const completed = new Set(JSON.parse(localStorage.getItem('completedStops') || '[]'));
const list = document.getElementById('tourList');
function renderStops(){
  list.innerHTML = stops.map((s,i)=>`<li class="stop ${completed.has(s.id)?'done':''}"><input type="checkbox" data-id="${s.id}" ${completed.has(s.id)?'checked':''} aria-label="Mark ${s.title} complete"><div><h3>${i+1}. ${s.title}</h3><p class="meta">${s.time}</p><p>${s.note}</p><div>${s.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div></li>`).join('');
  updateProgress();
}
function updateProgress(){
  const pct = Math.round((completed.size / stops.length) * 100);
  document.querySelector('#progressBar span').style.width = `${pct}%`;
}
list.addEventListener('change', e=>{
  const id = e.target.dataset.id;
  if(!id) return;
  e.target.checked ? completed.add(id) : completed.delete(id);
  localStorage.setItem('completedStops', JSON.stringify([...completed]));
  renderStops();
});
document.getElementById('resetProgress').addEventListener('click',()=>{completed.clear();localStorage.removeItem('completedStops');renderStops();});

document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tab,.panel').forEach(el=>el.classList.remove('active'));
  btn.classList.add('active'); document.getElementById(btn.dataset.tab).classList.add('active');
}));
function renderFood(filter='all'){
  const items = food.filter(f=>filter==='all' || f.kind.includes(filter));
  document.getElementById('foodList').innerHTML = items.map(f=>`<a class="food-card" href="${f.url}" target="_blank" rel="noopener"><h3>${f.name}</h3><p class="meta">${f.kind.join(' • ')}</p><p>${f.walk}</p><p>${f.note}</p></a>`).join('');
}
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active'); renderFood(btn.dataset.filter);
}));
if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js')); }
renderStops(); renderFood();
