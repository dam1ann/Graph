import inputMatrix  from './inputMatrix';
import common  from './common';
import {createView} from './view';

$('#dimension-button').click(() => {
	inputMatrix.createMatrix($('#matrix-dimension').val());
});

$("#approve-matrix").click(() => {
	createView(arrayToGraphObject(inputMatrix.getMatrix()));
	//console.log(inputMatrix.getMatrix());
});

$('#matrix-content')
	.keyup(function (event) {
		inputMatrix.forceMatrixSymetric(event)
	})
	.keydown(function (event) {
		common.validateOnlyNumber(event);
	});


function arrayToGraphObject(data) {

	let links = [];
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (j > i) {
				links.push({
					source: String.fromCharCode(65 + i),
					target: String.fromCharCode(65 + j),
					weight: data[i][j]
				});
			}
		}
	}
	return links;
}
