import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addTitle:(title:string)=>void
}


export const AddItemForm =(props:AddItemFormPropsType)=> {

    const [error,setError]=useState<string | null>(null)
    const [addTitle, setAddTitle] = useState('Jylio')

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addItem()
    }

    const addItem = () => {
        if (addTitle.trim() !==''){
            props.addTitle(addTitle)
            setAddTitle('')
        }else{
            setError('Title is required')
        }
    }

    return (
        <div>
        <div>
            <input
                value={addTitle}
                onChange={inputOnChange}
                onKeyPress={inputOnKeyPress}
            />
            <button
                onClick={addItem}
            > +
            </button>
        </div>
        {
            error ? <div>{error}</div> : ''
        }
        </div>
    )
}