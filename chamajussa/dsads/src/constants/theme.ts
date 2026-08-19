// src/constants/theme.ts

import { TextStyle } from "react-native";

export const Colors = {
  background: '#F5F5F7', // Cor cinza de fundo que aparece na sua imagem
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#7D7D7D',
  btn_verde: '#10B981',    // Aquele verde chamativo do seu botão
  inputBg: '#F2F2F4',    // O cinza claro de dentro dos inputs
  inputBorder: '#E5E5E7',
  colorBtnBlue: '#006FFF',
};

export const fonts = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
};

export const Title = {
  fontSize: 30,
  // fontWeight: "bold" as const, //O as const transforma valores que seriam lidos como "textos genéricos" em valores exatos e imutáveis, garantindo que o TypeScript não reclame de incompatibilidade nos objetos de estilo globais.
  fontFamily: fonts.semiBold
};


export const Botao = {
  fontSize: 15,
  fontWeight: '800' as const,
  fontFamily: fonts.regular
}
