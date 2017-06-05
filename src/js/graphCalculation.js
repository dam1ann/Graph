export default class {

	/**
	 * @param graph
	 * @param visited
	 * @param row
	 * @returns {number}
	 */
	static minimum(graph, visited, row) {
		let min = 9999, minIndex = -1;

		for (let i = 0; i < graph.length; i++) {
			if (parseInt(graph[row][i], 10) > 0 && parseInt(graph[row][i], 10) < min && visited[i] === false) {
				min = graph[row][i];
				minIndex = i;
			}
		}

		return minIndex;
	}

	/**
	 * @param graph
	 * @returns {Array}
	 */
	static calculate(graph) {
		const visited = [], prev = [], links = [];
		let minIndex = 0, row = 0, prevCounter = 0, lastVisited = 0, minWeight = 0, rowToWeight = 0, sumWeight = 0;

		for (let i = 0; i < graph.length; i++) visited[i] = false;
		visited[0] = true;

		for (let i = 0; i < graph.length - 1; i++) {
			prevCounter = i;

			do {
				minIndex = this.minimum(graph, visited, row);
				rowToWeight = row;
				prevCounter = prevCounter - 1;
				row = prev[prevCounter];

				if (minIndex === -1) lastVisited = row;
			} while (minIndex === -1 && prevCounter >= 0);

			if (typeof rowToWeight === 'undefined') rowToWeight = 0;
			minWeight = graph[rowToWeight][minIndex];

			sumWeight = parseInt(minWeight) + parseInt(sumWeight);
			visited[minIndex] = true;
			row = minIndex;
			prev[i] = row;

			links.push({
				source: String.fromCharCode(65 + lastVisited),
				target: String.fromCharCode(65 + minIndex),
				weight: minWeight,
			});

			lastVisited = minIndex;
		}

// 	let graph =
// 		[
// 			[0, 1, 8, 0, 5, 0],
// 			[1, 0, 0, 0, 1, 0],
// 			[8, 0, 0, 2, 0, 0],
// 			[0, 0, 2, 0, 2, 1],
// 			[5, 1, 0, 2, 0, 0],
// 			[0, 0, 0, 1, 0, 0]
// 		];
// 		let graph = [
// 			[0,  12, 0,  0,  14, 0, 20],
// 			[12, 0,  12, 10, 6,  0, 0],
// 			[0,  12, 0,  4,  0,  0, 0],
// 			[0,  10, 4,  0,  0,  6, 0],
// 			[14, 6,  0,  0,  0,  6, 8],
// 			[0,  0,  0,  6,  6,  0, 4],
// 			[20, 0,  0,  0,  8,  4, 0]
// 		];
		return [links, sumWeight];
	}
}