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
        // PM2 не читает .env.local — BFF demo и /api/lk/* должны знать URL кабинета
        NEXT_PUBLIC_LK_URL: "https://cabinet.titlo.ru",
        LK_API_BASE_URL: "https://cabinet.titlo.ru",
      },
    },
  ],
};
