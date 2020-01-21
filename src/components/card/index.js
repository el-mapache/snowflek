import { animated } from 'react-spring';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Card = styled(animated.div)`
  ${tw`bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-lg`}
`;

export default Card;
