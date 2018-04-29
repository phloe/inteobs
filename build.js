const fs = require("fs");
const { transform } = require("@babel/core");
const plugin = require("./transform");

fs.readFile(require.resolve("intersection-observer"), "utf8", function (err, input) {
	if (err) {
		throw err;
	}

	var output = transform(
		input,
		{
			comments: false,
			plugins: [plugin]
		}
	).code;

	fs.writeFile("./index.js", output, function (err) {
		if (err) {
			throw err;
		}
	});
});
