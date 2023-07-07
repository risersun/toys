import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import {useContext} from "react";
import {TextContext} from "./TextContext";

export default function Head({title,styleSheet,callback}){

    const {text,setText,fullScreen,setFullScreen}=useContext(TextContext);

    return(
        <div style={{
            width:'30rem',
            height:'2rem',
            background:'rgb(97,161,162)',
            marginBottom:'0',
            display:'grid',
            gridTemplateColumns:'50% 50%',
            gridTemplateRows:'100%',
            alignItems:'center',
            border:'1px solid black',
            ...styleSheet
        }}>
            <p style={{
                fontWeight:'bold'
            }}>{title}</p>
           <div style={{
               display:'flex',
               flexDirection:'row-reverse',
               alignItems:'center'
           }}>
               <button onClick={callback} style={{
                   border:'none',
                   backgroundColor:'transparent',
                   marginRight:'0.5em'
               }}> {fullScreen.fullScreenStatus?<FontAwesomeIcon icon={solid("down-left-and-up-right-to-center")} />:<FontAwesomeIcon icon={solid("maximize")} />}</button>
           </div>
        </div>
    );
}