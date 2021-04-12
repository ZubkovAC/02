import React, {ChangeEvent, useCallback, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [title,setTitle]=useState(props.title)

    const onChange = useCallback( (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
        props.onChange(title)
    },[title])

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
})


