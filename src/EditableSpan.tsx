import React, {ChangeEvent, useCallback, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(title:string)=>void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    // console.log('Spam')
    //  Spam он самый
    const [edit, setEdit] = useState(false)
    const [title,setTitle]=useState(props.title)

    const onChange=useCallback( (e:ChangeEvent<HTMLInputElement>)=>{
        console.log('xyu x2')
        setTitle(e.currentTarget.value)
        props.onChange(title)
    },[])

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


