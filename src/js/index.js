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

	createView(inputMatrix.arrayToGraphObject(matrix), 300, false, 1);
	$('.svg:first-of-type').prepend('<h1 class="text-center mx-auto viewDrzewo">Wizualizacja grafu</h1>');

	const calculationResult = graphCalculation.calculate(matrix);
	const links = calculationResult[0];
	const sumWeight = calculationResult[1];

	createView(links, 80, true, 2);
	$('.svg:nth-of-type(2)').prepend('<h1 class="text-center mx-auto viewGraph">Minimalne drzewo rozpinające graf <br> <br> Suma wag: ' + sumWeight + '</h1>');
});

$('#matrix-content')
	.keyup(function (event) {
		inputMatrix.forceMatrixSymetric(event)
	})
	.keydown(function (event) {
		common.validateOnlyNumber(event);
	});

$('#matrix-dimension')
	.keyup(function (event) {
		common.validateOnlyNumber(event);
	});