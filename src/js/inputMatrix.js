export default class {
	/**
	 * Dynamic append matrix
	 *
	 * @param dimension
	 */
	static createMatrix(dimension) {
		let form = $('#matrix-content').empty();
		if (dimension < 10 && dimension > 0) {
			$('.matrix-details').css('display', 'block');

			for (let i = 0; i < dimension; i++) {
				for (let j = 0; j < dimension; j++) {
					let input = $('<input>')
						.attr({
							class: 'matrix_cell x-' + j + ' y-' + i,
							maxlength: 3,
							value: i === j ? 0 : i + j
						});
					form.append(input[0]);
				}

				form.append($('<br>')[0]);
			}
		} else {
			alert("Too large number. Max is 10")
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
}


