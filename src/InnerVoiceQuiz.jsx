import { useState } from "react";

const QUESTIONS = [
  {
    prompt: "When you finish a project, your first thought is...",
    options: [
      { text: "\"It's fine, but it should've been better.\"", type: "critic" },
      { text: "\"I hope they like it — what if they don't?\"", type: "pleaser" },
      { text: "\"Let me go over it one more time, just in case.\"", type: "overthinker" },
      { text: "\"It's still not quite ready to share.\"", type: "perfectionist" },
      { text: "\"I don't know if it's actually any good.\"", type: "doubter" },
    ],
  },
  {
    prompt: "Before making a decision, you usually...",
    options: [
      { text: "Judge yourself for not having decided already", type: "critic" },
      { text: "Think about how it'll affect everyone else first", type: "pleaser" },
      { text: "Run through every possible outcome, more than once", type: "overthinker" },
      { text: "Wait until you're sure it's the \"right\" choice", type: "perfectionist" },
      { text: "Ask someone else what they'd do", type: "doubter" },
    ],
  },
  {
    prompt: "When you get feedback, even mostly positive, you...",
    options: [
      { text: "Fixate on the one critical comment", type: "critic" },
      { text: "Feel relieved they're not upset with you", type: "pleaser" },
      { text: "Replay the conversation later, analyzing the tone", type: "overthinker" },
      { text: "Immediately think about what to fix next", type: "perfectionist" },
      { text: "Wonder if they were just being nice", type: "doubter" },
    ],
  },
  {
    prompt: "Saying \"no\" to someone feels like...",
    options: [
      { text: "Failing to meet an expectation", type: "critic" },
      { text: "The hardest thing you can possibly do", type: "pleaser" },
      { text: "Something you'll worry about after you say it", type: "overthinker" },
      { text: "Not really an option, if you're technically able to help", type: "perfectionist" },
      { text: "Something you can't do without justifying it first", type: "doubter" },
    ],
  },
  {
    prompt: "Your inner voice on a quiet night sounds like...",
    options: [
      { text: "\"You could've done more today.\"", type: "critic" },
      { text: "\"Did I do enough for everyone else today?\"", type: "pleaser" },
      { text: "\"What if that thing I said earlier came across wrong?\"", type: "overthinker" },
      { text: "\"Tomorrow, I'll finally get it right.\"", type: "perfectionist" },
      { text: "\"Do I even know what I actually want?\"", type: "doubter" },
    ],
  },
  {
    prompt: "When you imagine going for something big, you think...",
    options: [
      { text: "\"I'd have to be perfect to pull it off.\"", type: "critic" },
      { text: "\"What will people think if I put myself out there?\"", type: "pleaser" },
      { text: "\"I need to plan for everything that could go wrong first.\"", type: "overthinker" },
      { text: "\"I'm not ready yet — I need more before I try.\"", type: "perfectionist" },
      { text: "\"Who am I to think I could actually do this?\"", type: "doubter" },
    ],
  },
  {
    prompt: "A compliment that's hard for you to accept is...",
    options: [
      { text: "\"That was really good.\"", type: "critic" },
      { text: "\"You don't have to do everything for everyone.\"", type: "pleaser" },
      { text: "\"You don't need to worry so much.\"", type: "overthinker" },
      { text: "\"It doesn't have to be perfect.\"", type: "perfectionist" },
      { text: "\"You know more than you think you do.\"", type: "doubter" },
    ],
  },
  {
    prompt: "What you need to hear most, right now, is...",
    options: [
      { text: "\"You're allowed to make mistakes and still be worthy.\"", type: "critic" },
      { text: "\"Your needs matter just as much as everyone else's.\"", type: "pleaser" },
      { text: "\"You can act without having every answer.\"", type: "overthinker" },
      { text: "\"Done and imperfect beats perfect and unfinished.\"", type: "perfectionist" },
      { text: "\"You don't need proof to know what you know.\"", type: "doubter" },
    ],
  },
];

const RESULTS = {
  critic: {
    name: "The Inner Critic",
    says: "\"You should have done better. That wasn't good enough.\"",
    why: "It likely developed somewhere love or approval felt conditional on achievement — where mistakes meant judgment, so getting it right became a way to feel safe.",
    how: "You over-prepare, pick apart finished work, and rarely feel satisfied even when things go well.",
    shift: "From \"I have to be perfect to be safe\" to \"I can be imperfect and still be enough.\"",
    affirmation: "I am allowed to make mistakes and still be worthy.",
    journal: "What would I try if I knew I couldn't fail — and who taught me that failing meant I wasn't enough?",
  },
  pleaser: {
    name: "The People Pleaser",
    says: "\"Don't upset anyone. Your needs can wait.\"",
    why: "It likely developed from learning that keeping others happy kept the peace, or kept you loved — so your worth quietly became tied to being needed.",
    how: "You say yes when you mean no, avoid conflict at your own expense, and measure your value by how much you're doing for everyone else.",
    shift: "From \"I'm only valuable when I'm useful\" to \"I'm allowed to take up space without earning it.\"",
    affirmation: "My needs are just as important as everyone else's.",
    journal: "Where in my life am I saying yes out of fear instead of desire?",
  },
  overthinker: {
    name: "The Overthinker",
    says: "\"What if you get this wrong? Go over it again.\"",
    why: "It likely developed in an unpredictable environment, where anticipating every problem felt like the only way to stay in control.",
    how: "You delay decisions, replay conversations on a loop, and mistake overthinking for being thorough.",
    shift: "From \"If I think about it enough, I can control the outcome\" to \"I can act without having every answer.\"",
    affirmation: "I trust myself to handle what comes, even without a perfect plan.",
    journal: "What decision have I been avoiding because I'm afraid of getting it wrong?",
  },
  perfectionist: {
    name: "The Perfectionist",
    says: "\"This isn't ready yet. It needs to be better.\"",
    why: "It likely developed from being praised for achievement more than effort or character, so your worth got tied to the output, not the person behind it.",
    how: "You delay finishing or sharing things, hold yourself to impossible standards, and rarely let yourself feel 'done.'",
    shift: "From \"Good enough isn't good enough\" to \"Done and imperfect is better than perfect and never finished.\"",
    affirmation: "My worth isn't measured by flawless results.",
    journal: "What am I not starting or finishing because it might not be perfect?",
  },
  doubter: {
    name: "The Self-Doubter",
    says: "\"Who are you to think you can do this?\"",
    why: "It likely developed from having your voice dismissed, minimized, or corrected too often — so trusting yourself started to feel unsafe.",
    how: "You seek reassurance before trusting your own judgment, downplay your abilities, and hesitate before claiming what you actually want.",
    shift: "From \"I need permission to trust myself\" to \"I don't need proof to know what I know.\"",
    affirmation: "I trust my own voice, even when it's quiet.",
    journal: "Where have I been waiting for someone else's approval before I trust my own decision?",
  },
};

// Maps each internal archetype key to the exact label used in your
// MailerLite automation Conditions (must match exactly, including
// capitalization).
const ARCHETYPE_LABELS = {
  critic: "Inner Critic",
  pleaser: "People Pleaser",
  overthinker: "Overthinker",
  perfectionist: "Perfectionist",
  doubter: "Self-Doubter",
};

const ORDER = ["critic", "pleaser", "overthinker", "perfectionist", "doubter"];

function Bracket({ corner }) {
  const base = "absolute w-6 h-6 border-[#D8B4FE]";
  const map = {
    tl: "top-3 left-3 border-t-2 border-l-2",
    tr: "top-3 right-3 border-t-2 border-r-2",
    bl: "bottom-3 left-3 border-b-2 border-l-2",
    br: "bottom-3 right-3 border-b-2 border-r-2",
  };
  return <div className={`${base} ${map[corner]}`} />;
}

function Frame({ children }) {
  return (
    <div className="relative w-full max-w-md mx-auto px-8 py-10 sm:px-10 sm:py-12">
      <Bracket corner="tl" />
      <Bracket corner="tr" />
      <Bracket corner="bl" />
      <Bracket corner="br" />
      {children}
    </div>
  );
}

function ResultBlock({ label, children, quote }) {
  return (
    <div className="mb-5">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#D8B4FE] mb-2">
        {label}
      </p>
      {quote ? (
        <p className="display-font text-[#4A2C4F] text-lg italic leading-snug">
          "{children}"
        </p>
      ) : (
        <p className="text-[#4A2C4F]/80 text-sm leading-relaxed">{children}</p>
      )}
    </div>
  );
}

export default function InnerVoiceQuiz() {
  const [stage, setStage] = useState("intro");
  const [step, setStep] = useState(0);
  const [tally, setTally] = useState({
    critic: 0,
    pleaser: 0,
    overthinker: 0,
    perfectionist: 0,
    doubter: 0,
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleAnswer = (type) => {
    const next = { ...tally, [type]: tally[type] + 1 };
    setTally(next);
    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStage("email");
    }
  };

  const restart = () => {
    setStage("intro");
    setStep(0);
    setTally({ critic: 0, pleaser: 0, overthinker: 0, perfectionist: 0, doubter: 0 });
    setEmail("");
    setSubmitError("");
  };

  const winner = ORDER.reduce((best, key) =>
    tally[key] > tally[best] ? key : best
  , "critic");

  const r = RESULTS[winner];

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          archetypeLabel: ARCHETYPE_LABELS[winner],
        }),
      });
      if (!res.ok) {
        throw new Error("Subscription failed");
      }
      setStage("result");
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-12 px-4"
      style={{
        background: "#F8F4EF",
        fontFamily: "'Work Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Work+Sans:wght@400;500;600&display=swap');
        .display-font { font-family: 'Italiana', serif; }
      `}</style>

      {stage === "intro" && (
        <Frame>
          <p className="text-xs tracking-[0.2em] uppercase text-[#D8B4FE] mb-4 text-center">
            her inner boss
          </p>
          <h1 className="display-font text-3xl sm:text-4xl text-[#4A2C4F] text-center leading-tight mb-4">
            Which Inner Voice Is Running Your Life?
          </h1>
          <p className="text-[#4A2C4F]/70 text-center text-sm mb-8 leading-relaxed">
            Eight questions. One voice you'll recognize the moment you see
            it — and a place to start rewriting it.
          </p>
          <button
            onClick={() => setStage("quiz")}
            className="w-full py-3 rounded-full bg-[#4A2C4F] text-[#F8F4EF] text-sm tracking-wide hover:bg-[#3A2140] transition-colors"
          >
            Start the quiz
          </button>
        </Frame>
      )}

      {stage === "quiz" && (
        <Frame>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-[#D8B4FE]">
              {step + 1} / {QUESTIONS.length}
            </span>
            <div className="flex-1 mx-4 h-[2px] bg-[#4A2C4F]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D8B4FE] transition-all duration-300"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
          <h2 className="display-font text-xl sm:text-2xl text-[#4A2C4F] mb-7 leading-snug">
            {QUESTIONS[step].prompt}
          </h2>
          <div className="flex flex-col gap-3">
            {QUESTIONS[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.type)}
                className="text-left px-5 py-3.5 rounded-2xl border border-[#4A2C4F]/15 text-[#4A2C4F] text-sm hover:border-[#D8B4FE] hover:bg-[#D8B4FE]/10 transition-colors"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </Frame>
      )}

      {stage === "email" && (
        <Frame>
          <p className="text-xs tracking-[0.2em] uppercase text-[#D8B4FE] mb-3 text-center">
            your result is ready
          </p>
          <h1 className="display-font text-2xl sm:text-3xl text-[#4A2C4F] text-center leading-snug mb-4">
            Enter your email to see which voice is running your life
          </h1>
          <p className="text-[#4A2C4F]/70 text-center text-sm mb-8 leading-relaxed">
            We'll send your full result plus a free recap PDF: your voice,
            and your first Notice → Question → Rewrite exercise.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="px-5 py-3.5 rounded-2xl border border-[#4A2C4F]/15 text-[#4A2C4F] text-sm focus:outline-none focus:border-[#D8B4FE]"
            />
            {submitError && (
              <p className="text-red-500 text-xs text-center">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-full bg-[#4A2C4F] text-[#F8F4EF] text-sm tracking-wide hover:bg-[#3A2140] transition-colors disabled:opacity-60"
            >
              {submitting ? "Just a moment..." : "Reveal my inner voice"}
            </button>
          </form>
        </Frame>
      )}

      {stage === "result" && (
        <Frame>
          <p className="text-xs tracking-[0.2em] uppercase text-[#D8B4FE] mb-3 text-center">
            the voice running your life is
          </p>
          <h1 className="display-font text-4xl sm:text-5xl text-[#4A2C4F] text-center mb-6">
            {r.name}
          </h1>

          <ResultBlock label="what it says" quote>
            {r.says}
          </ResultBlock>
          <ResultBlock label="why it developed">{r.why}</ResultBlock>
          <ResultBlock label="how it affects your decisions">{r.how}</ResultBlock>
          <ResultBlock label="the mindset shift">{r.shift}</ResultBlock>
          <ResultBlock label="your daily affirmation" quote>
            {r.affirmation}
          </ResultBlock>

          <div className="bg-[#4A2C4F] rounded-2xl px-6 py-6 mb-7">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#D8B4FE] mb-3">
              journal prompt
            </p>
            <p className="text-[#F8F4EF] text-sm leading-relaxed italic">
              {r.journal}
            </p>
          </div>

          <button
            onClick={restart}
            className="w-full py-3 rounded-full border border-[#4A2C4F]/20 text-[#4A2C4F] text-sm tracking-wide hover:bg-[#4A2C4F]/5 transition-colors"
          >
            Take the quiz again
          </button>
        </Frame>
      )}
    </div>
  );
}
