import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3005",
    specPattern: "tests/e2e/**/*.{js,jsx,ts,tsx}", 
    supportFile: false,
    fileServerFolder: '.cypress'
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});