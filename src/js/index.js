import inputMatrix  from './inputMatrix';
import common  from './common';
import graphCalculation  from './graphCalculation';
import {createView} from './view';

$('#dimension-button').click(() => {
	inputMatrix.createMatrix($('#matrix-dimension').val());
});

$("#approve-matrix").click(() => {
	$('.graph').remove();
	const matrix = inputMatrix.getMatrix();
	createView(inputMatrix.arrayToGraphObject(matrix));
	createView(graphCalculation.calculate(matrix));
});

$('#matrix-content')
	.keyup(function (event) {
		inputMatrix.forceMatrixSymetric(event)
	})
	.keydown(function (event) {
		common.validateOnlyNumber(event);
	});
