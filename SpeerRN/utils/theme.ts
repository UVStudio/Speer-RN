import {createTheme} from '@rneui/themed';

export const colorPrimary = '#F53880';
export const colorPrimaryTitle = '#A8164E';
export const colorCardBorder = '#FA7D2D';

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
