import notFound from '../../assets/pokemon_404.png';

import { Flex, Center, Image } from '@chakra-ui/react';

const Page404 = () => (
  <Flex className='page-404' m='auto'>
    <Center width={['100vw', '90vw', '70vw', '800px']}>
      <Image src={notFound} alt='page not found' width='100%' />
    </Center>
  </Flex>
);

export default Page404;
