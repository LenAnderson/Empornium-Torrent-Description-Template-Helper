${include-once: ../Placeholder.js}

class ImageListPlaceholder extends Placeholder {
	constructor(/**@type {String}*/name) {
		super(name, 'image[]');
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
		return this.dom.input.value.split('\n').map(it=>`[img]${it}[/img]`).join('\n');
	}
}