import isLastAtEveryLevel from "./isLastAtEveryLevel";
import createNode from "./createNode";
import nodeCollectionToArray from "./nodeCollectionToArray";
import getAllChildrenExcept from './getAllChildrenExcept';
import isInput from "./isInput";
import getCursorNode from "./getCursorNode";

/**
 * Inserts a set of content into the element. Intended for SINGLE characters.
 *
 * @param {object} element
 * @param {string | object} content
 */
export default (element, contentArg, cursorPosition) => {
  // Assume it's a string, and maybe overwrite later.
  let content = contentArg;
  if (isInput(element)) {
    element.value = `${element.value}${content}`;
    return;
  }

  let cursorNode = getCursorNode(element);

  // cursorPosition = cursorNode ? cursorPosition + 1 : cursorPosition;
  // cursorPosition = 1;

  // console.log(cursorPosition);

  // We're inserting a character within an element!
  // Make sure this isn't an HTML node that's being inserted.
  if (typeof contentArg === "object" && !(contentArg instanceof HTMLElement)) {
    let ancestorTree = contentArg.ancestorTree.slice(0);
    let parentSelectors = ancestorTree.reverse().join(" ");
    let existingNodes = nodeCollectionToArray(
      element.querySelectorAll(`${parentSelectors}`)
    );
    let lastExistingNode = existingNodes[existingNodes.length - 1];

    // Only type into an existing element if there is one
    // and it's the last one in the entire container.
    if (lastExistingNode && isLastAtEveryLevel(lastExistingNode, cursorNode)) {
      element = lastExistingNode;
      content = contentArg.content;

      // We need to create an element!
    } else {
      // Overwrite the content with this newly created element.
      content = createNode(
        contentArg.ancestorTree[0],
        contentArg.attributes,
        contentArg.content
      );

      // We know this new element is supposed to be nested, so we need to print it inside the
      // the LAST parent node that was created inside the container.
      if (contentArg.ancestorTree.length > 1) {
        // Get all the parent nodes in the container.
        let parentNodes = nodeCollectionToArray(
          element.querySelectorAll(contentArg.ancestorTree[1])
        );

        // We assume it exists.
        element = parentNodes[parentNodes.length - 1];
      }
    }
  }

  // Might be either an HTMLElement or Node.
  content =
    typeof content === "object" ? content : document.createTextNode(content);

  let allNodes = getAllChildrenExcept(element, cursorNode);

  // By default, the cursor position should be zero.
  let lastNode = allNodes[allNodes.length - 1 + cursorPosition];

  // console.log(cursorPosition);
  console.log(allNodes);
  // console.log(lastNode);

  // If a cursor node exists, make sure we print BEFORE that, but only if the target
  // element is the top-level one. Otherwise, stick it to the end of the element.
  element.insertBefore(
    content,
    // cursorNode && element.hasAttribute("data-typeit-id") ? cursorNode : null
    lastNode ? lastNode : null
  );
};
