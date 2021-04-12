import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import { Tasks, TasksPropsType } from '../Tasks';



export default {
    title: 'Todolist 12/Tasks',
    component: Tasks,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story<TasksPropsType> = (args) => <Tasks {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    task:{id:'hello',title:'TodolistTEST',isDone:false},
    todolistID:'v1',
    removeTask: action('Inside from removeTask'),
    changeTaskStatus: action('Inside from changeTaskStatus'),
    newTitleTask: action('Inside from newTitleTask')
};


