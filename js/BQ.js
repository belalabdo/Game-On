function addClasses(ele, classes) {
  classes = classes.split(" ");
  for (let i = 0; i < classes.length; i++) {
    ele.classList.add(classes[i]);
  }
}

function removeClasses(ele, classesToRemove) {
  classesToRemove = classesToRemove.split(" ");
  for (let i = 0; i < classesToRemove.length; i++) {
    ele.classList.remove(classesToRemove[i]);
  }
}

function removeClassesAll(elements, classesToRemove) {
  elements = Array.from(elements);
  classesToRemove = classesToRemove.split(" ");
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < classesToRemove.length; j++) {
      elements[i].classList.remove(classesToRemove[j]);
    }
  }
}

function addClassesAll(elements, classesToAdd) {
  elements = Array.from(elements);
  classesToAdd = classesToAdd.split(" ");
  for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < classesToAdd.length; j++) {
      elements[i].classList.add(classesToAdd[j]);
    }
  }
}
