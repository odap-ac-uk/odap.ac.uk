import * as igd from "./igd-graph.js";

const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]

export async function fcs_data() {
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

    return network;
}

export async function nsh_data() {
    const main = await fetch("/assets/data/nsh_main.json").then(response => response.json());
    const c19 = await fetch("/assets/data/nhss_main.json").then(response => response.json());
    const c19_main = await fetch("/assets/data/nhss_linkage.json").then(response => response.json());
    const nhsd = await fetch("/assets/data/nhsd_core.json").then(response => response.json());

    c19.forEach(c => {
        c.ds = c.projects.split(/ *, */);
        c.n = parseInt(c.n_patients);
    });

    c19_main.forEach(c => {
        c.ds = c.projects.split(/ *, */);
        c.n = c.n_participants == "<5"? 2.5: parseInt(c.n_participants);
    });

    const cohorts = main.concat(c19);
    const sources = [
        {
            name: 'cog',
            ds: ['cog-uk']
        },
        {
            name: 'rs-genomicc',
            ds: ['genomicc']
        },
        {
            name: 'rs-phosp',
            ds: ['phosp']
        },
        {
            name: 'isaric4c',
            ds: ['isaric']
        },
        {
            name: "nhss",
            label: "NHS Scotland Covid 19 Database",
            ds: [
                "deaths", "prescribing", "primary_care", "sicsag", "smr00", "smr01", "smr02", "smr06", "testing"
            ]
        },
        {
            name: "nhsd",
            label: "NHS Digital",
            ds: ["Deaths","AE","ECDS","CHESS","SGSS","Pillar 2","Vaccination Status","Vaccination Adverse Reactions","GP","NDA","IAPT","MHS"
            ]
        }
    ]



    const network = {
        edges: []
    }

    // create node tree
    network.nodes = igd.gridify(sources, [20,20,560,560], null, "columns").map((n, i) => { return { name: n.data.name, label: n.data.label, n: 0, x: n.x, y: n.y, color: colors[i], nodes: n.data.ds.map(ds => { return {name: ds, n: 0, color: colors[i]}})}});

    // c19_main does not participate in creating nodes and setting their weights, so it is not included in this stage of the prep:

    // populate n's for each node and subnode:
    network.nodes.forEach(n => {
        if (n.name == "nhsd") {
            n.n = 309731;
            for (let node of n.nodes) {
                node.n = nhsd.find(e => e.ds == node.name)?.n;
            }
        } else {
            cohorts.filter(c => c.ds.some(ds => n.nodes.find(sn => sn.name == ds))).forEach(cohort => {
                n.n += cohort.n
                for (let name of cohort.ds) {
                    let sn = n.nodes.find(sn => sn.name == name)
                    if (sn) sn.n += cohort.n;
                }
            })
        }
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

    // create c19-main linkages, which are *inclusive* of any numbers already processed: 
    // this means we need to ignore any links previously discovered by the loop through cohorts.

    const c19_main_edges = []
    for (let c of c19_main) {
        const links = c.ds.slice();
        const first = links.pop();
        const first_src = network.nodes.find(n => n.nodes.some(sn => sn.name == first)).name;

        while (links.length) {
            let next = links.pop();
            let next_src = network.nodes.find(n => n.nodes.some(sn => sn.name == next)).name;

            const mapc19mainlink = (name1, name2, weight) => {
                let oldlink = network.edges.find(l => l.nodes.includes(name1) && l.nodes.includes(name2));
                if (oldlink) return;

                let newlink = c19_main_edges.find(l => l.nodes.includes(name1) && l.nodes.includes(name2));
                if (newlink) {
                    newlink.weight += weight;
                } else {
                    c19_main_edges.push({
                        nodes: [name1, name2],
                        weight: weight
                    })
                }
            }
        
            // map linkage between datasets, and also to their respective sources
            mapc19mainlink(first, next, c.n);
            mapc19mainlink(first_src, next, c.n);
            mapc19mainlink(first, next_src, c.n);
            mapc19mainlink(first_src, next_src, c.n);
        }
    }

    // handle any hanging 0.5s from non-disclosure
    c19_main_edges.forEach(e => e.weight = Math.trunc(e.weight))

    network.edges.push(...c19_main_edges);

    network.edges.push({ nodes: ["nhsd", "isaric"], weight: 309731});
    network.edges.push(...nhsd.map(e => { return { nodes: [e.ds, "isaric"], weight: e.n}}));

    return network;

}