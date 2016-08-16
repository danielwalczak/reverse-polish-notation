import * as operator from './operator';

const NUMBER_REG = /^\d+(\.\d+)?$/;
const operators = {
  '+': operator.add,
  '-': operator.sub,
  'x': operator.mul,
  '/': operator.div
};

export default function rpn (expression) {
  const stack = evalExpression(expression.split(' '));
  if (stack.length > 1) throw new Error('The user input has too many values');

  return stack[0];
}

function evalExpression (tokens) {
  let stack = [];

  for (const token of tokens) {
    if (NUMBER_REG.test(token)) {
      stack.push(parseFloat(token));
    } else {
      if (stack.length < 2) throw new Error('Must have at least two parameters to perform operation');

      const argsCount = operators[token].length;
      const args = stack.splice(stack.length - argsCount, argsCount);
      stack.push(evalOperator(token, args));
    }
  }
  return stack;
}

function evalOperator (token, args) {
  return operators[token].apply(undefined, args);
}
