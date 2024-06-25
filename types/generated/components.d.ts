import type { Schema, Attribute } from '@strapi/strapi';

export interface ButtonsNavButton extends Schema.Component {
  collectionName: 'components_buttons_nav_buttons';
  info: {
    displayName: 'navLink';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    bgColor: Attribute.String;
    border: Attribute.String;
    borderRadius: Attribute.String;
    labelColor: Attribute.String;
    navLink: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'buttons.nav-button': ButtonsNavButton;
    }
  }
}
