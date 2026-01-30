import { StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS, THEME } from '@/constants/theme'; 

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background.base,
  },
  baseBackground: {
    position: 'absolute',
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    backgroundColor: COLORS.background.base,
  },
  topOrb: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: DIMENSIONS.width * 1.2,
    height: DIMENSIONS.width * 1.2,
    borderRadius: DIMENSIONS.width,
    transform: [{ scaleX: 1.5 }],
  },
  bottomOrb: {
    position: 'absolute',
    bottom: -150,
    right: -50,
    width: DIMENSIONS.width,
    height: DIMENSIONS.width,
    borderRadius: DIMENSIONS.width / 2,
  },
  orbGradient: {
    flex: 1,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexDirection: 'row',
  },
  logo: {
    width: 60, // Ajustado ligeramente para mejor proporción
    height: 60,
    opacity: 0.9,
  },
  title: {
    fontSize: 32, // Ajustado para que no rompa en pantallas pequeñas
    color: COLORS.text.title,
    letterSpacing: -1,
    marginBottom: 4,
    fontWeight: '700', // Más peso para legibilidad
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.subtitle,
    letterSpacing: 0.2,
    fontWeight: '400',
  },
  glassForm: {
    gap: 20,
  },
  inputWrapper: {
    backgroundColor: COLORS.background.glass,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  inputWrapperActive: {
    borderColor: COLORS.brand.teal,
    backgroundColor: COLORS.background.glassActive,
  },
  inputWrapperError: {
    borderColor: COLORS.status.error,
  },
  inputLabel: {
    fontSize: 12,
    color: COLORS.text.label,
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.input, // Texto blanco/claro sobre fondo oscuro
    padding: 0,
    // height: 24, // Quitado para evitar recortes en fuentes grandes
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -8,
  },
  errorText: {
    color: COLORS.status.error,
    fontSize: 13,
    fontWeight: '500',
    flexShrink: 1,
  },
  forgotText: {
    color: COLORS.brand.teal,
    fontSize: 13,
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberText: {
    color: COLORS.text.subtitle,
    fontSize: 14,
    marginLeft: 8,
  },
  submitBtnContainer: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    // Usamos las sombras definidas en el tema
    shadowColor: COLORS.brand.teal,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  submitBtnDisabled: {
    shadowOpacity: 0.05,
    elevation: 0,
  },
  submitBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
  },
  submitBtnText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});