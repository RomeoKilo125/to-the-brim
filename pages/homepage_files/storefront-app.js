(function(w) {
	if (!Object.assign) {
		objectsAssignPolyfill();
	}

	var oAuthAppId = "storefront-label-editor"

	var langCodesToAdaptForRosetta = {
        ar: "ar_SA",
        es: "es_ES",
        es_419: "es_MX",
        hy: "hy_AM",
        pt: "pt_PT",
        sv: "sv_SE",
        zh: "zh_CN"
    };
	
	var publicConfig = Ecwid.getAppPublicConfig(oAuthAppId);
	if (!publicConfig) {
		return;
	}

	var translates = JSON.parse(decodeURIComponent(publicConfig));
	var langs = Object.keys(translates);

	if (langs.length === 0) {
		return;
	}

	if (langs.length === 1) {
		newEcwidMessages = translates[getRosettaLangCode(langs[0])];
		if (w.ecwidMessages) {
			w.ecwidMessages = Object.assign(w.ecwidMessages, newEcwidMessages);
		} else {
			w.ecwidMessages = Object.assign({}, newEcwidMessages);
		}
	} else {
		Ecwid.OnAPILoaded.add(function() {
			var curLang = Ecwid.getStorefrontLang() || 'en';
			newEcwidMessages = translates[getRosettaLangCode(curLang)];
			if (w.ecwidMessages) {
				w.ecwidMessages = Object.assign(w.ecwidMessages, newEcwidMessages);
			} else {
				w.ecwidMessages = Object.assign({}, newEcwidMessages);
			}
		});
	}

   function objectsAssignPolyfill() {
			Object.defineProperty(Object, 'assign', {
				enumerable: false,
				configurable: true,
				writable: true,
				value: function (target) {

					'use strict';
					if (target === undefined || target === null) {
						throw new TypeError('Cannot convert first argument to object');
					}

					var to = Object(target);
					for (var i = 1; i < arguments.length; i++) {
						var nextSource = arguments[i];
						if (nextSource === undefined || nextSource === null) {
							continue;
						}
						nextSource = Object(nextSource);

						var keysArray = Object.keys(nextSource);
						for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
							var nextKey = keysArray[nextIndex];
							var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
							if (desc !== undefined && desc.enumerable) {
								to[nextKey] = nextSource[nextKey];
							}
						}
					}
					return to;
				}
			});
	}

	function getRosettaLangCode(langCode) {
		if (!!langCodesToAdaptForRosetta[langCode]) {
			return langCodesToAdaptForRosetta[langCode];
		}
		return langCode;
	}
})(window)
