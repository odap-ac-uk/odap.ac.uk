import * as igd from './igd-graph.js';
const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]

export function createNetwork(element, nodes=[], edges=[], width=1024, height=640, scale=(n)=>Math.pow(n, 1/2.5)) {

    // the network object:
    const network = {}

    network.refsize = width*2;

    network.root = element;
    while (network.root.tagName?.toLowerCase() != "svg") {
        network.root = network.root.parentElement;
    }

    if (!network.root) throw new Error("element is neither an svg node nor a child of an svg node");

    if (!network.root.querySelector("#jar")) {
        if (!network.root.querySelector("defs")) root.insertAdjacentHTML("afterbegin", "<defs></defs>");

        network.root.querySelector("defs").insertAdjacentHTML("afterbegin", `<svg xmlns="http://www.w3.org/2000/svg" id="jar" width="10" height="11.5" viewBox="0 0 10 11.5" preserveAspectRatio="none"><path stroke-linejoin="bevel" d="M 0 2 L 0 9 Q 5 13 10 9 L 10 2 Q 5 -1 0 2 Q 5 5 10 2" /></svg>`);
    }

    element.setAttribute("visibility", "hidden");

    const maxn = Math.max(...nodes.map(n => n.n));
    const maxw = Math.max(...edges.map(e => e.weight));

    console.log(maxn, maxw)
    ////////////        UTILITY FUNCTIONS        //////////////////

    const forceRestrain = function(x, y, strength=1) {

        let nodes = [];
    
        const force = function (alpha) {
            nodes.forEach(n => {
                let dx = x - n.x;
                let dy = y - n.y;
    
                n.vx += (dx*2/x)*strength; n.vy += (dy*2/y)*strength;
            });
        }
    
        force.initialize = function (n) {
            nodes = n;
        }
    
        return force;
    }
    
    const createNode = (data) => {

        /* 
        
        expects data in the format:

        {
            name: str,
            n: int,
        }

        and optionally

        {
            index: int OR
            color: str,
            nodes: array of these structures
        }

        Each data object is then assigned the following properties:

        {
            x: int,
            y: int
        }

        and is given a range of utility methods.
        
        */
        const radius = Math.sqrt(scale(data.n/maxn) * network.refsize * Math.PI);
        const u_edge = radius * Math.sqrt(Math.PI);

        let u;
        data.color = data.color || colors[data.index%colors.length] || "grey";
        const subnodes = [];

        if (data.nodes?.length == 1) {
            data.nodes[0].x = data.x;
            data.nodes[0].y = data.y;
            data = data.nodes[0];
        }

        if (data.nodes) {
            u = document.createElementNS("http://www.w3.org/2000/svg", "use");
            u.setAttribute("href", "#jar");
            u.setAttribute("width", u_edge); u.setAttribute("height", u_edge);
            u.setAttribute("stroke", "#0006"); u.setAttribute("fill", data.color);
            u.setAttribute("stroke-width", "0.25");
            u.dataset.name = data.name;
            
            data.nodes.forEach((subdata, i) => {
                let sn = createNode({name: subdata.name, n: subdata.n, color: data.color});
                sn.source = data.name;
                sn.hide();
                subnodes.push(sn);
            })

            u.addEventListener("click", (e) => { // event name changed to null to remove the event, as we don't need to worry about datasets for now.
                u.parentNode.dispatchEvent(new MouseEvent("click"));

                u.setAttribute("visibility", "hidden");
                title.setAttribute("visibility", "hidden");

                
                const sim = d3.forceSimulation().stop(); // create a STOPPED force simulation
                sim.nodes(subnodes);
                
                // initialise positions:
                igd.ringify(subnodes, [data.x - network.refsize/10, data.y-network.refsize/10, data.x+network.refsize/10, data.y+network.refsize/10]).forEach(n => { n.data.x = n.x; n.data.y = n.y });
                // show nodes:
                subnodes.forEach(sn => { sn.show(), sn.showlabel = false; });

                let p = document.createElementNS("http://www.w3.org/2000/svg", "path");
                p.setAttribute("fill", "none");
                p.setAttribute("stroke", data.color);
                p.setAttribute("stroke-width", "5");
                element.appendChild(p);
                p.after(title);

                title.classList.add("active");
                title.removeAttribute("visibility");

                const getBounds = () => {
                    return {
                        xmin: Math.min(...subnodes.map(n => n.x - n.radius), data.x-100),
                        xmax: Math.max(...subnodes.map(n => n.x + n.radius), data.x+100),
                        ymin: Math.min(...subnodes.map(n => n.y - n.radius)),
                        ymax: Math.max(...subnodes.map(n => n.y + n.radius))
                    }

                }
                const resizeBounds = () => {
                    const bounds = getBounds();
                    p.setAttribute("d", `M ${bounds.xmin - 5} ${bounds.ymin - 5} L ${bounds.xmin - 5} ${bounds.ymax + 5} L ${bounds.xmax + 5} ${bounds.ymax + 5} L ${bounds.xmax + 5} ${bounds.ymin - 5} Z`);
                    title.setAttribute("x", bounds.xmin - 3);
                    title.setAttribute("y", bounds.ymin - 3);
                }

                network.edges.forEach(e => e.update());
                resizeBounds();

                // pack using forces:
                console.log(data.x, network.refsize/10)
                sim.force("restrain", null);
                sim.force("restrain", forceRestrain(Math.max(data.x, network.refsize/10), data.y));

                sim.force("collide", null);
                sim.force("collide", d3.forceCollide(function(n) { return n.radius + subnodes.length; }).iterations(2))

                sim.alphaMin(1/(subnodes.length*5));

                sim.on("tick", () => {
                    network.edges.forEach(e => e.update()); resizeBounds();
                });

                sim.on("end", () => { 
                    subnodes.forEach(sn => sn.showlabel = true);

                    const bounds = getBounds();

                    let close = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    close.setAttribute("transform", `translate(${bounds.xmax+3},${bounds.ymin - 3})`);
                    close.classList.add("close");

                    const close_c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    close_c.setAttribute("cx", 0); close_c.setAttribute("cy", 0); close_c.setAttribute("r", 10);
                    close_c.setAttribute("fill", "white");
                    close.appendChild(close_c);

                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M 4 -2 L 0 2 L -4 -2");
                    path.setAttribute("fill", "none");
                    path.setAttribute("stroke", data.color);
                    path.setAttribute("stroke-width", 2);
                    close.appendChild(path);

                    element.appendChild(close);

                    close.addEventListener("click", () => {
                        subnodes.forEach(sn => sn.showlabel = false);

                        const close_sim = d3.forceSimulation().stop();
                        close_sim.nodes(subnodes);
                        close_sim.force("restrain", forceRestrain(data.x, data.y, 2.5));
                        close_sim.alphaMin(1/(subnodes.length*5));

                        close_sim.on("tick", () => {
                            network.edges.forEach(e => e.update());
                            resizeBounds();
                        });

                        close_sim.on("end", () => {
                            subnodes.forEach(sn => sn.hide());
                            u.removeAttribute("visibility");
                            
                            title.setAttribute("x", data.x  - title.querySelector("div").offsetWidth/2);
                            title.setAttribute("y", data.y - title.querySelector("div").offsetHeight/2);
                            title.removeAttribute("visibility");
                            network.edges.forEach(e => e.update());
                        })

                        title.classList.remove("active");
                        title.setAttribute("visibility", "hidden");

                        p.remove();
                        close.remove();
                        close_sim.restart();
                    })
                
                })
                sim.restart();
        });
        } else {
            u = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            u.setAttribute("r", radius);
            u.setAttribute("fill", data.color); u.setAttribute("stroke", u.getAttribute("fill")); u.setAttribute("stroke-width", 1);
            u.dataset.name = data.name;
        }

        let title = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        title.insertAdjacentHTML("afterbegin",`
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <h3>${data.label || data.name.replaceAll("_", " ")}</h3>
                    <p>${data.n} patients.</p>
                </div>
            `);
        title.setAttribute("overflow", "visible");

        u.addEventListener("click", (e) => {
            e.stopPropagation();

            if (u.tagName.toLowerCase() == "circle") {
                element.querySelectorAll(".selected").forEach(s => s.classList.remove("selected"));

                u.classList.add("selected");
                title.classList.add("selected");
                if (!(element.lastChild == title)) {
                    element.lastChild.after(u, title);
                }
            }
        })

        const node = {
            get x() { return data.x }, 
            set x(value) { 
                data.x = value; 
                if (u.tagName.toLowerCase() == "use") {
                    u.setAttribute("x", data.x - u_edge/2);
                    title.setAttribute("x", data.x - title.querySelector("div").offsetWidth/2);
                } else {
                    u.setAttribute("cx", data.x);
                    title.setAttribute("x", data.x - title.querySelector("div").offsetWidth/2);
                }
            },
            get y() { return  data.y },
            set y(value) { 
                data.y = value; 
                if (u.tagName.toLowerCase() == "use") {
                    u.setAttribute("y", data.y - u_edge/2);
                    title.setAttribute("y", data.y - title.querySelector("div").offsetHeight/2);
                } else {
                    u.setAttribute("cy", data.y);
                    title.setAttribute("y", data.y - title.querySelector("div").offsetHeight/2);
                }
            },
            color: data.color || colors[data.index%colors.length],
            name: data.name,
            n: data.n,
            n_raw: data.n_raw,
            hide: function() { u.setAttribute("visibility", "hidden"); title.setAttribute("visibility", "hidden") },
            show: function() { u.removeAttribute("visibility"); title.removeAttribute("visibility"); },
            get hidden() { return u.getAttribute("visibility") == "hidden" },
            set showlabel(value) { value? title.removeAttribute("visibility"): title.setAttribute("visibility", "hidden" );},
            get radius() { return radius; },
            remove: function() { u.remove(); title.remove(); }
        }

        if (subnodes.length > 0) {
            node.nodes = subnodes;
        }

        element.append(u, title);

        if (subnodes.length == 1) {
            node.hide();
            let sub = subnodes[0];
            sub.show();
            sub.showlabel = true;
            sub.x = node.x; sub.y = node.y;
        }

        if (data.x) node.x = data.x;
        if (data.y) node.y = data.y;

        return node;
    }

    const createEdge = function(node1, node2, weight) { 
        if (!node1 || !node2 || node1 == node2)
            return;
        

        const linkid = `${node1.name.replaceAll(" ", "_")}-${node2.name.replaceAll(" ", "_")}`
        // create an appropriate color gradient
        var stroke = network.root.querySelector(`#${linkid}`)

        if (!stroke) {
            stroke = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            stroke.classList.add("linkage");
            stroke.setAttribute("id", linkid);
            stroke.setAttribute("gradientUnits", "userSpaceOnUse");
            stroke.innerHTML = `<stop offset="25%" stop-color="${node1.color}" /><stop offset="75%" stop-color="${node2.color}" />`;

            network.root.querySelector("defs").appendChild(stroke);
        }

        let path = document.createElementNS("http://www.w3.org/2000/svg", "line")
        path.setAttribute("class", "linkage");

        path.setAttribute("stroke", `url('#${linkid}')`);
        path.setAttribute("stroke-width", scale(weight/maxw) * Math.sqrt(network.refsize*Math.PI));

        path.setAttribute("opacity", Math.max(0.5, Math.sqrt(scale(weight/(maxw*2)))));
        // we always want links under all elements, so push to the top of the svg stack.
        element.insertAdjacentElement("afterbegin", path);

        const update = () => {
            if (node1.hidden || node2.hidden) {
                path.setAttribute("visibility", "hidden");
            } else {

                path.setAttribute("x1", node1.x);
                path.setAttribute("y1", node1.y);
                path.setAttribute("x2", node2.x);
                path.setAttribute("y2", node2.y);
                stroke.setAttribute("x1", node1.x);
                stroke.setAttribute("y1", node1.y);
                stroke.setAttribute("x2", node2.x);
                stroke.setAttribute("y2", node2.y);

                path.removeAttribute("visibility");

            }
        }

        update()

        return {
            nodes: [node1, node2],
            weight: weight,
            update: update,
            remove: () => { path.remove(); stroke.remove(); }
        };

    }
    

    // need to search recursively so can't just use Array.proto.find
    const search = (nodes, name) => {
        for (let node of nodes) {
            if (node.name == name) return node;
            if (node.nodes) {
                let nested = search(node.nodes, name);
                if (nested) return nested;
            }
        }
        return;
    }
    
    network.nodes = nodes.map(n => createNode(n));
    
    network.edges = edges.map(e => createEdge(search(network.nodes, e.nodes[0]), search(network.nodes, e.nodes[1]), e.weight)).filter(e => e);

    network.show = () => { element.removeAttribute("visibility") }
    network.hide = () => { element.setAttribute("visibility", "hidden") }


    return network;

}

