import inputMatrix  from './inputMatrix';

$('#dimension-button').click(() => {
	inputMatrix.createMatrix($('#matrix-dimension').val());
});

$("#approve-matrix").click(() => {
	console.log(inputMatrix.getMatrix());
});
