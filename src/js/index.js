import inputMatrix  from './inputMatrix';
import common  from './common';
import graphCalculation  from './graphCalculation';
import {createView} from './view';

$('#dimension-button').click(() => {
	inputMatrix.createMatrix($('#matrix-dimension').val());
});

$("#approve-matrix").click(() => {
	$('.graph').remove();
	$('.viewDrzewo').remove();
	$('.viewGraph').remove();
	const matrix = inputMatrix.getMatrix();
	createView(inputMatrix.arrayToGraphObject(matrix),300);
	$('.view').prepend('<h1 class="text-center mx-auto viewDrzewo">Wizualizacja grafu</h1>');
	$('.view').append('<h1 class="text-center mx-auto viewGraph">Minimalne drzewo rozpinające graf</h1>');
	createView(graphCalculation.calculate(matrix),100);
});

$('#matrix-content')
	.keyup(function (event) {
		inputMatrix.forceMatrixSymetric(event)
	})
	.keydown(function (event) {
		common.validateOnlyNumber(event);
	});
