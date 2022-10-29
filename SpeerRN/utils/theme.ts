import {createTheme} from '@rneui/themed';

export const colorPrimary = '#F55886';

export const theme = createTheme({
  components: {
    Button: {
      raised: true,
      radius: 'md',
      buttonStyle: {
        backgroundColor: colorPrimary,
      },
    },
  },
});
