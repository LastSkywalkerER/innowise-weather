export default class SELECTION_RESTORATION {
  static initialize() {
    const focusedElem = document.activeElement;
    return {
      focusedElem,
      selection: {
        start: focusedElem.selectionStart,
        end: focusedElem.selectionEnd,
      },
    };
  }

  static close(priorSelectionInformation) {
    const {
      focusedElem,
    } = priorSelectionInformation;
    focusedElem.selectionStart =
      priorSelectionInformation.selection.start;
    focusedElem.selectionEnd =
      priorSelectionInformation.selection.end;
  }
}