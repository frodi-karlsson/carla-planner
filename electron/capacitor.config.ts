import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'carla-planner',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
