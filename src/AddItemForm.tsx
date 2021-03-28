import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
    addTitle: (title: string) => void
}


export const AddItemForm =React.memo( (props: AddItemFormPropsType) => {

    const [error, setError] = useState<string | null>(null)
    const [addTitle, setAddTitle] = useState('')

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === "Enter")
            addItem()
    }

    const addItem = () => {
        if (addTitle.trim() !== '') {
            props.addTitle(addTitle)
            setAddTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <div>
                <TextField

                    id="standard-textarea"
                    label="New Task"
                    placeholder=""
                    multiline
                    value={addTitle}
                    onChange={inputOnChange}
                    onKeyPress={inputOnKeyPress}
                />
                <Add style={{marginTop:'25px'}}
                    onClick={addItem}
                > +
                </Add>
            </div>
            {
                error ? <div>{error}</div> : ''
            }
        </div>
    )
})