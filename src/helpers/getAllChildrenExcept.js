import nodeCollectionToArray from './nodeCollectionToArray';

export default (element, nodeToIgnore) => {
  return nodeCollectionToArray(element.childNodes).filter(
    node => !node.isEqualNode(nodeToIgnore)
  );
}
