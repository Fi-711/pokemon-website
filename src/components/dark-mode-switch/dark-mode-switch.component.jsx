import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import { FaSun } from 'react-icons/fa';

/*
Dark Mode switch with bespoke color codings - Pokemon yellow too bright so turned down opacity. Also can't use
Chakra brand colors in styles so manually added correct hex color values.
 */
const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label='light_dark-mode-switch'
      icon={
        colorMode === 'dark' ? (
          <FaSun size={20} color={'#ffcb05'} opacity={0.7} />
        ) : (
          <MoonIcon color={'#dddddd'} />
        )
      }
      onClick={toggleColorMode}
      isRound={true}
      variant={'link'}
      height='1em'
    />
  );
};

export default DarkModeSwitch;
