// ==UserScript==
// @name         Empornium - Torrent Description Template Helper
// @namespace    https://github.com/LenAnderson/
// @downloadURL  https://github.com/LenAnderson/Empornium-Torrent-Description-Template-Helper/raw/master/Empornium-Torrent-Description-Template-Helper.user.js
// @version      0.1
// @author       LenAnderson
// @match        https://www.empornium.is/upload.php
// @match        https://www.empornium.sx/upload.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const log = (...msgs)=>console.log.call(console.log, '[EMP-TDTH]', ...msgs);

    const $ = (root,query)=>(query?root:document).querySelector(query?query:root);
    const $$ = (root,query)=>Array.from((query?root:document).querySelectorAll(query?query:root));


	${include: TemplateHelper.js}
	const helper = new TemplateHelper();
	console.log(helper);
})();