import * as d3 from 'd3';

export function createView() {

	const width = 1000,
		height = 880,
		links = [
			{
				source: 'A',
				target: 'B',
				weight: 10
			}, {
				source: 'B',
				target: 'C',
				weight: 5
			}, {
				source: 'C',
				target: 'D',
				weight: 5
			}, {
				source: 'D',
				target: 'E',
				weight: 45
			}, {
				source: 'B',
				target: 'F',
				weight: 99
			}, {
				source: 'F',
				target: 'G',
				weight: 2
			}, {
				source: 'G',
				target: 'A',
				weight: 1
			},{source: 'E',
				target: 'G',
				weight: 5
			}, {
				source: 'B',
				target: 'Z',
				weight: 1000
			},{
				source: 'B',
				target: 'X',
				weight: 2
			},{
				source: 'X',
				target: 'Y',
				weight: 56
			}];

	// create empty nodes array
	let nodes = [];

	// compute nodes from links data
	links.forEach(function (link) {
		link.source = nodes[link.source] ||
			(nodes[link.source] = {name: link.source});
		link.target = nodes[link.target] ||
			(nodes[link.target] = {name: link.target});
	});


	// use the force
	const force = d3.layout.force() //build the layout
		.size([width, height]) //specified earlier
		.nodes(d3.values(nodes)) //add nodes
		.links(links) //add links
		.on("tick", tick) //what to do
		//.linkStrength(10)
		//.friction(0.3)
		.gravity(0.06)
		.charge(-3000)
		.linkDistance(80)
		//.theta(-8)
		//.alpha(4)
		.start(); //kick the party off!



	const svg = d3.select('.container').append('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('class', 'graph');

//**********************************************************************

	const path = svg.selectAll('.link')
		.data(force.links())
		.enter().append('g')
		.call(force.drag);

	path.append("svg:path")
		.attr("class", "link")
		.style('stroke', '#c6c6c6')
		.style('stroke-width', '8');

	path.append("text")
		.attr('text-anchor', 'middle')
		.attr('class', 'label')
		.style('stroke', '#000')
		.style('stroke-width', 2)
		.style('font-size', '20px')
		.style('text-anchor', 'middle')
		//.attr("dy", ".35em")
		.text((d) => {
			return d.weight;
		});

	//*****************************************************************
	// define the nodes
	const node = svg.selectAll(".node")
		.data(force.nodes())
		.enter().append("g")
		.attr("class", "node")
		.attr("stroke", "black")
		.attr('stroke-width', '2')
		.style('fill', '#fff')
		.call(force.drag);

	node.append("circle")
		.attr("r", width * 0.02);

	node.append("text")
		.style('font-size', '20px')
		.style('text-anchor', 'middle')
		.style('alignment-baseline', 'middle')
		.text(function (d) {
			return d.name;
		})
		.style('fill', '#fff');


	//-----------------------------------------------------------
	function tick() {
		svg.selectAll('.link').attr("d", function (d) {
			return `
			M ${d.source.x} , ${d.source.y} 
			  ${d.target.x},  ${d.target.y}`;
		});

		svg.selectAll('.label').attr("x", function (d) {
			const dx = d.target.x + d.source.x;
			return dx / 2;
		});

		svg.selectAll('.label').attr("y", function (d) {
			const dy = d.target.y + d.source.y;
			return dy / 2;
		});

		node.attr("transform", function (d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	}
}