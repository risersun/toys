import './App.css';
import './Apps/markdownEditor'
import './Apps/markdownPreview'
import MarkdownEditor from "./Apps/markdownEditor";
import {useState} from "react";
import MarkdownPreview from "./Apps/markdownPreview";
import {TextContext} from './Apps/TextContext';

function App() {

    const [text,setText]=useState("");
    const [fullScreen,setFullScreen]=useState({
        fullScreenStatus:false,
        previewFullScreen:false
    });


    const fullScreenEditor={
        minHeight:'100vh',
        resize:'none'
    };


    return (
      <div style={{
          display:'grid',
          justifyItems:'center',
      }}>
        <TextContext.Provider value={{text,setText,fullScreen,setFullScreen}}>
            <MarkdownEditor styleSheet={fullScreen.fullScreenStatus?
                (fullScreen.previewFullScreen?{display:'none'} :fullScreenEditor)
                :{}}/>
            <MarkdownPreview styleSheet={fullScreen.fullScreenStatus?
                (fullScreen.previewFullScreen? fullScreenEditor:{display:'none'})
                :{}}/>
        </TextContext.Provider>
      </div>
  );
}

export default App;
