import Head from "./Head";
import {useContext} from "react";
import {TextContext} from "./TextContext";
import html from 'remark-html';
import gfm from 'remark-gfm'
import {remark} from 'remark'
import DOMPurify from 'dompurify';
import './markdownPreview.css';
import {visit} from 'unist-util-visit';

export default function MarkdownPreview ({styleSheet}){

    const previewStyle={
        width:'50rem',
        minHeight:'10rem',
        border:'1px solid black',
        backgroundColor:'rgb(196,215,216)',
        margin:'0',
        ...styleSheet

    }

    const {text,setText,fullScreen,setFullScreen}=useContext(TextContext);

    function covert2Html(value){
        let result;
        function convertEnterToNewline() {
            return (tree) => {
                visit(tree, 'text', (node, index, parent) => {
                    if (node.value.includes('\n')) {
                        const lines = node.value.split('\n');
                        const nodes = [];

                        lines.forEach((line, i) => {
                            if (i !== lines.length - 1) {
                                nodes.push({ type: 'text', value: line });
                                nodes.push({ type: 'break' });
                            } else {
                                nodes.push({ type: 'text', value: line });

                            }
                        });
                        parent.children.splice(index, 1, ...nodes);
                    }
                });
            };
        }

        function pushHR() {
            return (tree) => {
                const nodes = [];
                tree.children.forEach((element) => {
                    nodes.push(element);
                    if (element.type === 'heading'&&element.depth<3) {
                        nodes.push({type: 'thematicBreak'});
                    }
                });
                tree.children = nodes;
            };
        }



        remark()
            .use(gfm)
            .use(convertEnterToNewline)
            .use(pushHR)
            .use(html)
            .process(value,function (err,file){
                if(err)throw err;
                result= String(file);
            })

        //return result;

        return <div className='previewClass' style={{
            margin:'0',
            padding:'1em'
        }} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(result)}}/>;

    }

    function previewFullScreen(){
        console.log("hit");
        setFullScreen({
            fullScreenStatus:!fullScreen.fullScreenStatus,
            previewFullScreen:true
        })
    }


    return(
        <div style={styleSheet}>
            <Head title='MarkdownPreview' styleSheet={{
                width:'50rem'
            }} callback={previewFullScreen}/>
            <div style={previewStyle}>
                {covert2Html(text)}
            </div>
        </div>
    );
}