class Placeholder {
	/**@type {String}*/ name;
	dom = {
		/**@type {HTMLDivElement}*/ container: null,
		/**@type {HTMLLabelElement}*/ label: null,
		/**@type {HTMLElement}*/ input: null,
	}




	constructor(/**@type {String}*/name, /**@type {String}*/type) {
		this.name = name;
		this.type = type;
	}




	createDom() {
		const container = document.createElement('div'); {
			this.dom.container = container;
			container.classList.add('tdth--placeholder');
			const label = document.createElement('label'); {
				this.dom.label = label;
				label.append(document.createTextNode(`${this.name}:`))
				label.append(document.createElement('br'));
				container.append(label);
			}
		}

		return container;
	}




	remove() {
		this.dom.container.remove();
	}

	replace(replacement) {
		this.dom.container.replaceWith(replacement);
	}




	get value() {
		return this.dom.input.value;
	}
	set value(value) {
		this.dom.input.value = value;
	}

	get parsedText() {
		throw 'Placeholder.parsedText is not implemented!';
	}


	get addEventListener() {
		return this.dom.input.addEventListener.bind(this.dom.input);
	}
	get removeEventListener() {
		return this.dom.input.removeEventListener.bind(this.dom.input);
	}
}