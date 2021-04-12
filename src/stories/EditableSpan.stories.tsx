import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import { Tasks, TasksPropsType } from '../Tasks';
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";



export default {
    title: 'Todolist 12/EditableSpan',
    component: EditableSpan,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    title: 'Test Title',
    onChange:action('No test Title')
};


