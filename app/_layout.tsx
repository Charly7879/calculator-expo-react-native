/**
 * _layout:
 * Componente pricipal y enrutamiento de Expo.
 */
import { globalStyles } from '@/styles/global-styles';
import { useFonts } from 'expo-font';
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";

// Sistema Operativo
const isAndroid = Platform.OS === 'android';

// Comprobar sí es android
if (isAndroid) {
  NavigationBar.setBackgroundColorAsync('black');
}

/**
 * Componente principal que enruta con <Slot />
 * <Slot /> busca el primer componente index.tsx de app/
 */
const _layout = () => {

  // Cargar fuente
  const [loader] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Retornar null hasta que la fuente esté cargada
  if (!loader) {
    return null;
  }

  return (
    <View style={globalStyles.background}>
      <Slot />
      <StatusBar style='light' />
    </View>
  );
};
export default _layout;