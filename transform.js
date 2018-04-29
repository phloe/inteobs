const template = require("@babel/template");

function isSupportTest (node) {
	return node.type === "LogicalExpression" ?
		isSupportTest(node.left) :
		(
			node.type === "BinaryExpression" &&
			node.left.value === "IntersectionObserver" &&
			node.operator === "in" &&
			node.right.name === "window"
		);
}

module.exports = function({ types: t }) {
	return {
		visitor: {
			// remove IIFE
			FunctionExpression(path) {
				var { node } = path;
				if (
					node.params.length > 1 &&
					node.params[0].name === "window" &&
					node.params[1].name === "document"
				) {
					const program = path.find((path) => path.isProgram());
					program.node.body = node.body.body;
				}
			},
			// translate if-statement into variable and default export
			IfStatement(path) {
				var { node } = path;
				if (
					isSupportTest(node.test)
				) {
					var ast = template.smart.ast`
						var hasSupport = typeof window !== 'undefined' && ${ node.test };
						export default hasSupport ? window.IntersectionObserver : IntersectionObserver;
					`;
					path.replaceWithMultiple(ast);
				}
			},
			// remove global exposure
			ExpressionStatement(path) {
				var { node } = path;
				if (
					t.isAssignmentExpression(node.expression, { operator: "=" }) &&
					t.isMemberExpression(node.expression.left) &&
					t.isIdentifier(node.expression.left.object, { name: "window" })
				) {
					path.remove();
				}
			}
		}
	};
};
