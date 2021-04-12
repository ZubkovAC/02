import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {withThemeProvider} from "./decorators/ReduxStoreDecorator";



export default {
    title: 'Todolist 12/AppWithRedux',
    component: AppWithRedux,
    decorators:[withThemeProvider],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    addTitle:action('Inside from cliked')
};


