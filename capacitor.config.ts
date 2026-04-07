import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.nailflow.manicure',
  appName: 'NailFlow',
  webDir: 'public',
  server: {
    url: 'https://nailflow.app/bienvenida',
    cleartext: true,
    androidScheme: 'https',
    allowNavigation: ['nailflow.app']
  },
  plugins: {
  SplashScreen: {
    launchShowDuration: 4000,
    launchAutoHide: true,
    backgroundColor: '#fbf9f9',
    androidSplashResourceName: 'splash',
    iosSplashResourceName: 'splash',
    showSpinner: false,
    androidScaleType: 'CENTER_INSIDE',
  },
  StatusBar: {
    style: 'DARK',
    backgroundColor: '#fbf9f9',
  },
  ios: {
  backgroundColor: '#fbf9f9',
},
}
};

export default config;

