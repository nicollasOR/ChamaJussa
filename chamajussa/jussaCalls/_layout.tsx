import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function Layout () {
    return (
        // pilha de telas
        <Stack>
            {/* name -> o nome da pasta da tela */}
            <Stack.Screen
                name='login/index' // name="login/index"
                options={{ title: `login`, headerShown: false }}

            />

            <Stack.Screen name='listaOOS/index' options={{ title: `lista de OS` }} />
        </Stack>
    )
}
