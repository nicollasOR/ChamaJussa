import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  useFonts
} from '@expo-google-fonts/montserrat'
import { useState } from 'react'
import { TextStyle } from 'react-native'

export const [googleFonts] = useFonts({
  Montserrat_400Regular,
  Montserrat_600SemiBold
})

export const stylesFont: TextStyle = {
  fontFamily: `Montserrat_600Regular`
}
