/* eslint-disable no-alert */
${include-once: placeholder/TextPlaceholder.js}
${include-once: placeholder/TextareaPlaceholder.js}
${include-once: placeholder/ImagePlaceholder.js}
${include-once: placeholder/ImageListPlaceholder.js}

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
			css.innerHTML = '${include-min-esc: style.css}';
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