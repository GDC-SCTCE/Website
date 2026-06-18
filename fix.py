import sys
with open('prisma/seed.ts', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('"Game Jams"', '"Game_Jams"')
c = c.replace('"E-SPORTS"', '"E_SPORTS"')
with open('prisma/seed.ts', 'w', encoding='utf-8') as f:
    f.write(c)
