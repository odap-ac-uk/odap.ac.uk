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
    //const c19 = await fetch("/assets/data/nhss_main.json").then(response => response.json());
    const c19_main = await fetch("/assets/data/nhss_linkage.json").then(response => response.json());
    const nhsd = await fetch("/assets/data/nhsd_internal.json").then(response => response.json());

//    c19.forEach(c => {
//        c.ds = c.projects.split(/ *, */);
//        c.n = parseInt(c.n_patients);
//    });

    c19_main.forEach(c => {
        c.ds = c.projects.split(/ *, */);
        c.n = c.n_participants == "<5"? 2.5: parseInt(c.n_participants);
    });

    const cohorts = main.concat(c19_main);

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
            ].map(name => `nhss_${name}`)
        },
        {
            name: "nhsd",
            label: "NHS Digital",
            ds: nhsd.nodes.map(n => `nhsd_${n.name}`)
        },
        {
            name: "recovery",
            label: "RECOVERY-ISARIC",
            ds: []
        }
    ]



    const network = {
        edges: []
    }

    // create node tree
    network.nodes = igd.gridify(sources, [20,20,560,560], null, "columns").map((n, i) => { return { name: n.data.name, label: n.data.label, n: 0, x: n.x, y: n.y, color: colors[i], nodes: n.data.ds.map(ds => { return {name: ds, label: ds.includes("_")? ds.split("_")[1]: ds, n: 0, color: colors[i]}})}});

    // populate n's for each node and subnode:
    network.nodes.forEach(n => {
        if (n.name == "nhsd") {
            n.n = 309731;
            for (let node of n.nodes) {
                node.n = nhsd.nodes.find(e => `nhsd_${e.name}` == node.name)?.n;
            }
        } else if (n.name == "recovery") {
            n.n = 277398;
            n.nodes.push({ name: "reco-isaric", label: "isaric (recovery)", n: 277398 });
            n.nodes.push({name: "reco-recovery", label: "Recovery", n: 300 });
        } else {
            cohorts.filter(c => c.ds.some(ds => n.nodes.find(sn => sn.name == ds || sn.name == `${n.name}_${ds}`))).forEach(cohort => {
                n.n += cohort.n
                for (let name of cohort.ds) {
                    let sn = n.nodes.find(sn => sn.name == name || sn.name == `${n.name}_${name}`)
                    if (sn) sn.n += cohort.n;
                }
            })
        }
    })

    const find = (nodes, name) => {
            for (let node of nodes) {
                if (node.name == name) return node;
                if (node.nodes) {
                    let nested = find(node.nodes, name);
                    if (nested) return nested;
                }
            }
            return;
    }


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
        let first_n = find(network.nodes, first);
        if (!first_n) {
            first_n = find(network.nodes, `nhss_${first}`);
        }

        const first_src = network.nodes.find(n => n.nodes.some(sn => sn == first_n));

        while (links.length) {
            let next = links.pop();
            let next_n = find(network.nodes, next);
            if (!next_n) {
                next_n = find(network.nodes, `nhss_${next}`);
            }
    
            let next_src = network.nodes.find(n => n.nodes.some(sn => sn == next_n));

            // map linkage between datasets, and also to their respective sources
            maplink(first_n.name, next_n.name, c.n);

            // don't map source links if the datasets have the same source!
            if (first_src != next_src) {
                maplink(first_src.name, next_n.name, c.n);
                maplink(first.name, next_src.name, c.n);
                maplink(first_src.name, next_src.name, c.n);
            }
        }
    }

    network.edges.push({ nodes: ["nhsd", "isaric"], weight: 309731});
    network.edges.push(...nhsd.edges.map(e => {return { nodes: e.nodes.map(name => `nhsd_${name}`), weight: e.weight}}));
    // need to add isaric to NHS-D dataset edges manually.
    network.edges.push(...nhsd.nodes.map(n => { return { nodes: ["isaric", `nhsd_${n.name}`], weight: n.n }}));

    network.edges.push({nodes: ["reco-isaric", "reco-recovery"], weight: 300})

    network.nodes.forEach(n => {
        n.n = Math.trunc(n.n);
        if (n.nodes?.length) {
            n.nodes.forEach(sn => sn.n = Math.trunc(sn.n));
        }
    });

    network.edges.forEach(e => {
        e.weight = Math.trunc(e.weight);
    })

    return network;

}