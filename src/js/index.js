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

	createView(inputMatrix.arrayToGraphObject(matrix),300,false,1);
	$('.svg:first-of-type').prepend('<h1 class="text-center mx-auto viewDrzewo">Minimalne drzewo rozpinające graf</h1>');

	createView(graphCalculation.calculate(matrix),50, true,2);
	$('.svg:nth-of-type(2)').prepend('<h1 class="text-center mx-auto viewGraph">Wizualizacja grafu</h1>');
});

$('#matrix-content')
	.keyup(function (event) {
		inputMatrix.forceMatrixSymetric(event)
	})
	.keydown(function (event) {
		common.validateOnlyNumber(event);
	});
