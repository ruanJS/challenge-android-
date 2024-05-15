import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Por favor, preencha todos os campos de email e senha');
        return;
      }

      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Se a resposta for bem-sucedida, você pode fazer algo, como salvar o token de autenticação, etc.
        alert('Login bem-sucedido');
      } else {
        // Se a resposta não for bem-sucedida, você pode lidar com diferentes cenários, como credenciais inválidas, etc.
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  const handleRegister = async () => {
  try {
    if (!email || !password || (!isLogin && (!name || !phone))) { // Adicionando verificação para campos de nome e telefone no caso de registro
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phone: phone,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Cadastro bem-sucedido');
    } else {
      alert('Não foi possível concluir o cadastro');
    }
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    alert('Erro ao fazer cadastro');
  }
};

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Se a resposta for bem-sucedida, você pode exibir uma mensagem informando que um email foi enviado para o usuário
        alert('Um email foi enviado para redefinir sua senha');
      } else {
        // Se a resposta não for bem-sucedida, você pode lidar com diferentes cenários, como email não encontrado, etc.
        alert('Não foi possível enviar o email de recuperação de senha');
      }
    } catch (error) {
      console.error(
        'Erro ao enviar solicitação de recuperação de senha:',
        error
      );
      alert('Erro ao enviar solicitação de recuperação de senha');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://storage.googleapis.com/codeless-dev.appspot.com/uploads%2Fimages%2F0RRIYgiAA3afxMdfO2zT%2F53f1fdb2fa63e8d6e40fcf18a3fb0205.png',
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        {isForgotPassword ? (
          <View>
            <Text style={styles.title}>Recuperação de Senha</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsForgotPassword(false)} // Corrigindo o link "Voltar para o login"
              style={styles.linkText}>
              <Text style={styles.linkText}>Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{isLogin ? 'Login' : 'Cadastro'}</Text>
            <TextInput
              placeholder="Digite seu email..."
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Digite sua senha..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            {!isLogin && (
              <>
                <TextInput
                  placeholder="Digite seu nome..."
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Digite seu telefone..."
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                />
              </>
            )}
            <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
              <Text style={styles.links}>Esqueceu sua senha?</Text>{' '}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isLogin ? handleLogin : handleRegister}
              style={[
                styles.button,
                isLogin ? styles.loginButton : styles.registerButton,
              ]}>
              <Text style={styles.buttonText}>
                {isLogin ? 'Acessar' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.link}>
                {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                <Text style={styles.underline}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ position: 'absolute', left: 110, bottom: 80 }}>
        <Text style={{ color: 'black', fontSize: 12 }}>
          Desenvolvido por{' '}
          <Text
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontFamily: 'Sansation',
            }}>
            NEXUS
          </Text>
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          left: 80,
          bottom: 80,
        }}>
        <Image
          source={{
            uri: 'https://storage.googleapis.com/codeless-dev.appspot.com/uploads%2Fimages%2F0RRIYgiAA3afxMdfO2zT%2F94f1a699f6da2518e0ae9662b7754f8d.png',
          }}
          style={{ width: 20, height: 19 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 380,
    left: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 100,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Sans-serif',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 13,
    fontFamily: 'Arial',
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#3656A7',
  },
  loginButton: {
    backgroundColor: '#3656A7',
  },
  registerButton: {
    backgroundColor: '#3656A7',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  link: {
    color: 'black',
    marginTop: 10,
    fontFamily: 'Sans-serif',
  },
  links: {
    color: 'blue',
    textDecorationLine: 'none',
    marginTop: 10,
    fontFamily: 'Arial',
    fontSize: 12,
    left: 90,
    bottom: 15,
  },
  linkText: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default App;
