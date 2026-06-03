require("dotenv").config();
const mongoose = require("mongoose");
const Article = require("./models/models/Article");

const articles = [
  {
    title: "The Rise of Alternative Punk: A Revolution in Sound",
    content: `Alternative punk emerged in the late 1970s and early 1980s as a rebellious offshoot of the original punk rock movement. While traditional punk was raw and aggressive, alternative punk bands began blending in elements of post-punk, new wave, and indie rock to create something entirely their own.

Bands like The Replacements, Hüsker Dü, and Pixies were at the forefront of this movement, pushing the boundaries of what punk could sound like. Their music was louder, faster, and more chaotic than anything that came before, yet it carried an emotional depth that resonated with a generation of disaffected youth.

The DIY ethos of punk remained intact — self-released records, underground venues, and word-of-mouth promotion — but the sound was evolving. Alternative punk wasn't just music; it was a lifestyle, a philosophy, and a community that rejected mainstream culture in favor of something more authentic and raw.

Today, the influence of alternative punk can be heard in countless modern artists, from Paramore to Turnstile, proving that the spirit of punk never truly dies — it just mutates into something new.`,
    author: "Alex Rivera",
    category: "History",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    isPublished: true,
  },
  {
    title: "Band Spotlight: Pixies and the Art of Quiet-Loud-Quiet",
    content: `Few bands have had as much influence on alternative punk as the Pixies. Formed in Boston in 1986, the quartet of Black Francis, Kim Deal, Joey Santiago, and David Lovering created a sonic blueprint that would go on to inspire an entire generation of musicians — most famously, Kurt Cobain himself.

Their signature "quiet-loud-quiet" dynamic — soft, melodic verses exploding into massive, distorted choruses — became one of the defining techniques of alternative rock and punk. Albums like Surfer Rosa (1988) and Doolittle (1989) are considered masterpieces of the genre, packed with surrealist lyrics, aggressive guitar work, and melodies that somehow felt both abrasive and catchy at the same time.

Kim Deal's bass lines were deceptively simple yet incredibly effective, while Joey Santiago's guitar work was angular and unpredictable. Black Francis screamed, whispered, and howled his way through songs about aliens, biblical violence, and teenage lust with equal conviction.

The Pixies broke up in 1993 but reunited in 2004, continuing to tour and record. Their legacy remains untouchable — a band that changed the rules of what alternative punk could be.`,
    author: "Jamie Torres",
    category: "Band Spotlight",
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
    isPublished: true,
  },
  {
    title: "Album Review: Turnstile's 'GLOW ON' — Punk's Brightest Future",
    content: `When Turnstile dropped GLOW ON in 2021, the hardcore punk world collectively lost its mind — and for good reason. The Baltimore band had somehow managed to take the aggression and intensity of hardcore punk and fuse it seamlessly with funk grooves, R&B melodies, shoegaze textures, and even touches of dream pop.

The result was one of the most exhilarating and unexpected punk albums in years. Opening track "Mystery" sets the tone immediately — a swirling, euphoric burst of energy that sounds unlike anything else in the genre. From there, the album careens through breakneck hardcore ("Blackout"), lush melodic punk ("Holiday"), and even a gorgeous, restrained ballad ("Alien Tone").

What makes GLOW ON so remarkable is how effortlessly Turnstile pulls off these genre jumps. Nothing feels forced or out of place — it all coexists naturally within their unique sonic universe. Singer Brendan Yates delivers every line with an infectious conviction that makes you want to jump around your room regardless of what mood you were in before pressing play.

GLOW ON is not just a great punk album — it's a great album, full stop. A reminder that punk at its best is about pushing boundaries and refusing to be defined.

**Rating: 9.5/10**`,
    author: "Sam Nakamura",
    category: "Album Review",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    isPublished: true,
  },
  {
    title: "10 Essential Alternative Punk Albums You Need to Hear",
    content: `Whether you're new to alternative punk or a longtime fan looking to fill gaps in your collection, these ten albums are absolutely essential listening.

1. Pixies — Doolittle (1989)
The gold standard of alternative punk. Surrealist lyrics, explosive dynamics, and hooks that burrow into your brain permanently.

2. Hüsker Dü — Zen Arcade (1984)
A double album of raw, relentless punk with unexpected melodic depth. Bob Mould's guitar work is ferocious throughout.

3. The Replacements — Let It Be (1984)
Equal parts drunk and brilliant, this album captures the messy, emotional heart of alternative punk perfectly.

4. Fugazi — Repeater (1990)
Ian MacKaye's post-hardcore masterpiece. Political, angular, and absolutely uncompromising in every way.

5. Bikini Kill — Reject All American (1996)
Kathleen Hanna and company defined the riot grrrl movement with this fierce, confrontational, and vital record.

6. Jawbreaker — Dear You (1995)
Emotional punk songwriting at its finest. Blake Schwarzenbach's lyrics hit harder than most guitar riffs ever could.

7. Bad Brains — Bad Brains (1982)
The fastest, most intense punk record ever made, with reggae interludes that somehow make it even more powerful.

8. Turnstile — GLOW ON (2021)
The future of punk is here, and it's funkier and more joyful than anyone expected.

9. Paramore — Riot! (2007)
Pop-punk perfection. Hayley Williams' voice carries enough raw emotion to power a small city.

10. The Misfits — Walk Among Us (1982)
Horror punk at its absolute peak. Danzig's vocal melodies are absurdly catchy for how dark the subject matter is.`,
    author: "Casey Morgan",
    category: "Listicle",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    isPublished: true,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Article.deleteMany({});
    console.log("Cleared existing articles");

    await Article.insertMany(articles);
    console.log("✅ 4 articles inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding articles:", error);
    process.exit(1);
  }
};

seed();