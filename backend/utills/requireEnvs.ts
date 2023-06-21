export const requireEnvs = (envsNames: string[]) => {
  envsNames.forEach((name) => {
    if (!process.env[name]) {
      console.error(`${name} must be defined`);
      process.exit();
    }
  });
};
