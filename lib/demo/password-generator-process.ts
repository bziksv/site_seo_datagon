/** Логика генератора — как в cabinet PasswordsGenerator::generatePassword */

export type PasswordGenOptions = {
  countSymbols: number;
  enums?: boolean;
  upperCase?: boolean;
  lowerCase?: boolean;
  specialSymbols?: boolean;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
const LETTERS = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
  "m", "n", "o", "p", "r", "s", "t", "u", "v", "x", "y", "z",
] as const;
const SPECIAL = ["%", "*", ")", "?", "@", "#", "$", "~"] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function shuffleString(value: string): string {
  const chars = value.split("");
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j]!, chars[i]!];
  }
  return chars.join("");
}

export function isPasswordGenOptionsInvalid(opts: PasswordGenOptions): boolean {
  if (!opts.countSymbols || opts.countSymbols < 1) {
    return true;
  }
  return !opts.enums && !opts.upperCase && !opts.lowerCase && !opts.specialSymbols;
}

export function generatePassword(opts: PasswordGenOptions): string {
  let password = "";
  let i = 0;
  const limit = Math.min(50, Math.max(1, Math.floor(opts.countSymbols)));

  while (i < limit) {
    if (opts.enums) {
      password += pick(DIGITS);
      i += 1;
    }
    if (opts.lowerCase && i < limit) {
      password += pick(LETTERS);
      i += 1;
    }
    if (opts.upperCase && i < limit) {
      password += pick(LETTERS).toUpperCase();
      i += 1;
    }
    if (opts.specialSymbols && i < limit) {
      password += pick(SPECIAL);
      i += 1;
    }
  }

  return shuffleString(password);
}

export function generatePasswordBatch(opts: PasswordGenOptions, count = 5): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  let attempts = 0;
  while (out.length < count && attempts < count * 20) {
    attempts += 1;
    const pwd = generatePassword(opts);
    if (!seen.has(pwd)) {
      seen.add(pwd);
      out.push(pwd);
    }
  }
  return out;
}

export type PasswordGenPreset = "strong" | "letters" | "pin";

export const PASSWORD_GEN_PRESETS: Record<
  PasswordGenPreset,
  PasswordGenOptions
> = {
  strong: {
    enums: true,
    upperCase: true,
    lowerCase: true,
    specialSymbols: true,
    countSymbols: 16,
  },
  letters: {
    enums: false,
    upperCase: true,
    lowerCase: true,
    specialSymbols: false,
    countSymbols: 15,
  },
  pin: {
    enums: true,
    upperCase: false,
    lowerCase: false,
    specialSymbols: false,
    countSymbols: 6,
  },
};
