<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(131,165,152,0.16),_transparent_40%),linear-gradient(180deg,var(--nt-surface-canvas-strong)_0%,var(--nt-surface-canvas)_38%,var(--nt-surface-canvas)_100%)] px-6 py-10 text-left text-gruvbox-dark-fg-1 sm:px-8 lg:px-12"
  >
    <div class="mx-auto flex w-full max-w-4xl flex-col gap-8">
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
            New Tab keeps your settings and command history in your browser so
            the page works like a local tool, not a hosted account service.
          </p>
        </div>

        <RouterLink
          to="/"
          class="rounded-full border border-gruvbox-dark-bg-3 bg-gruvbox-dark-bg-s px-4 py-2 text-sm font-bold text-gruvbox-dark-fg-1 transition hover:border-gruvbox-dark-aqua-1 hover:text-gruvbox-dark-fg-0"
        >
          Back to new tab
        </RouterLink>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <section
          class="rounded-2xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s/90 p-5 shadow-lg shadow-gruvbox-dark-bg-h/25"
        >
          <p
            class="text-xs uppercase tracking-[0.24em] text-gruvbox-dark-yellow-1"
          >
            Stored Locally
          </p>
          <p class="mt-3 text-sm leading-6 text-gruvbox-dark-fg-2">
            Theme, prompt, command history, layout, links, and optional hero
            image stay in your browser storage on this device.
          </p>
        </section>

        <section
          class="rounded-2xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s/90 p-5 shadow-lg shadow-gruvbox-dark-bg-h/25"
        >
          <p
            class="text-xs uppercase tracking-[0.24em] text-gruvbox-dark-blue-1"
          >
            No Analytics
          </p>
          <p class="mt-3 text-sm leading-6 text-gruvbox-dark-fg-2">
            The hosted site does not include analytics, advertising trackers, or
            a backend account system.
          </p>
        </section>

        <section
          class="rounded-2xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s/90 p-5 shadow-lg shadow-gruvbox-dark-bg-h/25"
        >
          <p
            class="text-xs uppercase tracking-[0.24em] text-gruvbox-dark-purple-1"
          >
            User-Initiated Actions
          </p>
          <p class="mt-3 text-sm leading-6 text-gruvbox-dark-fg-2">
            Clipboard writes only happen when you explicitly trigger copy
            actions, and external sites only open when you run commands or click
            links.
          </p>
        </section>
      </div>

      <div
        class="rounded-3xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-s/80 p-6 shadow-2xl shadow-gruvbox-dark-bg-h/30 sm:p-8"
      >
        <div
          class="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]"
        >
          <div class="space-y-6">
            <section>
              <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
                What the app stores
              </h2>
              <p class="mt-2 text-sm leading-7 text-gruvbox-dark-fg-2">
                New Tab stores settings in your browser's local storage so your
                prompt, search engine, history, categories, links, and visual
                preferences persist between sessions.
              </p>
            </section>

            <section>
              <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
                What leaves your browser
              </h2>
              <p class="mt-2 text-sm leading-7 text-gruvbox-dark-fg-2">
                Search commands and saved links navigate you to third-party
                sites such as Google, GitHub, YouTube, Reddit, or other
                destinations you choose. Those sites apply their own privacy
                policies once you leave New Tab.
              </p>
            </section>

            <section>
              <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
                Clipboard access
              </h2>
              <p class="mt-2 text-sm leading-7 text-gruvbox-dark-fg-2">
                Clipboard write access is used only when you explicitly copy a
                command from history. New Tab does not continuously read from or
                monitor your clipboard.
              </p>
            </section>

            <section>
              <h2 class="text-lg font-bold text-gruvbox-dark-fg-0">
                Remote code and accounts
              </h2>
              <p class="mt-2 text-sm leading-7 text-gruvbox-dark-fg-2">
                The app does not load remote executable code at runtime and does
                not require a user account, login, or cloud sync service to
                function.
              </p>
            </section>
          </div>

          <aside
            class="rounded-2xl border border-gruvbox-dark-bg-2 bg-gruvbox-dark-bg-0/60 p-5"
          >
            <h2
              class="text-sm font-bold uppercase tracking-[0.24em] text-gruvbox-dark-orange-1"
            >
              Summary
            </h2>
            <dl class="mt-4 space-y-4 text-sm">
              <div>
                <dt class="text-gruvbox-dark-fg-4">Personal accounts</dt>
                <dd class="mt-1 text-gruvbox-dark-fg-1">Not required</dd>
              </div>
              <div>
                <dt class="text-gruvbox-dark-fg-4">Analytics trackers</dt>
                <dd class="mt-1 text-gruvbox-dark-fg-1">Not included</dd>
              </div>
              <div>
                <dt class="text-gruvbox-dark-fg-4">Persistent storage</dt>
                <dd class="mt-1 text-gruvbox-dark-fg-1">
                  Local browser storage
                </dd>
              </div>
              <div>
                <dt class="text-gruvbox-dark-fg-4">Clipboard use</dt>
                <dd class="mt-1 text-gruvbox-dark-fg-1">Only on copy action</dd>
              </div>
              <div>
                <dt class="text-gruvbox-dark-fg-4">Third-party requests</dt>
                <dd class="mt-1 text-gruvbox-dark-fg-1">
                  Only when you open links or search externally
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
