# Screenshots

Screenshots konnten nicht automatisch erstellt werden — Chrome ist auf dem HP-Server nicht verfügbar (Windows Crypto API Fehler verhindert Playwright-Start).

## Manuell zu erstellen

| Dateiname | Viewport | Seite |
|-----------|---------|-------|
| `home-desktop.png` | 1440×900 | https://www.cafemitherz.at/ |
| `home-mobile.png` | 390×844 | https://www.cafemitherz.at/ |
| `tortenshop-desktop.png` | 1440×900 | https://www.cafemitherz.at/#/torten |
| `tortenshop-mobile.png` | 390×844 | https://www.cafemitherz.at/#/torten |
| `standort-desktop.png` | 1440×900 | https://www.cafemitherz.at/#/schlosscafe |
| `standort-mobile.png` | 390×844 | https://www.cafemitherz.at/#/schlosscafe |

## Auf ThinkPad ausführen

```powershell
# Playwright installieren (einmalig)
npm install -g playwright
npx playwright install chromium

# Screenshots nehmen
npx playwright screenshot --viewport-size="1440,900" https://www.cafemitherz.at home-desktop.png
npx playwright screenshot --viewport-size="390,844" https://www.cafemitherz.at home-mobile.png
```
