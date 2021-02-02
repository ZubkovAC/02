import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [title,setTitle]=useState(props.title)

    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        props.onChange(title)
    }

    return (
        edit
            ? <input
                autoFocus
                onBlur={()=>{setEdit(false)}}
                onChange={onChange}
                value={title}
            />
            : <span
                onDoubleClick={()=>{setEdit(true)}}
            >{title} </span>

    )
}


