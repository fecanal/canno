/* eslint-disable no-restricted-globals */
const workerScript = () => {
  self.onmessage = function (e) {
    console.log(e);
    const {notes,player} = e.data
  }
}
let code = workerScript.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const myWorker = URL.createObjectURL(blob);
export {
  myWorker
}