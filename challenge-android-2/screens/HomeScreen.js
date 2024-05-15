import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      {/* Header com linha superior */}
      <View style={styles.header}>
        {/* Bolinha de perfil */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.profileButton}>
          <Image
            source={require('../assets/icon-perfil.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Menu hambúrguer */}
        <TouchableOpacity onPress={handleMenuPress}>
          <Icon name="bars" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo do menu */}
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Opção 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Opção 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.menuItem}>Opção 3</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Restante do conteúdo da tela */}
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    position: 'absolute',
    top: 60, // Ajuste conforme necessário para a posição do menu
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 3,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});

export default HomeScreen;
