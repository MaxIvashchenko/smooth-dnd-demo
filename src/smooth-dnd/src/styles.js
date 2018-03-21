import * as constants from './constants';

const css = {
	[`.${constants.containerClass}`]: {
		'position': 'relative',
	},
	[`.${constants.containerClass} *`]: {
		'box-sizing': 'border-box',
	},
	[`.${constants.containerClass}.horizontal`]: {
		'white-space': 'nowrap',
	},
	[`.${constants.containerClass}.horizontal .${constants.wrapperClass}`]: {
		'height': '100%',
		'display': 'inline-block'
	},
	[`.${constants.wrapperClass}`]: {
		'overflow': 'hidden'
	},
	[`.${constants.wrapperClass}.animated`]: {
		'transition': 'transform ease'
	},
	[`.${constants.ghostClass} *`]: {
		'box-sizing': 'border-box',
	},
	[`.${constants.ghostClass}.animated`]: {
		'transition': 'all ease-out'
	},
	[`.${constants.disbaleTouchActions} *`]: {
		'touch-actions': 'none',
		'-ms-touch-actions': 'none'
	}
};

function convertToCssString(css) {
	return Object.entries(css).reduce((styleString, [propName, propValue]) => {
		if (typeof (propValue) === 'object') {
			return `${styleString}${propName}{${convertToCssString(propValue)}}`;
		}
		return `${styleString}${propName}:${propValue};`;
	}, '');
}

function addStyleToHead() {	
	const head = document.head || document.getElementsByTagName('head')[0];
	const style = document.createElement('style');
	const cssString = convertToCssString(css);
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = cssString;
	} else {
		style.appendChild(document.createTextNode(cssString));
	}

	head.appendChild(style);
}

export {
	addStyleToHead
};