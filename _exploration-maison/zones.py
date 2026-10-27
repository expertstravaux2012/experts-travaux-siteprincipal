# Zones en POURCENTAGE de l'image (origine haut-gauche). Source unique.
ZONES = {
 'toiture':    [(21,33),(45,12),(62,11),(85,28),(72,31),(52,18),(33,27)],
 'charpente':  [(53,29),(61,15),(76,23),(72,37),(56,34)],
 'isolation':  [(28,41),(41,35),(42,53),(29,58)],
 'facade':     [(18,35),(28,31),(29,73),(18,67)],
 'menuiseries':[(29,39),(40,34),(41,71),(30,75)],
 'maconnerie': [(7,49),(19,43),(21,69),(8,73)],
 'extension':  [(79,38),(89,42),(89,66),(79,63)],
 'salle-de-bain':[(57,39),(75,40),(74,58),(57,56)],
 'cuisine':    [(55,62),(77,62),(76,81),(55,79)],
 'electricite':[(45,28),(52,28),(52,80),(45,80)],
 'chauffage':  [(15,72),(27,71),(28,84),(15,85)],
 'finitions':  [(38,55),(45,54),(45,78),(38,79)],
}

# Point de rappel (dot + depart du trait) par zone, en % de l'image.
# Decouple du polygone cliquable -> pose precisement sur l'element visible.
MARK = {
 'toiture':      (70,19),
 'charpente':    (64,24),
 'isolation':    (34,45),
 'facade':       (24,48),
 'menuiseries':  (34,60),
 'maconnerie':   (14,58),
 'extension':    (84,50),
 'salle-de-bain':(66,46),
 'cuisine':      (66,72),
 'electricite':  (49,45),
 'chauffage':    (21,77),
 'finitions':    (42,64),
}
