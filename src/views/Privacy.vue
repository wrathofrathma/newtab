<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(131,165,152,0.16),_transparent_40%),linear-gradient(180deg,var(--nt-surface-canvas-strong)_0%,var(--nt-surface-canvas)_38%,var(--nt-surface-canvas)_100%)] px-6 py-10 text-left text-gruvbox-dark-fg-1 sm:px-8 lg:px-12"
  >
    <div class="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            class="text-xs uppercase tracking-[0.28em] text-gruvbox-dark-aqua-1"
          >
            Hosted Privacy
          </p>
          <h1
            class="mt-2 text-4xl font-bold text-gruvbox-dark-fg-0 sm:text-5xl"
          >
            Privacy Policy
          </h1>
          <p
            class="mt-3 max-w-2xl text-sm leading-6 text-gruvbox-dark-fg-3 sm:text-base"
          >
            CatTab is a client-side new tab page. It stores your settings in
            your browser and does not run a user account or analytics service.
          </p>
        </div>

        <RouterLink
          to="/"
          class="rounded-full border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-s px-4 py-2 text-sm font-bold text-gruvbox-dark-fg-1 transition hover:border-gruvbox-dark-aqua-1 hover:text-gruvbox-dark-fg-0"
        >
          Back to new tab
        </RouterLink>
      </div>

      <div
        class="rounded-3xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s/85 p-6 shadow-2xl shadow-gruvbox-dark-bg-h/30 sm:p-8"
      >
        <div
          class="space-y-6 text-sm leading-7 text-gruvbox-dark-fg-2 sm:text-base"
        >
          <section>
            <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
              Information stored locally
            </h2>
            <p class="mt-2">
              CatTab stores settings such as theme, prompt, command history,
              categories, links, and optional hero image data in your browser's
              local storage on your device.
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
              Analytics and sharing
            </h2>
            <p class="mt-2">
              This hosted site does not use analytics, advertising trackers, or
              a user account system. CatTab does not sell or share your personal
              information.
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
              Clipboard access
            </h2>
            <p class="mt-2">
              Clipboard write access is used only when you explicitly trigger a
              copy action, such as copying a command from history.
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
              External links
            </h2>
            <p class="mt-2">
              CatTab can open external websites when you choose to run a search
              or open a saved link.
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">Contact</h2>
            <p class="mt-2">
              Questions about this policy can be sent through the project
              repository at
              <a
                href="https://github.com/wrathofrathma/newtab"
                target="_blank"
                rel="noreferrer"
                class="font-bold text-gruvbox-dark-aqua-1 hover:text-gruvbox-dark-aqua-0"
              >
                github.com/wrathofrathma/newtab
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
