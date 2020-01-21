import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const ContainerBase = styled.div`
  ${tw`flex mx-auto items-stretch`}
`;

const baseClass = 'container ';

const Container = ({ className, ...rest }) => (
  <ContainerBase
    className={`${baseClass}${className ? className : ''}`}
    {...rest}
  />
);

export default Container;
