# Vinora · Landing page deploy

Cíl: vinora.cz ukazuje **landing.html** s waitlist formulářem.
App (current `index.html` = login) zůstává dostupná pro tebe.

## Soubory

```
landing.html      ← marketing landing s waitlist formem
privacy.html      ← GDPR Privacy Policy (šablona, dovyplnit DOPLNIT)
terms.html        ← obchodní podmínky (šablona)
imprint.html      ← tiráž (povinná v EU)
```

## Krok 1 — DNS pro vinora.cz

V administraci u svého registrátora (Active24/Forpsi) nastav:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     kamiljurik.github.io.
```

Tyto IP jsou GitHub Pages servery (oficiální).

## Krok 2 — GitHub repo

V repu vytvoř soubor `CNAME` (bez koncovky) v rootu s obsahem:

```
vinora.cz
```

V GitHub repo Settings → Pages:
- Source: Deploy from a branch
- Branch: main, folder: / (root)
- Custom domain: vinora.cz
- ☑ Enforce HTTPS (po DNS propagaci, do hodiny)

## Krok 3 — Strategie souborů

Máš na výběr ze dvou cest:

### A) Landing jako homepage, app na podsložce (doporučuji)

```
vinora.cz/                 → landing.html (renamed na index.html)
vinora.cz/app/             → tvá appka (přesunout všechny .html)
vinora.cz/app/             → login (současný index.html → app/index.html)
vinora.cz/v/{token}        → public share (až bude implementováno)
```

Konkrétní kroky:
1. `mkdir app/`
2. Přesunout `index.html, vina.html, vino.html, profil.html, admin.html` do `app/`
3. Přejmenovat `landing.html` → `index.html`
4. Update relative paths v HTML souborech (CSS/JS — pokud potřebuje)

### B) Landing na samostatné subdoméně (alternativa)

```
vinora.cz/                 → landing
app.vinora.cz/             → tvá appka
```

Vyžaduje další DNS záznam (CNAME app → kamiljurik.github.io) a samostatný repo nebo branch.
Složitější setup, **doporučuju A**.

## Krok 4 — MailerLite napojení

1. **Registruj se** na <https://www.mailerlite.com> (free tier 1 000 kontaktů)

2. **Vytvoř formulář**:
   - Forms → Create new form → Embedded form
   - Pojmenuj „Vinora Waitlist"
   - Pole: Email + (volitelně) custom field „Velikost sklepa" (Radio: 0–10 / 10–50 / 50+)
   - Confirmation: „Děkujeme — dáme vědět při launchi"

3. **Získej embed kód** — MailerLite ti dá HTML snippet typu:
   ```html
   <div class="ml-embedded" data-form="abc123def"></div>
   <script>(function(m,a,i,l,e,r){...})(window,document,'script',...);</script>
   ```

4. **Vlož do landing.html** — vyhledej blok:
   ```html
   <!-- ▼▼▼ MAILERLITE EMBED START ▼▼▼ -->
   ...
   <!-- ▲▲▲ MAILERLITE EMBED END ▲▲▲ -->
   ```
   A nahraď celý placeholder formulář MailerLite snippetem. **Dvakrát** —
   v hero sekci a v final CTA sekci.

5. Test: zaregistruj se s vlastním e-mailem, ověř, že se objeví v MailerLite Subscribers.

## Krok 5 — Naplnit šablony

V `privacy.html`, `terms.html`, `imprint.html` najdi všechny:

```
[DOPLNIT JMÉNO]
[DOPLNIT IČO]
[DOPLNIT ADRESU]
[DOPLNIT DATUM]
```

…a vyplň skutečnými údaji. Doporučuji dát na revizi právníkovi (cca 5 000 Kč jednorázově) než publikuješ.

## Krok 6 — Analytics (volitelné, ale doporučené)

Přidej **Plausible** pro tracking:

1. Registrace na <https://plausible.io> (30 dní free trial, pak $9/měs)
2. Přidej tvou doménu vinora.cz
3. Plausible ti dá script tag, vlož do `<head>` všech HTML souborů:
   ```html
   <script defer data-domain="vinora.cz" src="https://plausible.io/js/script.js"></script>
   ```

Plausible je GDPR-friendly, **bez cookies = bez cookie banneru**.

Alternativa: **Umami** (open source, self-host nebo umami.is free tier).

## Krok 7 — UTM tagy pro distribuci

Před tím, než budeš sdílet, vytvoř si UTM odkazy:

```
vinora.cz/?utm_source=facebook&utm_medium=group&utm_campaign=launch_validation_2026
vinora.cz/?utm_source=reddit&utm_medium=post&utm_campaign=launch_validation_2026
vinora.cz/?utm_source=email&utm_medium=outreach&utm_campaign=vinarstvi_sonberk
```

V Plausible pak uvidíš, **odkud signupy přišly**. Bez UTM netušíš, co fungovalo.

## Krok 8 — Test před publikací

- [ ] vinora.cz funguje (DNS propagovala se)
- [ ] HTTPS je vynucené
- [ ] Landing vypadá OK na desktop, tablet, mobil
- [ ] Form skutečně přidá e-mail do MailerLite (test sám sebe)
- [ ] Linky v footru fungují (privacy, terms, imprint)
- [ ] Privacy a terms mají vyplněno všechno DOPLNIT
- [ ] Plausible eviduje návštěvy

## Krok 9 — Spustit distribuci

Reálné prahy rozhodnutí pro 14 dní:

| Signupy | Verdikt |
|---|---|
| **>200** | Validace, jdi do build fáze |
| **50–200** | Slabší PMF, iteruj copy nebo cílení |
| **<50** | Pivot nebo pet projekt |

Source attribution pomocí UTM tě nasměruje, na co cílit primárně.

---

## Pozn. Můžeš deploynout v této pořadí klidně s odkladem

Nemusíš všechno udělat za den:
1. **Den 1**: DNS + landing on vinora.cz, přepsání footer kontaktu
2. **Den 2**: MailerLite napojení, test
3. **Den 3**: Privacy + Terms + Imprint vyplnit (dat na revizi právníkovi)
4. **Den 4**: Plausible
5. **Den 5+**: Spustit distribuci (FB, Reddit, vinařství)

Hlavní je, že **landing.html je hotová** a může jet bez další práce.
