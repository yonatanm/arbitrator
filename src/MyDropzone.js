import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import spinner from './loading-buffering.gif';



function MyDropzone() {

  const [wait, setWait] = useState(false)
  const [done, setDone] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;

        let r = /<DocumentContent.*>(.*)<\/DocumentContent>/gm

        // console.log(binaryStr)
        const exec = r.exec(binaryStr)
        console.log('exec', exec)
        const encoded= exec[1]
        // console.log("encoded",encoded)
        const bin = atob(encoded)
        // console.log("bin", bin)

        let binaryLen = bin.length;

let bytes = new Uint8Array(binaryLen);

for (let i = 0; i < binaryLen; i++) {
    bytes[i] = bin.charCodeAt(i);
}
setWait(true)

setTimeout( ()=> {
    setDone(true)
    setWait(false)
        const now = new Date()
        const nameSuffix = `${now.getYear()+1990}_${now.getMonth()+1}_${now.getDate()}_${now.getHours}_${now.getMinutes()}_${now.getSeconds()}`
        var data = new Blob([bytes], {type: 'application/pdf'});
        var url = window.URL.createObjectURL(data);
const tempLink = document.createElement('a');
tempLink.href = url;
tempLink.setAttribute('download', `document_${nameSuffix}.pdf`);
tempLink.click()

}, 1000)
      };
      reader.readAsText(file, 'utf-8');
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {!wait && !done? <div>upload the .sgn file:<button>Choose a file</button></div> : <></>}
      {wait && !done ? <img class='center' src={spinner}></img> : <></>}      
      {done? <button onClick={()=>window.location.reload()}>Click to do it again</button>:<></> }
    </div>
  );
}

export default MyDropzone;
