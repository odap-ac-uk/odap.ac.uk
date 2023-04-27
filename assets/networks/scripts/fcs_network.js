import { createNetwork } from './network.js';

document.head.insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" type="text/css" href="/assets/networks/style/index.css" />
        <link rel="stylesheet" type="text/css" href="/assets/networks/style/foreign.css" />
`
)

// REGION: Data wrangling


const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]

// REGION: Basic Setup


let svg = document.querySelector("#canvas");
svg.addEventListener("click", (e) => {
    svg.querySelectorAll(".selected").forEach(s => s.classList.remove("selected"));
});

const fcs_data = await fetch("/assets/data/fcsnet.json").then(response => response.json());
const nsh_data = await fetch("/assets/data/nshnet.json").then(response => response.json());

const glob_maxn = Math.max(...fcs_data.nodes.map(node => node.n), ...nsh_data.nodes.map(node => node.n));
const glob_maxw = Math.max(...fcs_data.edges.map(edge => edge.weight), ...nsh_data.edges.map(edge => edge.weight));

let fcs_g = svg.querySelector("#fcs_net");
const fcs_net = createNetwork(fcs_g, fcs_data.nodes, fcs_data.edges, {width: 500, height: 640, maxn: glob_maxn, maxw: glob_maxw});


fcs_net.show();

let nsh_g = svg.querySelector("#nsh_net");
const nsh_net = createNetwork(nsh_g, nsh_data.nodes, nsh_data.edges, {width: 500, height: 640, maxn: glob_maxn, maxw: glob_maxw});

nsh_net.show();

