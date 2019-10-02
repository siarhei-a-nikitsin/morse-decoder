const MORSE_TABLE = {
	'.-': 'a',
	'-...': 'b',
	'-.-.': 'c',
	'-..': 'd',
	'.': 'e',
	'..-.': 'f',
	'--.': 'g',
	'....': 'h',
	'..': 'i',
	'.---': 'j',
	'-.-': 'k',
	'.-..': 'l',
	'--': 'm',
	'-.': 'n',
	'---': 'o',
	'.--.': 'p',
	'--.-': 'q',
	'.-.': 'r',
	'...': 's',
	'-': 't',
	'..-': 'u',
	'...-': 'v',
	'.--': 'w',
	'-..-': 'x',
	'-.--': 'y',
	'--..': 'z',
	'.----': '1',
	'..---': '2',
	'...--': '3',
	'....-': '4',
	'.....': '5',
	'-....': '6',
	'--...': '7',
	'---..': '8',
	'----.': '9',
	'-----': '0'
};

const SPACE = ' ';

const INPUT_DECODE_TABLE = {
	'10': '.',
	'11': '-',
	'**********': SPACE
};

const INPUT_SYMBOLS_TABLE = {
	ONE: '1',
	ZERO: '0',
	STAR: '*'
};

const EMPTY_STRING = '';

const INVALID_INPUT_ERROR_MESSAGE = 'The input is not valid.';

function decode(expr) {
	let result = EMPTY_STRING;
	const countSymbolsInLetter = 10;
	const isCharValid = (char) =>
		char === INPUT_SYMBOLS_TABLE.ONE || char === INPUT_SYMBOLS_TABLE.ZERO || char === INPUT_SYMBOLS_TABLE.STAR;

	let symbolBuffer = EMPTY_STRING;

	for (let i = 0; i < expr.length; i += 2) {
		const currentChar = expr.charAt(i);
		const nextChar = expr.charAt(i + 1);

		if (!(isCharValid(currentChar) && isCharValid(nextChar))) {
			throw new Error(INVALID_INPUT_ERROR_MESSAGE);
		}

		if (currentChar === INPUT_SYMBOLS_TABLE.STAR && nextChar === INPUT_SYMBOLS_TABLE.STAR) {
			symbolBuffer += currentChar;
			symbolBuffer += nextChar;

			if (symbolBuffer.length === countSymbolsInLetter) {
				result += SPACE;
				symbolBuffer = EMPTY_STRING;
			}
		} else {
			if (!(currentChar === INPUT_SYMBOLS_TABLE.ZERO && nextChar === INPUT_SYMBOLS_TABLE.ZERO)) {
				symbolBuffer += INPUT_DECODE_TABLE[currentChar + nextChar];
			}

			if ((i + 2) % countSymbolsInLetter === 0 && i > 0) {
				result += MORSE_TABLE[symbolBuffer];
				symbolBuffer = EMPTY_STRING;
			}
		}
	}

	return result;
}

module.exports = {
	decode
};
