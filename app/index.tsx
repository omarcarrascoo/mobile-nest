import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';

// Import constants and styles
import { COLORS, GRADIENTS } from '@/constants/theme';
import { styles } from './styles';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const isButtonDisabled = useMemo(
    () => loading || !email.trim() || !password.trim(),
    [loading, email, password]
  );

  async function handleSubmit() {
    if (isButtonDisabled) return;

    if (!email.trim() || !password.trim()) {
      setError('Por favor completa los campos');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Simulación de login
      setTimeout(() => {
        setLoading(false);
        router.replace('/(tabs)');
      }, 1500);
    } catch (err) {
      setError('Credenciales incorrectas');
      setLoading(false);
    }
  }

  const showEmailError = error && !email.trim();
  const showPasswordError = error && !password.trim();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* BACKGROUND LAYER */}
      <View style={styles.baseBackground} />

      {/* Orbe Azul Superior */}
      <View style={styles.topOrb}>
        <LinearGradient
          colors={[...GRADIENTS.blueOrb]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.orbGradient}
        />
      </View>

      {/* Orbe Verde Inferior */}
      <View style={styles.bottomOrb}>
        <LinearGradient
          colors={[...GRADIENTS.greenOrb]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.orbGradient}
        />
      </View>

      {/* Overlay Oscuro para legibilidad */}
      <LinearGradient
        colors={[...GRADIENTS.overlay]}
        style={StyleSheet.absoluteFill}
      />

      {/* CONTENT */}
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.content}>
            {/* HEADER */}
            <View style={styles.header}>
              {/* Asegúrate de tener un logo o comenta esta línea si no lo tienes aun */}
              <Image
                source={require('@/assets/images/logo.png')} 
                style={styles.logo}
                contentFit="contain"
              />
              <View>
                <Text style={styles.title}>Bienvenido.</Text>
                <Text style={styles.subtitle}>Gestiona tu espacio inteligente.</Text>
              </View>
            </View>

            {/* FORM */}
            <View style={styles.glassForm}>
              {/* EMAIL */}
              <View style={[
                styles.inputWrapper,
                activeInput === 'email' && styles.inputWrapperActive,
                showEmailError && styles.inputWrapperError,
              ]}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <View style={styles.inputInner}>
                  <Feather
                    name="at-sign"
                    size={18}
                    color={activeInput === 'email' ? COLORS.brand.teal : COLORS.text.label}
                  />
                  <TextInput
                    value={email}
                    onChangeText={(t) => {
                      setEmail(t);
                      if (error) setError(null);
                    }}
                    style={styles.input}
                    placeholder="usuario@nest.com"
                    placeholderTextColor={COLORS.text.placeholder}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setActiveInput('email')}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* PASSWORD */}
              <View style={[
                styles.inputWrapper,
                activeInput === 'password' && styles.inputWrapperActive,
                showPasswordError && styles.inputWrapperError,
              ]}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <View style={styles.inputInner}>
                  <Feather
                    name="lock"
                    size={18}
                    color={activeInput === 'password' ? COLORS.brand.teal : COLORS.text.label}
                  />
                  <TextInput
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      if (error) setError(null);
                    }}
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.text.placeholder}
                    secureTextEntry={!showPwd}
                    autoCapitalize="none"
                    onFocus={() => setActiveInput('password')}
                    onBlur={() => setActiveInput(null)}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />
                  <TouchableOpacity onPress={() => setShowPwd(!showPwd)} hitSlop={8}>
                    <Feather
                      name={showPwd ? 'eye-off' : 'eye'}
                      size={18}
                      color={COLORS.text.label}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ERROR + FORGOT */}
              <View style={styles.actionRow}>
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <View style={{ flex: 1 }} />
                )}
                <TouchableOpacity>
                  <Text style={styles.forgotText}>¿Olvidaste tu clave?</Text>
                </TouchableOpacity>
              </View>

              {/* REMEMBER ME */}
              <View style={styles.rememberRow}>
                <Switch
                  value={remember}
                  onValueChange={setRemember}
                  // Usamos status.success o brand.teal ya que 'emerald' no existe en COLORS.brand
                  trackColor={{ false: COLORS.background.dark, true: COLORS.status.success }}
                  thumbColor={COLORS.text.inverse}
                  ios_backgroundColor={COLORS.background.dark}
                  style={{ transform: [{ scale: 0.8 }] }}
                />
                <Text style={styles.rememberText}>Mantener sesión activa</Text>
              </View>

              {/* BUTTON */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isButtonDisabled}
                activeOpacity={0.9}
                style={[
                  styles.submitBtnContainer,
                  isButtonDisabled && styles.submitBtnDisabled,
                ]}
              >
                <LinearGradient
                  colors={
                    isButtonDisabled
                      ? [...GRADIENTS.buttonDisabled]
                      : [...GRADIENTS.buttonPrimary]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitBtnGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.submitBtnText}>Ingresar al Panel</Text>
                      <Feather
                        name="arrow-right"
                        size={20}
                        color="#fff"
                        style={{ opacity: 0.85 }}
                      />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}