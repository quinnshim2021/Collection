import React, { Suspense, useState } from 'react';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { Canvas } from "@react-three/fiber"
import scan1 from "../scans/scan1.glb";
import scan2 from "../scans/scan2.glb";
import scan3 from "../scans/scan3.glb"
import Header from "./Header";
import '../shared/componentCss.css';
import Modal from 'react-modal';


// to do in order:
  // 1. fix dragging onclick thing
  // 2. fix lighting, camera, textures
// ----hard work-----
// create backgrounds and get them to work
// 1. fix loading times/improve performance (like paginating which ones load at a time)
// 2. move data to db and add api calls to get them (make objects with all data)
// 3. host online
// 4. maybe cache (so we don't need to pull every time) or other improvements


const scans = [ // make for each model
  {scan: scan1, name: "Tamaki Amajiki", show: "My Hero Academia", description: "blah blah Suneater blah"},
  {scan: scan2, name: "Josuke", show: "Jojo's Bizarre Adventure: Diamond is Unbreakable", description: "blah blah do this later"},
  {scan: scan3, name: "Fushiguro", show: "Jujutsu Kaisen", description: "blah blah do this later"}
]

const customStyles = {
  content: {
    backgroundColor: '#17C3B2',
    height: '80%',
    width: '80%',
    marginTop: '4vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Model = () => {
  const [showModal, setShowModal] = useState(false);    // for later, whether to use modal or not
  const [modalContext, setModalContext] = useState(null); // for later, what to put in modal (scene info)


  function Loader() {
    const { progress } = useProgress()
    return <Html center>{Math.trunc(progress)} % loaded</Html>
  }

  const LoadModel = (scan) => { // need to clean up and make uniform
    const { scene } = useGLTF(scan["scan"]);
    scene.rotation.y = -1700

    return <primitive object={scene} />;
  }

  function closeModal() {
    setShowModal(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('opened')
  }

  const handleClick = (scan) => {
    // e.preventDefault();
    console.log(scan)
    setShowModal(true);
    setModalContext(scan);
  }

  Modal.setAppElement("body")

  return (
    <div className="container">
      <Header />
    
      <div className="content">
        <Modal
          isOpen={showModal}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal">
              <div className="modalCanvas">
                <Canvas camera={{position: [10, 18, 23], fov: .5 }} style={{backgroundColor:"white"}}>
                  <pointLight position={[0, 0, 0]} intensity={1} />
                  <Suspense fallback={null}>
                    {modalContext ? <LoadModel scan={modalContext.scan} /> : null }
                  </Suspense>
                  <OrbitControls minDistance={10} maxDistance={60} enableZoom={true} rotateSpeed={.2} maxPolarAngle={Math.PI/1.5}/>
                </Canvas>
              </div>
              { modalContext ? 
              <div className="modelInfo">
                <div className="infoTitle">
                  <h1><b><u>{modalContext.name}</u></b></h1>
                </div>
                <div className="modelShow">
                  <h2>{modalContext.show}</h2>
                  <hr height={1} width={"80%"} />
                </div>
                <div>
                  <p>{modalContext.description}</p>
                </div>
              </div>
              : null}
          </div>
        </Modal>
        {
          scans.map((scan) => {
            return (
              <div onClick={(e) => {e.preventDefault(); handleClick(scan)}} className="itemContainer">
                <Canvas camera={{position: [10, 18, 23], fov: .5 }} style={{backgroundColor:"white"}}>
                  <pointLight position={[0, 0, 0]} intensity={1} />
                  <Suspense fallback={<Loader />}>
                    <LoadModel scan={scan.scan} />
                  </Suspense>
                  <OrbitControls minDistance={10} maxDistance={60} enableZoom={true} rotateSpeed={.2} maxPolarAngle={Math.PI/1.5}/>
                </Canvas>
              </div>
            );
          })
        }
        
      </div>
    </div>
  );
}

export default Model;

// https://threejs.org/docs/#examples/en/controls/OrbitControls