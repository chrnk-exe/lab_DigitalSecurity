import React, {useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,  } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import '../styles/TextEditor.css';
import classes from '../styles/TextEditor.module.css'

const TextEditor = ({setText}) => {
    const [value, setValue] = useState(() => EditorState.createEmpty())

    const onChange = (e) => {
      setValue(e)
      setText(draftToHtml(e))
    }

  return (
    <div>
        <Editor value={value}
        editorClassName={classes.Editor}
        onChange={onChange} />
    </div>
  )
}

export default TextEditor