# Cartoon Assets for Kids – Geeta Duo

Two tasks:

1. **Task 1 – Avatars** (profile pictures on the Avatar Selection screen)
2. **Task 2 – Lesson images** (one illustration per stage, shown in the concept intro)

Everything here is cartoonish and aimed at children aged 5–12. It is a friendlier, bouncier alternative to the flat-vector prompts in `prompt.md`.

## Shared cartoon style (paste at the start of every prompt)

> Cute 2D cartoon illustration for young children, in the style of a Saturday-morning kids' animation or a Duolingo-like learning app. Big round heads, huge sparkly eyes, chubby cheeks, tiny noses, thick soft outlines, bouncy proportions. Bright, cheerful candy colors (saffron orange, sky blue, mint, lotus pink, sunshine yellow). Simple shapes, smooth cel shading, soft glow and little stars. Friendly, funny, warm and safe. No text, no letters, centered, uncluttered background. Respectful depiction of Indian culture.

## Negative prompt

> text, letters, watermark, logo, realistic, photo, scary, creepy, dark, gore, blood, weapons pointed at anyone, sharp teeth, angry eyes, clutter, distorted hands, extra fingers, low resolution

---

## Task 1 – Avatars

**Spec:** 512×512 PNG, head-and-shoulders, a big smile, a plain pastel background that crops cleanly to a circle. Each avatar has a different hair, outfit and accessory so kids can tell them apart at a glance.

Colors match the live SVG avatars in `src/utils/avatarUtils.ts`. Each avatar `id` matches `src/data/avatars.json`.

| ID | Name | Group | Cartoon prompt |
|----|------|-------|----------------|
| `avatar-boy-1` | Arjun | Boy | Cheerful 7-year-old Indian boy cartoon, short spiky black hair, saffron-orange kurta, small red tilak on forehead, giant sparkly brown eyes, gap-toothed grin. Peach-orange background. |
| `avatar-boy-2` | Ravi | Boy | Playful 9-year-old Indian boy cartoon, big bouncy curly hair, royal-blue kurta, tiny wooden flute necklace, cheeky wide smile, rosy cheeks. Sky-blue background. |
| `avatar-girl-1` | Priya | Girl | Sweet 7-year-old Indian girl cartoon, long black hair with a pink flower, hot-pink kurta, tiny red bindi, big happy eyes and dimples. Soft pink background. |
| `avatar-girl-2` | Meera | Girl | Cheerful 9-year-old Indian girl cartoon, two chunky braids with ribbons, teal dress, small bindi, confident giggly smile. Mint-teal background. |
| `avatar-teen-1` | Vikram | Teen | Friendly 13–14-year-old Indian boy cartoon, neat short hair, round glasses, green kurta, small tilak, calm clever smile. Light-green background. |
| `avatar-teen-2` | Anjali | Teen | Friendly 13–14-year-old Indian girl cartoon, hair in a high bun, purple kurta, gold earrings, bindi, warm determined smile. Lavender background. |
| `avatar-guide-1` | Guru Ji (guide) | Guide | Kind cartoon grandfather sage, white topknot, fluffy white beard, saffron robe, red tilak, twinkling eyes and a big gentle smile. Golden-yellow background. |

**Optional mood variants** (for lesson feedback; same character, different face):
- Happy (default)
- Cheering with arms up (correct answer)
- Sad but encouraging, with a small tear and a thumbs-up (wrong answer)

---

## Task 2 – Lesson images

**Spec:** 1024×1024 PNG, square, soft gradient or simple scene background, saved to `public/assets/<filename>`. The filename is referenced by `concept.imageUrl` in `src/data/lessons.json`.

Characters stay cartoon-cute: Krishna is a smiling blue-skinned boy-god with a peacock feather, Arjuna is a young prince with big eyes, and every animal is round and friendly.

### Chapter 1 – Arjuna's Doubt
| Stage | File | Prompt |
|---|---|---|
| ch1-1 The Big Battle | `arjuna_doubt.png` | Cartoon young prince Arjuna with a big round head, golden armor, sitting sadly in a chariot, a droopy bow beside him and one little tear. Two armies drawn as tiny cute toy soldiers far away. Soft orange sky. Sad but gentle, with no fighting shown. |
| ch1-2 Asking for Help | `krishna_arjuna.png` | Cartoon Krishna with a blue face, peacock feather and a warm smile, driving a chariot with two chubby white horses, patting Arjuna on the shoulder. Sunrise glow, hearts and sparkles floating around. |

### Chapter 2 – Eternal Soul
| Stage | File | Prompt |
|---|---|---|
| ch2-1 You Are Not the Body | `shield_soul.png` | A smiling little glowing golden light-buddy with tiny arms, stepping out of a worn-out sleepy outfit and into a shiny new one, as if changing clothes. Starry blue background. |
| ch2-2 Indestructible You | `indestructible_soul.png` (new; currently reuses `shield_soul.png`) | The same golden light-buddy standing proudly in a bubble shield, giggling as a cartoon sword, a flame, a water splash and a wind swirl bounce off it. Deep blue space background. |
| ch2-3 Peace of Mind | `tortoise.png` | An adorable round tortoise tucking its head into its shell with a happy sleepy face, sitting by a pond with lotus flowers and a sunset. |

### Chapter 3 – Karma Yoga
| Stage | File | Prompt |
|---|---|---|
| ch3-1 Duty Calls | `karma_yoga.png` | Three happy cartoon helpers: a kid doing homework, a kid sweeping with mom, and a smiling farmer, all joined by a golden ring of sparkles. Warm orange background. |
| ch3-2 Wheel of Sacrifice | `cycle_life.png` | A cute circular cycle with a smiling sun, a rain cloud, growing crops with faces, a basket of food, and kids sharing it, linked by golden arrows. |

### Chapter 4 – Divine Knowledge
| Stage | File | Prompt |
|---|---|---|
| ch4-1 The Avatar | `avatar_vishnu.png` | Cartoon baby-faced Vishnu/Krishna floating down from the clouds on a glowing halo, holding a lotus and a conch, waving hello to a happy little earth. Purple and gold sky. |
| ch4-2 Knowledge Fire | `fire_wisdom.png` | A friendly flame character with a smiley face, turning little seeds into sparkles. A tiny sleepy sprout sits nearby. Purple-orange background. |

### Chapter 5 – Renunciation
| Stage | File | Prompt |
|---|---|---|
| ch5-1 Lotus Leaf | `lotus.png` | A giant green lotus leaf with a happy face, with round water drops sliding off like a slide. A pink lotus flower smiles beside it. Misty teal pond. |

### Chapter 6 – Meditation
| Stage | File | Prompt |
|---|---|---|
| ch6-1 Monkey Mind | `monkey_mind.png` | A calm cartoon child meditating with a smile while a silly, hyper monkey swings around its head. Thought bubbles shaped like fruits and stars. |
| ch6-2 The Yogi's Eye | `equality.png` | A cartoon yogi with a glowing third eye and a smile, looking at a priest, a cow, an elephant, a dog and a kid, all with the same golden heart-glow inside. All the same size. |

### Chapter 7 – Wisdom
| Stage | File | Prompt |
|---|---|---|
| ch7-1 God Everywhere | `pearls.png` | A shiny pearl necklace on a golden string, each pearl a tiny cartoon world showing the sun, moon, water, sky and earth, all smiling. |
| ch7-2 Four Kinds of People | `four_devotees.png` | Four cartoon kids kneeling before a glowing little temple: a worried one, one holding coins, a curious one with a question mark, and a wise one with folded hands. Warm yellow background. |

### Chapter 8 – Imperishable
| Stage | File | Prompt |
|---|---|---|
| ch8-1 The Final Thought | `final_thought.png` | A cute sleepy grandpa cartoon smiling in a rocking chair, with a thought bubble of Krishna's flute and a lotus, and a sparkly path to the stars. Warm sunset. |

### Chapter 9 – Royal Secret
| Stage | File | Prompt |
|---|---|---|
| ch9-1 The Royal Secret | `royal_secret.png` | A treasure chest opening to reveal a glowing golden key, a crown and a scroll, with sparkles and lotus petals. Pink and gold. |
| ch9-2 Simple Offering | `offering.png` | Chubby kid hands offering a leaf, a flower, a fruit and a cup of water on a plate, with a smiling Krishna hand sending a glow from above. |

### Chapter 10 – Divine Glories
| Stage | File | Prompt |
|---|---|---|
| ch10-1 The Best of Everything | `lion.png` | A big, fluffy, friendly lion cub-king in the middle, surrounded by a smiling river, a mountain, the sun and a banyan tree, all glowing the same gold. Emerald green background. |

### Chapter 11 – Cosmic Form
| Stage | File | Prompt |
|---|---|---|
| ch11-1 Cosmic Form | `cosmic_form.png` | A giant, friendly, glowing blue Krishna filling the sky with many smiling faces and arms, with stars and planets inside. A tiny wide-eyed Arjuna waves from below. Awe, not fear. |

### Chapter 12 – Bhakti Yoga
| Stage | File | Prompt |
|---|---|---|
| ch12-1 Devotion is Best | `bhakti_love.png` | A cartoon child with closed eyes and folded hands, with a big glowing heart tied by a ribbon to Krishna playing his flute. Pink petals float around. |

### Chapter 13 – Field & Knower
| Stage | File | Prompt |
|---|---|---|
| ch13-1 The Farmer and the Field | `field.png` | A smiling cartoon farmer with a hat, looking proudly at a field of crops with tiny faces. A little golden light-buddy sits on the farmer's shoulder, watching. |

### Chapter 14 – Three Gunas
| Stage | File | Prompt |
|---|---|---|
| ch14-1 The Puppets of Nature | `puppets.png` | A cute puppet kid held by three colored strings: gold (calm, smiling), red (restless, jumpy) and blue (sleepy, yawning), held by a friendly hand from the clouds. Teal background. |

### Chapter 15 – Supreme Person
| Stage | File | Prompt |
|---|---|---|
| ch15-1 Upside Down Tree | `banyan_tree.png` | A funny upside-down banyan tree with roots in the sky and branches pointing down, mirrored in a lake. A small golden axe leans against it. Violet dusk with sparkles. |

### Chapter 16 – Divine & Demonic
| Stage | File | Prompt |
|---|---|---|
| ch16-1 Good vs Bad | `good_bad.png` | Split picture: left, a smiling kid sharing food under a bright sun with a lotus; right, a grumpy kid under a tiny grey rain cloud. Both are cute, and the sad one is clearly able to change. |
| ch16-2 Three Gates to Hell | `three_gates.png` | Three cartoon stone gates marked with a fiery heart, a red flame and a pile of coins, each with a silly grumpy face. A bright golden path leads away toward a smiling sunrise. Spooky-silly, never scary. |

---

## Extras (optional)

- **Lesson complete:** A happy golden lotus popping open with confetti, stars and cheering mini avatars.
- **Welcome screen:** Cartoon Krishna and Arjuna in a chariot at sunrise, heading down a rainbow path past the chapter landmarks.
- **Badges:** Round cartoon medals, one per badge in `src/data/badges.json`, in the same style.

## Checklist for every image

- [ ] No text or letters inside the artwork
- [ ] Big eyes, friendly faces, nothing scary
- [ ] Reads clearly when small (avatars at 64px, lesson images at about 300px)
- [ ] Same palette and outline thickness across all images
- [ ] Saved at the exact filename listed above
