${include-once: ../Placeholder.js}

class TextPlaceholder extends Placeholder {
	constructor(/**@type {String}*/name) {
		super(name, 'text');
	}




	createDom() {
		const container = super.createDom();
		const input = document.createElement('input'); {
			this.dom.input = input;
			this.dom.label.append(input);
		}
		return container;
	}




	get parsedText() {
		return this.dom.input.value;
	}
}