export function node(data, x=0, y=0) {
    return {
        x, y, data
    }
}

export function edge(node1, node2, weight) {
    return {
        start: [node1.x, node1.y],
        end: [node2.x, node2.y],
        weight: weight,
        data: [node1.data, node2.data]
    }
}

export function gridify(data, bounds=[0,0,600,400], rows, layout="rows") {
    let landscape = bounds[2]-bounds[0] > bounds[3]-bounds[1]; // determine which direction to place larger bound
    
    rows = rows || Math.floor(Math.sqrt(data.length));
    let cols = Math.ceil(data.length/rows);
    
    if (!landscape) [cols,rows] = [rows, cols]

    let xoffset = (bounds[2]-bounds[0])/cols, yoffset = (bounds[3] - bounds[1])/rows;

    let grid = []

    data.forEach((d, i) => {
        // if we lay out rows first, the y position remains the same and the x position increases:
        let oy = (layout=="rows"? i % rows: Math.floor(i/cols)) * yoffset;
        let ox = (layout=="rows"? Math.floor(i/rows): i % cols) * xoffset;

        grid.push(node(d, bounds[0] + ox + xoffset/2, bounds[1] + oy + yoffset/2));
    })

    return grid;
}

export function ringify(data, bounds=[0,0,600,400]) {
    let center = [bounds[0]+(bounds[2]-bounds[0])/2, bounds[1]+(bounds[3]-bounds[1])/2];
    let ylength = (bounds[3]-bounds[1])/2;
    let xlength = (bounds[2]-bounds[0])/2;

    let theta = 2*Math.PI/data.length;

    let ring = [];

    data.forEach((d, i) => {
        ring.push(node(d, center[0]+(xlength*Math.sin(i*theta)), center[1]-(ylength*Math.cos(i*theta))));
    })

    return ring;
}