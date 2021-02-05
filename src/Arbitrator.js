import "./Arbitrator.css";
import MyDropzone from "./MyDropzone.js"

function Arbitrator() {
  return (
    <div>
      <MyDropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        
      </MyDropzone>
    </div>
  );
}

export default Arbitrator;
