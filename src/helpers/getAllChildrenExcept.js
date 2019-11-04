import nodeCollectionToArray from "./nodeCollectionToArray";

export default (element, nodeToIgnore = null) => {
  return nodeCollectionToArray(element.childNodes).filter(
    node => !node.isEqualNode(nodeToIgnore)
  );
};
