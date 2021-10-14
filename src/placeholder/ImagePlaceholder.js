${include-once: ../Placeholder.js}

class ImagePlaceholder extends Placeholder {
	constructor(/**@type {String}*/name) {
		super(name, 'image');
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
		return `[img]${this.dom.input.value}[/img]`;
	}
}