import {useContext} from "react";
import Head from "./Head";
import {TextContext} from "./TextContext";

export default function MarkdownEditor({styleSheet}){

    const EDITOR='Editor'
    const {text,setText,fullScreen,setFullScreen}=useContext(TextContext);
    function updateState(event){
        setText(event.target.value);
        // console.log(text);
    }

    function editorFullScreen(){
        console.log("hit");
        setFullScreen({
            fullScreenStatus:!fullScreen.fullScreenStatus,
            previewFullScreen:false
        })
    }


    return(
        <div style={styleSheet}>
            <Head title={EDITOR} callback={editorFullScreen}/>
            <textarea value={text} onChange={updateState} style={{
                width:'30rem',
                height:'10rem',
                resize:'vertical',
                padding:'0.3em 0',
                backgroundColor:'rgb(196,215,216)',
                ...styleSheet
            }}/>
        </div>
        );
}

