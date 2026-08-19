// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     // O Stack funciona como uma pilha de telas. Quando você abre outra tela, ela é colocada sobre a anterior. Ao voltar, ela sai da pilha.
//     <Stack>
//       <Stack.Screen
//         name="login/index"
//         options={{
//           title: "Login",
//           headerShown: false,
//         }}
//       />

//       <Stack.Screen
//         name="listaOs/index"
//         options={{
//           title: "Lista OS",
//           // headerShown: false,
//         }}
//       />

//       <Stack.Screen
//         name="home"
//         options={{
//           title: "Ordens de Serviço",
//         }}
//       />

//       <Stack.Screen
//         name="detalhes"
//         options={{
//           title: "Detalhes",
//         }}
//       />
//     </Stack>
//   );
// }

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}