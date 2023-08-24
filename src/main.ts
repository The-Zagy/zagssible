import './index.css'
import FontResizer from './lib/font'
const fontResizer = new FontResizer()
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 class="text-4xl"">Hello Vite!</h1>
    <p class="text-3xl">Resize the text below</p>
    <p class="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <p class="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
    <button  id="big">bigger</button>
    <button id="smol">smaller</button>
  </div>
`



const bigger = document.getElementById('big')!
bigger.onclick = () => {
  fontResizer.resize();
};

const smaller = document.getElementById('smol')!
smaller.onclick = () => {
  fontResizer.resize("out");
}

