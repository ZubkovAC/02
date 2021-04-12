import React from 'react';
import { Story, Meta } from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";



export default {
    title: 'Todolist 12/AddItemForm',
    component: AddItemForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    addTitle:action('Inside from cliked')
};


