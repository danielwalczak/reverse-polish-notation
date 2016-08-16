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
      const argsCount = operators[token].length;
      if (stack.length < argsCount) throw new Error('Stack must have as many parameters as operator requires to perform operation');

      const args = stack.splice(stack.length - argsCount, argsCount);
      stack.push(evalOperator(token, args));
    }
  }
  return stack;
}

function evalOperator (token, args) {
  return operators[token].apply(undefined, args);
}
