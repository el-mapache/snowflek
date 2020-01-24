import { animated } from 'react-spring';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Card = styled(animated.div)`
  ${tw`bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg`}
`;

const CardForHeading = styled(animated.div)`
  ${tw`bg-white shadow-md rounded-lg rounded-tl-none rounded-tr-none px-8 pt-6 pb-8 mb-4 w-full max-w-lg`}
`;

const HeadingCard = ({ heading, ...rest }) => (
  <>
    <div className="shadow-2xl rounded-br-none rounded-bl-none rounded-lg bg-purple-droplet w-full max-w-lg mx-auto px-4 pb-5 pt-3">
      {heading}
    </div>
    <CardForHeading {...rest} />
  </>
);

export { HeadingCard };
export default Card;
