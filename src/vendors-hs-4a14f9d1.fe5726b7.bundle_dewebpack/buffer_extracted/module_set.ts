function warnAboutPromiseSetting(propertyName: string): void {
  console.warn(
    `You are setting ${propertyName} on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js`
  );
}