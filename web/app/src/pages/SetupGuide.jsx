import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronDown,
  Terminal,
  Server,
  Package,
  Database,
  Play,
  Code2,
  Lightbulb,
  Heart,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ── Copy-to-clipboard hook ─────────────────────── */
function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };
  return { copied, copy };
}

function CodeBlock({ code, id, copy, copied }) {
  return (
    <div className="relative group mt-2">
      <pre className="bg-secondary rounded-lg p-3 overflow-x-auto text-xs font-mono text-foreground leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copy(code, id)}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-secondary"
      >
        {copied === id ? (
          <Check className="w-3 h-3 text-emerald-500" />
        ) : (
          <Copy className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

/* ── Step data ───────────────────────────────────── */
const steps = [
  {
    id: 1,
    icon: Server,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "🔧 What technology runs the backend?",
    subtitle: "Understand the stack first — no surprises",
    content: `DuoBlySync's backend is powered by Base44's platform, which runs on:

• Runtime: Deno (a modern, secure JavaScript/TypeScript runtime — similar to Node.js but safer)
• Database: PostgreSQL (a powerful relational database)
• API layer: RESTful JSON API — auto-generated from your entity schemas
• Auth: Built-in — no setup needed
• Hosting: Managed cloud — Base44 handles servers, scaling, and security

👉 Think of it like Firebase or Supabase, but the data models and API are generated from the entity files you already created.

You do NOT write backend code manually — the entities/*.json files ARE the backend definition.`,
    tip: "Deno uses TypeScript by default, which means safer code. It runs directly in the cloud — no local server needed for the Base44 app itself.",
    code: null,
  },
  {
    id: 2,
    icon: Package,
    color: "text-cyan-600",
    bg: "bg-cyan-500/10",
    title: "💻 Set Up Your Local IDE",
    subtitle: "One tool at a time — no rushing",
    content: `You need two tools installed locally. Do them one at a time:

STEP A — Install Node.js (needed for the frontend)
  → Go to: https://nodejs.org
  → Click the big green "LTS" button (Long Term Support — the stable one)
  → Run the installer — click Next → Next → Install → Finish

STEP B — Install VS Code (your code editor)
  → Go to: https://code.visualstudio.com
  → Click "Download for Windows" (or Mac/Linux)
  → Run the installer — keep all default settings ticked
  → Open VS Code when done`,
    tip: "If you already have Node.js or VS Code, skip that part. No need to reinstall.",
    code: `# Check if Node.js is installed (open Terminal in VS Code with Ctrl + backtick)
node --version
# You should see something like: v20.x.x

npm --version
# You should see something like: 10.x.x`,
    codeId: "check-node",
  },
  {
    id: 3,
    icon: Code2,
    color: "text-purple-600",
    bg: "bg-purple-500/10",
    title: "📂 Open the Project",
    subtitle: "Get the code onto your machine",
    content: `Option A — Download from Base44 (easiest)
  → In Base44, click the top-right menu → "Export / Download Code"
  → Save the zip file somewhere easy to find (e.g. your Desktop)
  → Unzip it → you'll see a folder called something like "duoblysync"

Option B — Via GitHub (if you've connected GitHub sync)
  → In your terminal, run the clone command below
  → Then open the folder in VS Code: File → Open Folder`,
    tip: "In VS Code, you can drag the unzipped project folder straight onto the VS Code window to open it.",
    code: `# Option B: Clone from GitHub
git clone https://github.com/YOUR_USERNAME/duoblysync.git

# Then open it
cd duoblysync
code .`,
    codeId: "clone-repo",
  },
  {
    id: 4,
    icon: Terminal,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    title: "📦 Install Project Dependencies",
    subtitle: "One command — wait for it to finish",
    content: `Open the built-in terminal in VS Code:
  → Press Ctrl + backtick  (the key left of the 1 key on your keyboard)
  → A terminal panel opens at the bottom

Then type the install command and press Enter.

The first time this runs, it downloads all the libraries the project needs.
It may take 1–2 minutes. You'll see a lot of text scrolling — that's normal.
Wait until you see a new line with a blinking cursor (that means it's done).`,
    tip: 'If you see a red error about permissions on Mac/Linux, try adding "sudo" before the command: sudo npm install',
    code: `npm install`,
    codeId: "npm-install",
  },
  {
    id: 5,
    icon: Database,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    title: "🔑 Add Your API Key",
    subtitle: "Connect to the Base44 backend",
    content: `The frontend app needs to talk to Base44's backend. To do that:

  1. In Base44 dashboard → Settings → API Keys → Copy your key
  2. In VS Code, look for a file called .env.example in the project folder
  3. Make a copy of it and rename the copy to .env  (no .example at the end)
  4. Open the .env file
  5. Find the line that says VITE_BASE44_APP_ID=
  6. Paste your App ID after the = sign

Save the file with Ctrl + S`,
    tip: "The .env file is secret — it is already in .gitignore so it will never be accidentally uploaded to GitHub.",
    code: `# .env file — fill in your values
VITE_BASE44_APP_ID=your_app_id_here`,
    codeId: "env-setup",
  },
  {
    id: 6,
    icon: Play,
    color: "text-rose-600",
    bg: "bg-rose-500/10",
    title: "▶️ Run the App Locally",
    subtitle: "See it live on your machine",
    content: `In the terminal (still inside VS Code), run the start command below.

After a few seconds, you'll see a message like:
  ➜ Local:  http://localhost:5173/

Hold Ctrl and click that link, or copy and paste it into your browser.
The app opens — and it's connected to your live Base44 backend!

To stop the app: go back to the terminal and press Ctrl + C`,
    tip: 'The app "hot reloads" — when you save a file, the browser updates instantly. No need to restart.',
    code: `npm run dev`,
    codeId: "npm-run-dev",
  },
  {
    id: 7,
    icon: Lightbulb,
    color: "text-teal-600",
    bg: "bg-teal-500/10",
    title: "🧠 Dyslexia & Focus Tips for Development",
    subtitle: "Make your IDE work for you",
    content: `VS Code extensions that help with dyslexia and focus:

  1. OpenDyslexic Font — makes letters easier to distinguish
     Install: Ctrl+Shift+X → search "OpenDyslexic"

  2. Indent Rainbow — colours your code indentation so you never lose your place
     Install: Ctrl+Shift+X → search "Indent Rainbow"

  3. Error Lens — shows errors inline (no hunting for red squiggles)
     Install: Ctrl+Shift+X → search "Error Lens"

  4. GitLens — shows who changed what, with clear visual history
     Install: Ctrl+Shift+X → search "GitLens"

FONT SIZE TIP: In VS Code, press Ctrl+= to make text bigger and Ctrl+- to make it smaller.

FOCUS MODE: Press Ctrl+K then Z for "Zen Mode" — hides all menus, just your code.

COLOUR THEME: A good dark theme reduces eye strain. Try "One Dark Pro" from extensions.`,
    tip: 'There is no "right" way to set up your editor. Customise it until it feels comfortable for you.',
    code: `# Useful VS Code keyboard shortcuts
Ctrl + P           → Open any file by name (fuzzy search)
Ctrl + Shift + P   → Open command palette (do anything by typing)
Ctrl + /           → Comment or uncomment a line
Alt + ↑ / ↓        → Move a line up or down
Ctrl + D           → Select next occurrence of a word
Ctrl + backtick    → Toggle terminal`,
    codeId: "shortcuts",
  },
];

function StepCard({ step, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const { copied, copy } = useCopy();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
    >
      <div
        className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
          expanded
            ? "border-primary/30 shadow-md shadow-primary/5"
            : "border-border hover:border-primary/20"
        }`}
      >
        {/* Header — clickable */}
        <button
          className="w-full flex items-center gap-4 p-5 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div
            className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}
          >
            <step.icon className={`w-5 h-5 ${step.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground leading-tight">
              {step.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {step.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge
              variant="outline"
              className="text-[10px] font-mono hidden sm:flex"
            >
              Step {step.id}
            </Badge>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                {/* Main content — larger text, generous line height */}
                <div className="text-sm text-foreground leading-7 whitespace-pre-line">
                  {step.content}
                </div>

                {/* Tip box */}
                {step.tip && (
                  <div className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">
                      {step.tip}
                    </p>
                  </div>
                )}

                {/* Code block */}
                {step.code && (
                  <CodeBlock
                    code={step.code}
                    id={step.codeId}
                    copy={copy}
                    copied={copied}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function SetupGuide() {
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm px-6 py-5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Local Setup Guide
              </h1>
              <p className="text-xs text-muted-foreground">
                Backend info + dyslexia-friendly IDE steps
              </p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-xs text-rose-600 font-medium">
                DEI Friendly
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stack pills */}
      <div className="border-b border-border bg-secondary/30 px-6 py-3">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-2 items-center">
          <span className="text-xs text-muted-foreground mr-1">
            Tech stack:
          </span>
          {[
            {
              label: "Deno / TypeScript",
              color: "bg-primary/10 text-primary border-primary/20",
            },
            {
              label: "React + Vite",
              color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
            },
            {
              label: "PostgreSQL",
              color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
            },
            {
              label: "Tailwind CSS",
              color: "bg-teal-500/10 text-teal-600 border-teal-500/20",
            },
            {
              label: "Base44 BaaS",
              color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
            },
          ].map((t) => (
            <Badge
              key={t.label}
              variant="outline"
              className={`text-[11px] font-mono ${t.color}`}
            >
              {t.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {/* Intro banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-5"
        >
          <p className="text-sm text-foreground leading-relaxed">
            👋 <strong>Before you start:</strong> This guide is written in
            clear, plain language. Each step is separated so you can do one
            thing at a time. There is no step that requires you to do two things
            at once. If something goes wrong — that's completely normal in
            development. Take a break and come back to it.
          </p>
        </motion.div>

        {/* Steps */}
        {steps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} />
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-teal-500/5 border border-teal-500/20 rounded-xl p-5 text-center"
        >
          <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-foreground">
            You've got this.
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-md mx-auto">
            DuoBlySync is built to be inclusive — and that starts with how we
            write our own documentation. Every step above is written to be
            clear, manageable, and distraction-free.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
