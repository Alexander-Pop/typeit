import nodeCollectionToArray from "./nodeCollectionToArray";

/**
 * Returns the cursor node, if it exists. If not, null.
 *
 * @param {object} node
 * @return {object|null}
 */
export default element => {
  let nodes = nodeCollectionToArray(element.childNodes).filter(n => {
    return n.classList && n.classList.contains("ti-cursor");
  });

  return nodes.length ? nodes[0] : null;
};
