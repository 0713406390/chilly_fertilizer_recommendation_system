import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f7f0',
      100: '#b3e6d1',
      200: '#80d5b2',
      300: '#4dc493',
      400: '#1ab374',
      500: '#00a255',
      600: '#008244',
      700: '#006133',
      800: '#004122',
      900: '#002011',
    },
    chili: {
      red: '#DC2626',
      green: '#16A34A',
      orange: '#EA580C',
      yellow: '#FCD34D',
    }
  },
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme;
