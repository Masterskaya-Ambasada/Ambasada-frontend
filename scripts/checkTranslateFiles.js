// scripts/checkTranslateFiles.js
import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Получаем __dirname в ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Путь к папке с локалями
const localesPath = join(__dirname, "..", "src/locales");

// Проверка существования папки locales
if (!existsSync(localesPath)) {
  console.error("❌ Папка locales не найдена по пути:", localesPath);
  process.exit(1);
}

// Чтение всех языковых папок
const languages = readdirSync(localesPath).filter((file) => {
  const fullPath = join(localesPath, file);
  return statSync(fullPath).isDirectory();
});

console.log("🔍 Найдены языки:", languages.join(", "));

// Функция для загрузки JSON файла
function loadJsonFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Ошибка чтения файла ${filePath}:`, error.message);
    return null;
  }
}

// Рекурсивное получение всех ключей из вложенного объекта
function getAllKeys(obj, prefix = "") {
  let keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Функция для сравнения переводов
function compareTranslations() {
  if (languages.length === 0) {
    console.error("❌ Не найдено языковых папок в", localesPath);
    return;
  }

  // Загружаем переводы для каждого языка
  const translations = {};
  const referenceLang = "ru";

  for (const lang of languages) {
    const commonPath = join(localesPath, lang, "common.json");

    if (existsSync(commonPath)) {
      const data = loadJsonFile(commonPath);
      if (data) {
        translations[lang] = {
          data: data,
          keys: getAllKeys(data),
        };
      }
    } else {
      console.warn(`⚠️  Файл common.json не найден для языка ${lang}`);
    }
  }

  // Проверяем, есть ли базовый язык
  if (!translations[referenceLang]) {
    console.error(
      `❌ Базовый язык "${referenceLang}" не найден или не содержит common.json`,
    );
    return;
  }

  const referenceKeys = translations[referenceLang].keys;
  const referenceKeysSet = new Set(referenceKeys); // Создаем Set для базового языка
  const results = {};

  // Проверяем каждый язык
  for (const [lang, translation] of Object.entries(translations)) {
    if (lang === referenceLang) continue;

    const translationKeysSet = new Set(translation.keys); // Создаем Set для текущего языка

    // Используем Set для быстрого поиска
    const missingKeys = referenceKeys.filter(
      (key) => !translationKeysSet.has(key),
    );
    const extraKeys = translation.keys.filter(
      (key) => !referenceKeysSet.has(key),
    );

    results[lang] = {
      missing: missingKeys,
      extra: extraKeys,
      totalMissing: missingKeys.length,
      totalExtra: extraKeys.length,
      totalReferenceKeys: referenceKeys.length,
      totalCurrentKeys: translation.keys.length,
    };
  }

  // Выводим результаты
  console.log("\n📊 ОТЧЕТ ПО ПРОВЕРКЕ ПЕРЕВОДОВ");
  console.log("=".repeat(60));
  console.log(
    `📝 Базовый язык: ${referenceLang} (${referenceKeys.length} ключей)\n`,
  );

  let hasErrors = false;

  for (const [lang, result] of Object.entries(results)) {
    console.log(`\n🌐 Язык: ${lang}`);
    console.log("-".repeat(40));
    console.log(
      `✅ Всего ключей: ${result.totalCurrentKeys} / ${result.totalReferenceKeys}`,
    );

    if (result.totalMissing > 0) {
      hasErrors = true;
      console.log(`❌ ОТСУТСТВУЮЩИЕ ПОЛЯ (${result.totalMissing}):`);
      result.missing.forEach((key) => console.log(`   - ${key}`));
    } else {
      console.log(`✅ Нет отсутствующих полей`);
    }

    if (result.totalExtra > 0) {
      console.log(`⚠️  ЛИШНИЕ ПОЛЯ (${result.totalExtra}):`);
      result.extra.forEach((key) => console.log(`   - ${key}`));
    }
  }

  // Статистика по всем языкам
  console.log("\n" + "=".repeat(60));
  console.log("📈 СТАТИСТИКА");
  console.log("=".repeat(60));

  for (const [lang, result] of Object.entries(results)) {
    const percentage = (
      ((result.totalCurrentKeys - result.totalMissing) /
        result.totalReferenceKeys) *
      100
    ).toFixed(1);
    console.log(
      `${lang}: ${percentage}% заполнено (${result.totalCurrentKeys - result.totalMissing}/${result.totalReferenceKeys})`,
    );

    if (result.totalMissing > 0) {
      console.log(`   ⚠️  Отсутствует ${result.totalMissing} полей`);
    }
  }

  if (hasErrors) {
    console.log(
      "\n⚠️  ВНИМАНИЕ: Обнаружены отсутствующие поля в файлах переводов!",
    );
    process.exit(1);
  } else {
    console.log("\n✅ Все языки синхронизированы!");
  }
}

// Запуск проверки
compareTranslations();
