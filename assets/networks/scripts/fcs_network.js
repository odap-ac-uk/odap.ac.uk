import { createNetwork } from './network.js';
import * as data from './data.js';

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

data.fcs_data().then(network => {
    let fcs_g = svg.querySelector("#fcs_net");
    const fcs_net = createNetwork(fcs_g, network.nodes, network.edges, 500, 640);

    fcs_net.show();
});

data.nsh_data().then(network => {
    let nsh_g = svg.querySelector("#nsh_net");
    const nsh_net = createNetwork(nsh_g, network.nodes, network.edges, 500, 640);

    nsh_net.show();
})

