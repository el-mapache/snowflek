import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';


const Styler = (baseClasses, rules, matchers = []) => { 
  const availableRules = rules();

  const resolveStyleRules = () => {
    return matchers.reduce((memo, prop) => {
      const rule = availableRules[prop];
      
      if (rule) {
        return {
          ...memo,
          ...rule
        };
      }

      return memo;
    }, {});
  };

  return class extends React.Component {
    render() {
      const Styled = styled.div.attrs(
        props => ({
          ...props,
          className: baseClasses
        })
      )`${resolveStyleRules()};`;

      return <Styled {...this.props} />;
    }
  }
};

const MenuWrapper = styled.div`${tw`flex`}`;
const menuPositionStyle = position => 
  `margin-${position === 'right' ? 'left' : 'right'}: auto !important`;

const _Menu = ({ position, ...props}) => {
  let Styled = MenuWrapper;

  if (position) {
    Styled = styled(MenuWrapper)`${menuPositionStyle(position)}`;
  }

  return <Styled {...props} />
}


const MenuItem = styled.div`
  ${tw`cursor-pointer self-center mx-2 p-2`}
`;

const activeStyle = tw`border-solid border-b-4 border-purple-droplet bg-offwhite rounded-t-lg p-2`;
const darkStyle = tw`hover:bg-gray-700 text-white rounded`;

const styledCache = (() => {
  let components = {};

  return {
    getOrCreate(type, Component, styles) {
      let cached = components[type];

      if (!cached) {
        cached = styled(Component)`${styles}`;
        components[type] = cached;
      }
      console.log(cached)
      return cached;
    }
  };
})();

/**
 * NOTES:
 * - styled-components accept `as` prop by default and will correctly resolve
 *   supplied components and their props
 * 
 * - they also basically resolve everything under the hood so wrappers might not be necessarily really
 * 
 * - you have to cache dynamic classes because otherwise styled will attempt to write a million copies
 *   of the class to the stylesheet it creates
 * 
 * - but this also means you might pontentially be storing a ton of different components and objects in
 *   memory depending on how complex your app is and how many overrides you have :/
 */


const Item = ({ dark, active, ...props }) => {
  let extensions = {};
  let extensionkey = [];
  let StyledItem;
  
  if (active) {
    extensions = { ...extensions, ...activeStyle };
    extensionkey.push('active');
  }

  if (dark) {
    extensions = { ...extensions, ...darkStyle };
    extensionkey.push('dark');
  }

  if (!Object.keys(extensions).length) {
    StyledItem = MenuItem;
  } else {
    StyledItem = styledCache.getOrCreate(extensionkey.join(' '), MenuItem, extensions);
  }

  return (
    <StyledItem {...props} />
  );
};

class Menu extends React.Component {
  static Menu = _Menu;
  static Item = Item;

  render() {
    return <_Menu {...this.props} />;
  }
};

export default Menu;
