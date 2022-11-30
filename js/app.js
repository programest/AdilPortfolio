(() => {

	window.setTimeout((function () {
		document.addEventListener('DOMContentLoaded', function () {
			document.body.classList.add('ready');
		})
	}), 1200);
	"use strict";
	function isWebp() {
		function testWebP(callback) {
			let webP = new Image;
			webP.onload = webP.onerror = function () {
				callback(2 == webP.height);
			};
			webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
		}
		testWebP((function (support) {
			let className = true === support ? "webp" : "no-webp";
			document.documentElement.classList.add(className);
		}));
	}
	function getHash() {
		if (location.hash) return location.hash.replace("#", "");
	}
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout((() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty("height") : null;
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				!showmore ? target.style.removeProperty("overflow") : null;
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target
					}
				}));
			}), duration);
		}
	};
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains("_slide")) {
			target.classList.add("_slide");
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty("height") : null;
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = height + "px";
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			window.setTimeout((() => {
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.classList.remove("_slide");
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target
					}
				}));
			}), duration);
		}
	};
	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
	};
	let bodyUnlock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout((() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = "0px";
				}
				body.style.paddingRight = "0px";
				document.documentElement.classList.remove("lock");
			}), delay);
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	let bodyLock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			}
			body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
			document.documentElement.classList.add("lock");
			bodyLockStatus = false;
			setTimeout((function () {
				bodyLockStatus = true;
			}), delay);
		}
	};
	function menuInit() {
		if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
			if (bodyLockStatus && e.target.closest(".icon-menu")) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		}));
	}
	function menuClose() {
		bodyUnlock();
		document.documentElement.classList.remove("menu-open");
	}
	function showMore() {
		window.addEventListener("load", (function (e) {
			const showMoreBlocks = document.querySelectorAll("[data-showmore]");
			let showMoreBlocksRegular;
			let mdQueriesArray;
			if (showMoreBlocks.length) {
				showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function (item, index, self) {
					return !item.dataset.showmoreMedia;
				}));
				showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				document.addEventListener("click", showMoreActions);
				window.addEventListener("resize", showMoreActions);
				mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
				if (mdQueriesArray && mdQueriesArray.length) {
					mdQueriesArray.forEach((mdQueriesItem => {
						mdQueriesItem.matchMedia.addEventListener("change", (function () {
							initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
						}));
					}));
					initItemsMedia(mdQueriesArray);
				}
			}
			function initItemsMedia(mdQueriesArray) {
				mdQueriesArray.forEach((mdQueriesItem => {
					initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				}));
			}
			function initItems(showMoreBlocks, matchMedia) {
				showMoreBlocks.forEach((showMoreBlock => {
					initItem(showMoreBlock, matchMedia);
				}));
			}
			function initItem(showMoreBlock, matchMedia = false) {
				showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
				let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
				let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
				showMoreContent = Array.from(showMoreContent).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
				showMoreButton = Array.from(showMoreButton).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
				const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
				if (matchMedia.matches || !matchMedia) if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			}
			function getHeight(showMoreBlock, showMoreContent) {
				var hiddenHeight = 160


				const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
				if ("items" === showMoreType) {
					const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
					const showMoreItems = showMoreContent.children;
					if (window.matchMedia("(min-width:320px) and (max-width: 450px) ").matches) {
						hiddenHeight = 90;
					}
					if (window.matchMedia("(min-width:450px) and (max-width: 650px) ").matches) {
						hiddenHeight = 115;
					}
					for (let index = 1; index < showMoreItems.length; index++) {
						const showMoreItem = showMoreItems[index - 1];
						hiddenHeight += showMoreItem.offsetHeight;
						if (index == showMoreTypeValue) break;
					}
				} else {
					const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
					hiddenHeight = showMoreTypeValue;
				}
				return hiddenHeight;
			}
			function getOriginalHeight(showMoreContent) {
				let parentHidden;
				let hiddenHeight = showMoreContent.offsetHeight;
				showMoreContent.style.removeProperty("height");
				if (showMoreContent.closest(`[hidden]`)) {
					parentHidden = showMoreContent.closest(`[hidden]`);
					parentHidden.hidden = false;
				}
				let originalHeight = showMoreContent.offsetHeight;
				parentHidden ? parentHidden.hidden = true : null;
				showMoreContent.style.height = `${hiddenHeight}px`;
				return originalHeight;
			}
			function showMoreActions(e) {
				const targetEvent = e.target;
				const targetType = e.type;
				if ("click" === targetType) {
					if (targetEvent.closest("[data-showmore-button]")) {
						const showMoreButton = targetEvent.closest("[data-showmore-button]");
						const showMoreBlock = showMoreButton.closest("[data-showmore]");
						const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
						const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
						const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
						if (!showMoreContent.classList.contains("_slide")) {
							showMoreBlock.classList.contains("_showmore-active") ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
							showMoreBlock.classList.toggle("_showmore-active");
						}
					}
				} else if ("resize" === targetType) {
					showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
					mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
				}
			}
		}));
	}
	function functions_FLS(message) {
		setTimeout((() => {
			if (window.FLS) console.log(message);
		}), 0);
	}
	function uniqArray(array) {
		return array.filter((function (item, index, self) {
			return self.indexOf(item) === index;
		}));
	}
	function dataMediaQueries(array, dataSetValue) {
		const media = Array.from(array).filter((function (item, index, self) {
			if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
		}));
		if (media.length) {
			const breakpointsArray = [];
			media.forEach((item => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			}));
			let mdQueries = breakpointsArray.map((function (item) {
				return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
			}));
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];
			if (mdQueries.length) {
				mdQueries.forEach((breakpoint => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					const itemsArray = breakpointsArray.filter((function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) return true;
					}));
					mdQueriesArray.push({
						itemsArray,
						matchMedia
					});
				}));
				return mdQueriesArray;
			}
		}
	}
	let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
		const targetBlockElement = document.querySelector(targetBlock);
		if (targetBlockElement) {
			let headerItem = "";
			let headerItemHeight = 0;
			if (noHeader) {
				headerItem = "header.header";
				headerItemHeight = document.querySelector(headerItem).offsetHeight;
			}
			let options = {
				speedAsDuration: true,
				speed,
				header: headerItem,
				offset: offsetTop,
				easing: "easeOutQuad"
			};
			document.documentElement.classList.contains("menu-open") ? menuClose() : null;
			if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
				let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
				targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
				targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
				window.scrollTo({
					top: targetBlockElementPosition,
					behavior: "smooth"
				});
			}
			functions_FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
		} else functions_FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
	};
	let addWindowScrollEvent = false;
	function pageNavigation() {
		document.addEventListener("click", pageNavigationAction);
		document.addEventListener("watcherCallback", pageNavigationAction);
		function pageNavigationAction(e) {
			if ("click" === e.type) {
				const targetElement = e.target;
				if (targetElement.closest("[data-goto]")) {
					const gotoLink = targetElement.closest("[data-goto]");
					const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
					const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
					const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
					const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
					gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
					e.preventDefault();
				}
			} else if ("watcherCallback" === e.type && e.detail) {
				const entry = e.detail.entry;
				const targetElement = entry.target;
				if ("navigator" === targetElement.dataset.watch) {
					document.querySelector(`[data-goto]._navigator-active`);
					let navigatorCurrentItem;
					if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
					if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
				}
			}
		}
		if (getHash()) {
			let goToHash;
			if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
			goToHash ? gotoblock_gotoBlock(goToHash, true, 500, 20) : null;
		}
	}
	setTimeout((() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", (function (e) {
				document.dispatchEvent(windowScroll);
			}));
		}
	}), 0);

	const animItems = document.querySelectorAll("._anim-items");
	if (animItems.length > 0) {
		window.addEventListener("scroll", animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;
				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
				if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_active"); else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft
			};
		}
		setTimeout((() => {
			animOnScroll();
		}), 300);
	}
	var preloader = document.querySelector(".preloader");
	window.setTimeout((function () {
		preloader.classList.add("loaded_hiding");

		preloader.style.display = "none";
		preloader.classList.remove("loaded_hiding");
	})
		, 1500);


	window["FLS"] = true;
	isWebp();
	menuInit();
	showMore();
	pageNavigation();

})();

let langselect = document.querySelector('.container');
let ru = document.querySelector('.ru');
let en = document.querySelector('.en');

function coook(a) {
	let cookie = setCookie('lang', a)
}

var changeLocaleService = (function () {
	var locale;

	function loadLocale(defLang) {

		var xhr = new XMLHttpRequest();
		xhr.open("GET", 'https://programest.github.io/AdilPortfolio/lang.json', true);
		xhr.onreadystatechange = saveLocale.bind(this);
		xhr.onerror = function () { console.log("no found page"); };
		xhr.send();
		let cookie = getCookie('lang')

		function saveLocale() {
			if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
				locale = JSON.parse(xhr.responseText);
				console.log("locale loaded");
				if (defLang) changeLocale(defLang);
				if (cookie === 'ru') {
					changeLocale('ru')
				} else {
					changeLocale('en')
				}
			}
		}
	}

	function changeLocale(lang) {
		if (!locale[lang]) return console.log("no found language");
		else changeText('locale', locale[lang]);

		function changeText(name, object, startIndex) {
			for (key in object)
				if (Array.isArray(object[key]) && typeof object[key] != 'string' && typeof object[key][0] == 'string') getArrayText(key, object, name);
				else if (typeof object[key] == "object") {
					if (isNaN(key)) changeText(name + "-" + key, object[key]);
					else changeText(name, object[key], key);
				}
				else getText(key, object, name, startIndex);
		}
		function getText(key, object, name, startIndex) {
			var elementKey = 0;
			if (startIndex) elementKey = startIndex;

			for (; elementKey < document.getElementsByClassName(name + "-" + key).length; elementKey++)
				if (!isNaN(elementKey)) document.getElementsByClassName(name + "-" + key)[elementKey].textContent = object[key];

		}
		function getArrayText(key, object, name, startIndex) {
			var elementKey = 0;
			if (startIndex) elementKey = startIndex;

			for (; elementKey < document.getElementsByClassName(name + "-" + key).length; elementKey++)
				if (!isNaN(elementKey)) document.getElementsByClassName(name + "-" + key)[elementKey].textContent = object[key][elementKey % object[key].length];
		}

	}

	return {
		loadLocale: loadLocale,
		changeLocale: changeLocale
	}

}());

const googleTranslateConfig = {
	/* Original language */
	lang: "en",

	/* The language we translate into on the first visit*/
	/* Язык, на который переводим при первом посещении */


	/* Если скрипт не работает или работает неправильно, раскомментируйте и укажите основной домен в свойстве domain */
	/* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */

};

document.addEventListener("DOMContentLoaded", (event) => {
	/* Подключаем виджет google translate */
	/* Connecting the google translate widget */
	let script = document.createElement("script");
	script.src = `//translate.google.com/translate_a/element.js?cb=TranslateWidgetIsLoaded`;
	document.getElementsByTagName("head")[0].appendChild(script);
});

function TranslateWidgetIsLoaded() {
	TranslateInit(googleTranslateConfig);
}

function TranslateInit(config) {
	if (config.langFirstVisit && !Cookies.get("googtrans")) {
		/* Если установлен язык перевода для первого посещения и куки не назначены */
		/* If the translation language is installed for the first visit and cookies are not assigned */
		TranslateCookieHandler("/auto/" + config.langFirstVisit);
	}

	let code = TranslateGetCode(config);

	TranslateHtmlHandler(code);

	if (code == config.lang) {
		/* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
		/* If the default language is the same as the language we are translating into, then we clear the cookies */
		TranslateCookieHandler(null, config.domain);
	}

	/* Инициализируем виджет с языком по умолчанию */
	/* Initialize the widget with the default language */
	new google.translate.TranslateElement({
		pageLanguage: config.lang,
	});

	/* Вешаем событие  клик на флаги */
	/* Assigning a handler to the flags */
	TranslateEventHandler("click", "[data-google-lang]", function (e) {
		TranslateCookieHandler(
			"/" + config.lang + "/" + e.getAttribute("data-google-lang"),
			config.domain
		);
		/* Перезагружаем страницу */
		/* Reloading the page */
		window.location.reload();
	});
}

function TranslateGetCode(config) {
	/* Если куки нет, то передаем дефолтный язык */
	/* If there are no cookies, then we pass the default language */
	let lang =
		Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
			? Cookies.get("googtrans")
			: config.lang;
	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}
function TranslateCookieHandler(val, domain) {
	/* Записываем куки /язык_который_переводим/язык_на_который_переводим */
	/* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
	Cookies.set("googtrans", val);
	Cookies.set("googtrans", val, {
		domain: "." + document.domain,
	});

	if (domain == "undefined") return;
	/* записываем куки для домена, если он назначен в конфиге */
	/* Writing down cookies for the domain, if it is assigned in the config */
	Cookies.set("googtrans", val, {
		domain: domain,
	});

	Cookies.set("googtrans", val, {
		domain: "." + domain,
	});
}


function TranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector);
		if (el) handler(el);
	});
}

function TranslateHtmlHandler(code) {
	/* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
	/* We get the language to which we translate and produce the necessary manipulations with DOM */
	if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
		document
			.querySelector('[data-google-lang="' + code + '"]')
			.classList.add("language__img_active");
	}
}




document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('.itc-select').addEventListener('itc.select.change', (e) => {
		const btn = e.target.querySelector('.itc-select__toggle');
		// выбранное значение



		// индекс выбранной опции
		console.log(`Индекс выбранной опции: ${btn.dataset.index}`);
		// выбранный текст опции
		const selected = e.target.querySelector('.itc-select__option_selected');
		console.log(selected)
		const text = selected ? selected.textContent : '';
		console.log(`Выбранный текст опции: ${text}`);
	});
})
class ItcCustomSelect {
	static EL = 'itc-select';
	static EL_SHOW = 'itc-select_show';
	static EL_OPTION = 'itc-select__option';
	static EL_OPTION_SELECTED = 'itc-select__option_selected';
	static DATA = '[data-select]';
	static DATA_TOGGLE = '[data-select="toggle"]';

	static template(params) {
		const { name, options, targetValue } = params;
		const items = [];
		let selectedIndex = -1;
		let selectedValue = '';
		let selectedContent = 'Ru';
		options.forEach((option, index) => {
			let selectedClass = '';
			if (option[0] === targetValue) {
				selectedClass = ` ${this.EL_OPTION_SELECTED}`;
				selectedIndex = index;
				selectedValue = option[0];
				selectedContent = option[1];
			}
			items.push(`<li class="itc-select__option${selectedClass}" data-select="option"
        data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
		});
		return `<button type="button" class="itc-select__toggle" name="${name}"
      value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
      ${selectedContent}</button><div class="itc-select__dropdown">
      <ul class="itc-select__options">${items.join('')}</ul></div>`;
	}

	static hideOpenSelect() {
		document.addEventListener('click', (e) => {
			if (!e.target.closest(`.${this.EL}`)) {
				const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
				elsActive.forEach((el) => {
					el.classList.remove(this.EL_SHOW);
				});
			}
		});
	}
	static create(target, params) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		if (this._el) {
			return new this(target, params);
		}
		return null;
	}
	constructor(target, params) {
		this._el = typeof target === 'string' ? document.querySelector(target) : target;
		this._params = params || {};
		this._onClickFn = this._onClick.bind(this);
		if (this._params.options) {
			this._el.innerHTML = this.constructor.template(this._params);
			this._el.classList.add(this.constructor.EL);
		}
		this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
		this._el.addEventListener('click', this._onClickFn);
	}

	_onClick(e) {
		const { target } = e;
		const type = target.closest(this.constructor.DATA).dataset.select;
		if (type === 'toggle') {
			this.toggle();
		} else if (type === 'option') {
			this._changeValue(target);
		}
	}

	_updateOption(el) {
		const elOption = el.closest(`.${this.constructor.EL_OPTION}`);
		const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
		if (elOptionSel) {
			elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
		}
		elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
		this._elToggle.textContent = elOption.textContent;
		this._elToggle.value = elOption.dataset.value;
		this._elToggle.dataset.index = elOption.dataset.index;
		this._el.dispatchEvent(new CustomEvent('itc.select.change'));
		this._params.onSelected ? this._params.onSelected(this, elOption) : null;
		return elOption.dataset.value;
	}

	_reset() {
		const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
		if (selected) {
			selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
		}
		this._elToggle.textContent = 'Выберите из списка';
		this._elToggle.value = '';
		this._elToggle.dataset.index = '-1';
		this._el.dispatchEvent(new CustomEvent('itc.select.change'));
		this._params.onSelected ? this._params.onSelected(this, null) : null;
		return '';
	}

	_changeValue(el) {
		if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
			return;
		}
		this._updateOption(el);
		this.hide();
	}

	show() {
		document.querySelectorAll(this.constructor.EL_SHOW)
			.forEach((el) => {
				el.classList.remove(this.constructor.EL_SHOW);
			});
		this._el.classList.add(`${this.constructor.EL_SHOW}`);
	}

	hide() {
		this._el.classList.remove(this.constructor.EL_SHOW);
	}

	toggle() {
		this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
	}

	dispose() {
		this._el.removeEventListener('click', this._onClickFn);
	}

	get value() {
		return this._elToggle.value;
	}

	set value(value) {
		let isExists = false;
		this._el.querySelectorAll('.select__option')
			.forEach((option) => {
				if (option.dataset.value === value) {
					isExists = true;
					this._updateOption(option);
				}
			});
		if (!isExists) {
			this._reset();
		}
	}

	get selectedIndex() {
		return this._elToggle.dataset.index;
	}

	set selectedIndex(index) {
		const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
		if (option) {
			this._updateOption(option);
		}
		this._reset();
	}
}

ItcCustomSelect.hideOpenSelect();
