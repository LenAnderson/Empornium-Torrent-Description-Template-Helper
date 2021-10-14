// ==UserScript==
// @name         Empornium - Torrent Description Template Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.empornium.is/upload.php
// @match        https://www.empornium.sx/upload.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const log = (...msgs)=>console.log.call(console.log, '[EMP-TDTH]', ...msgs);

    const $ = (root,query)=>(query?root:document).querySelector(query?query:root);
    const $$ = (root,query)=>Array.from((query?root:document).querySelectorAll(query?query:root));


	/* eslint-disable no-alert */
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

class TemplateHelper {
	/**@type {HTMLTextAreaElement}*/ input;
	/**@type {HTMLDivElement}*/ placeholderContainer;

	/**@type {Boolean}*/ isShowingRaw = true;
	/**@type {Boolean}*/ isShowingPreview = false;
	/**@type {String}*/ rawText = '';

	/**@type {RegExp}*/ matcher = /\$\{([a-z0-9]+)(?::(text|textarea|image|image\[\])?\})/ig;

	placeholderList = [];




	constructor() {
		this.createDom();
		this.input = $('#desc');
		this.input.value = this.input.value || localStorage.getItem('emp-tdth--rawText') || '';
		this.findPlaceholders();
		this.input.addEventListener('change', ()=>this.findPlaceholders());

		$('#post_preview').onclick = '';
		$('#post_preview').addEventListener('click', (evt)=>{
			if (this.isShowingPreview) {
				this.isShowingPreview = false;
				Upload_Quick_Edit();
				this.showRawText();
			} else {
				this.isShowingPreview = true;
				this.showParsedText(evt);
				this.input.disabled = false;
				Upload_Quick_Preview();
			}
		});
		$('#post').addEventListener('click', (evt)=>{
			this.showParsedText(evt);
			$('#upload_table').requestSubmit();
		});
	}


	createDom() {
		const css = document.createElement('style'); {
			// @ts-ignore
			css.innerHTML = '.tdth--placeholderContainer {  box-sizing: border-box;  padding: 5px;}.tdth--placeholderContainer > .tdth--placeholder {  margin-top: 5px;}.tdth--placeholderContainer > .tdth--placeholder input {  box-sizing: border-box;  width: 100%;}.tdth--placeholderContainer > .tdth--placeholder textarea {  box-sizing: border-box;  height: 100px;  width: 100%;  resize: vertical;}';
			document.body.append(css);
		}
		const tr = document.createElement('tr'); {
			const td = document.createElement('td'); {
				td.colSpan = 2;
				const container = document.createElement('div'); {
					container.classList.add('tdth--placeholderContainer');
					this.placeholderContainer = container;
					const btnRaw = document.createElement('button'); {
						btnRaw.textContent = 'Show Raw Text';
						btnRaw.addEventListener('click', evt=>this.showRawText(evt));
						container.append(btnRaw);
					}
					const btnParsed = document.createElement('button'); {
						btnParsed.textContent = 'Show Parsed Text';
						btnParsed.addEventListener('click', evt=>this.showParsedText(evt));
						container.append(btnParsed);
					}
					td.append(container);
				}
				tr.append(td);
			}
			$('.bb_holder > tbody').append(tr);
		}
	}


	findPlaceholders() {
		if (this.isShowingRaw) {
			this.rawText = this.input.value;
			localStorage.setItem('emp-tdth--rawText', this.rawText);
			const matches = Array.from(this.rawText.matchAll(this.matcher));
			console.log(matches);
			matches.forEach(([match,name,type])=>{
				let oldPlaceholder = this.placeholderList.find(it=>it.name==name);
				if (!oldPlaceholder || oldPlaceholder.type != type) {
					let placeholder;
					switch (type) {
						case 'image':
							placeholder = new ImagePlaceholder(name);
							break;
						case 'image[]':
							placeholder = new ImageListPlaceholder(name);
							break;
						case 'textarea':
							placeholder = new TextareaPlaceholder(name);
							break;
						case 'text':
						default:
							placeholder = new TextPlaceholder(name);
							break;
					}
					if (placeholder) {
						if (!oldPlaceholder) {
							this.placeholderContainer.append(placeholder.createDom());
							this.placeholderList.push(placeholder);
						} else {
							oldPlaceholder.replace(placeholder.createDom());
							this.placeholderList.splice(this.placeholderList.indexOf(oldPlaceholder), 1, placeholder);
						}
						const cache = JSON.parse(localStorage.getItem('emp-tdth--placeholders')||'[]').find(it=>it.name==name);
						if (cache) {
							placeholder.value = cache.value;
						}
						placeholder.addEventListener('change', ()=>this.updateParsed());
					}
				}
			});
		}
	}


	showRawText(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.isShowingRaw = true;
		this.input.disabled = false;
		this.input.value = this.rawText;
	}
	showParsedText(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.isShowingRaw = false;
		this.input.disabled = true;
		this.input.value = this.parsedText;
	}

	updateParsed() {
		localStorage.setItem('emp-tdth--placeholders', JSON.stringify(this.placeholderList.map(it=>({name:it.name,value:it.value}))));
		if (!this.isShowingRaw) {
			this.input.value = this.parsedText;
		}
	}


	get parsedText() {
		return this.rawText.replace(this.matcher, (match, name, type)=>{
			const placeholder = this.placeholderList.find(it=>it.name==name);
			if (placeholder) {
				return placeholder.parsedText;
			}
			return `!! NOT FOUND: ${match} !!`;
		});
	}
}
	const helper = new TemplateHelper();
	console.log(helper);
})();