import * as igd from './igd-graph.js';
import { createNetwork } from './network.js';

document.head.insertAdjacentHTML("beforeend", `
        <link rel="stylesheet" type="text/css" href="/assets/networks/style/index.css" />
        <link rel="stylesheet" type="text/css" href="/assets/networks/style/foreign.css" />
`
)

// REGION: Data wrangling

const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]

const cohorts = await fetch("/assets/data/fcs_data.json").then(response => response.json());
const sources = await fetch("/assets/data/fcs_src.json").then(response => response.json());


cohorts.forEach(c => {
    c.ds = c.projects.split(",");
    c.n = parseInt(c.n_participants);
});

const network = {
    edges: []
}

// create node tree
network.nodes = igd.gridify(sources, [20,20,560,640]).map((n, i) => { return { name: n.data.name, n: 0, x: n.x, y: n.y, color: colors[i], nodes: n.data.ds.map(ds => { return {name: ds, n: 0, color: colors[i]}})}});

// populate n's for each node and subnode:
network.nodes.forEach(n => {
    cohorts.filter(c => c.ds.some(ds => n.nodes.find(sn => sn.name == ds))).forEach(cohort => {
        n.n += cohort.n
        for (let name of cohort.ds) {
            let sn = n.nodes.find(sn => sn.name == name)
            if (sn) sn.n += cohort.n;
        }
    })
})


const maplink = (name1, name2, weight) => {
    let link = network.edges.find(l => l.nodes.includes(name1) && l.nodes.includes(name2));
    if (link) {
        link.weight += weight;
    } else {
        network.edges.push({
            nodes: [name1, name2],
            weight: weight
        })
    }
}

// create linkages:
for (let c of cohorts) {
    const links = c.ds.slice();
    const first = links.pop();
    const first_src = network.nodes.find(n => n.nodes.some(sn => sn.name == first)).name;

    while (links.length) {
        let next = links.pop();
        let next_src = network.nodes.find(n => n.nodes.some(sn => sn.name == next)).name;

        // map linkage between datasets, and also to their respective sources
        maplink(first, next, c.n);
        maplink(first_src, next, c.n);
        maplink(first, next_src, c.n);
        maplink(first_src, next_src, c.n);
    }
}

// REGION: Basic Setup


let svg = document.querySelector("#canvas");
svg.addEventListener("click", (e) => {
    svg.querySelectorAll(".selected").forEach(s => s.classList.remove("selected"));
});

let fcs_g = svg.querySelector("#fcs_net");
const fcs_net = createNetwork(fcs_g, network.nodes, network.edges, 500, 640);


fcs_net.show();
