${include-once: ../Placeholder.js}

class TextareaPlaceholder extends Placeholder {
	constructor(/**@type {String}*/name) {
		super(name, 'textarea');
	}




	createDom() {
		const container = super.createDom();
		const input = document.createElement('textarea'); {
			this.dom.input = input;
			this.dom.label.append(input);
		}
		return container;
	}




	get parsedText() {
		return this.dom.input.value;
	}
}