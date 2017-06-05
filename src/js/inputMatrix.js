export default class {
	/**
	 * Dynamic append matrix
	 *
	 * @param dimension
	 */
	static createMatrix(dimension) {


		if (dimension <= 10 && dimension > 1) {


			let form = $('#matrix-content').empty();
			$('.columnName').empty();
			$('.rowName').empty();

			$('.columnName').append('<p> </p>');
			$('.matrix-details').css('visibility', 'visible');
			for (let i = 0; i < dimension; i++) {
				$('.columnName').append('<p>' + String.fromCharCode(65 + i) + '</p>');
				$('.rowName').append('<p>' + String.fromCharCode(65 + i) + '</p>');

				for (let j = 0; j < dimension; j++) {
					let randomValue = (i < j) ? Math.floor((Math.random() * 20)) : $('.x-' + j + '.y-' + i).val();
					let input = $('<input>')
						.attr({
							class: 'matrix_cell x-' + i + ' y-' + j,
							maxlength: 3,
							value: i === j ? 0 : randomValue
						});
					form.append(input[0]);
				}

				form.append($('<br>')[0]);

			}
		} else {
			const alert = document.createElement('div'),
				message = document.createElement('p');


			message.textContent = 'Zła liczba (Podaj liczbę z przedziału od 2 do 10)';
			alert.classList.add('alert');
			alert.appendChild(message);
			document.querySelector('.container').appendChild(alert);

			setTimeout(()=>{
				document.querySelector('.container').removeChild(alert);
			},3000)
		}
	};

	/**
	 * Return mapped matrix response
	 *
	 * @returns {Array}
	 */
	static getMatrix() {
		let matrix_row = [];
		let ind = 0;

		$("#matrix-content").contents().each(function (i, e) {
			if (this.nodeName == "INPUT") {
				if (!matrix_row[ind]) {
					matrix_row.push([]);
				}
				matrix_row[ind].push($(this).val());
			}
			else {
				ind++;
			}
		});

		return matrix_row;
	};

	/**
	 * Force symetric  matrix
	 *
	 * @param event
	 */
	static forceMatrixSymetric(event) {
		let target = $(event.target);
		let cls = target.attr('class').split(' ');
		let x = cls[1];
		let y = cls[2];

		let elementVal = $('.' + x + '.' + y).val();

		let newX = y.split('-')[1];
		let newY = x.split('-')[1];
		$('.x-' + newX + '.y-' + newY).val(elementVal);
	}

	/**
	 * @param matrix
	 * @returns {Array}
	 */
	static arrayToGraphObject(matrix) {
		let links = [];
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				if (j > i && matrix[i][j] != 0) {
					links.push({
						source: String.fromCharCode(65 + i),
						target: String.fromCharCode(65 + j),
						weight: matrix[i][j]
					});
				}
			}
		}

		return links;
	}
}

