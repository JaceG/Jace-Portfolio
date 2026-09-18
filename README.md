This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Higgsfield / Seedance 2.5

The standalone, server-side `index.ts` example uses `@higgsfield/client/v2` with npm and Node.js 24 (native TypeScript and environment-file support). It is not imported into the portfolio frontend.

The shared credential is stored in this Mac's Keychain, specifically for ChatGPT/Codex:

- Label: **Higgsfield API — ChatGPT**
- Service: `ai.higgsfield.api.chatgpt`
- Account: your macOS username
- Value: the Higgsfield key created for ChatGPT, in `key-id:key-secret` format

Claude Code should have a separate API key and Keychain entry. This launcher never selects a generic Higgsfield entry or a Claude entry. These are separate credentials by convention; Keychain access remains governed by macOS permissions, not the entry's name.

The launcher is installed at `~/.local/bin/higgsfield-chatgpt`. To install it on another Mac from the source in this repository:

```bash
mkdir -p ~/.local/bin
install -m 700 scripts/higgsfield-chatgpt.cjs ~/.local/bin/higgsfield-chatgpt
```

To save or replace the ChatGPT credential, run this yourself in a local Terminal:

```bash
~/.local/bin/higgsfield-chatgpt --setup
```

Enter `key-id:key-secret` at the hidden password prompt. Never put the actual value in chat, a command argument, or a tracked file. The launcher captures it internally at runtime and passes `HF_CREDENTIALS` (TypeScript) and `HF_KEY` (Python) only to the launched process. It never prints the credential. `.env.local` is ignored by Git and can remain blank for this setup; Keychain supplies the value and takes precedence over any environment-file fallback.

Check local availability without calling the API:

```bash
npm run higgsfield:video -- --check
```

Submit one **billable** generation and wait for the video URL:

```bash
npm run higgsfield:video
```

The request uses model `bytedance/seedance-2.5/text-to-video`, prompt `A cinematic scene at sunset`, duration `5`, resolution `720p`, and aspect ratio `16:9`. Success requires both a completed status and a valid HTTPS video URL. Failed, canceled, moderated, unknown, or malformed responses exit unsuccessfully. Upstream error objects are not logged because they may contain credentials.

The official SDK's `subscribe` method creates the request. SDK 0.2.6 omits canceled requests from its built-in polling termination checks, so the example polls the official status endpoint explicitly. Automatic submission retries are disabled to avoid duplicate billable requests. It waits up to 15 minutes, and prints the request ID immediately after submission. If interrupted or timed out, resume checking the existing request without creating another generation:

```bash
npm run higgsfield:video -- --resume REQUEST_ID
```

Stopping local execution does not cancel a remote generation. If submission fails before an ID is returned, check the Higgsfield console before trying again.

Other local projects can reuse the ChatGPT credential through the same launcher:

```bash
~/.local/bin/higgsfield-chatgpt node index.ts
~/.local/bin/higgsfield-chatgpt python3 main.py
```

This credential is local to this Mac. Hosted applications, cloud tasks, and other computers need their own server-side credential configuration. Do not use a public frontend environment variable or add the key to project instructions.

Official references: [SDK guide](https://docs.higgsfield.ai/docs/how-to/sdk) and [Seedance 2.5 API reference](https://console.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference).
