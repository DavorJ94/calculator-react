export default function refineForEvaluation(expForEval) {
  const shouldRemoveLastItems = expForEval.match(/([^\d$\s]{2})$/gm);
  if (shouldRemoveLastItems) expForEval = expForEval.slice(0, -2);

  if (isNaN(expForEval.slice(-1)) && expForEval.slice(-1) !== ")")
    expForEval = expForEval.slice(0, -1);
  return expForEval;
}
