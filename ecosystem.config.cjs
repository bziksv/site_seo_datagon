/** PM2: titlo.ru на порту 3003 (PM2 не читает .env.local — PORT задаём явно). */
module.exports = {
  apps: [
    {
      name: "titlo-site",
      script: "npm",
      args: "run start:titlo",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: "3003",
      },
    },
  ],
};
