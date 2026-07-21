export default function WelcomeScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      <h1 className="mb-4 text-5xl">
        ⚖️
      </h1>

      <h2 className="text-3xl font-bold">
        Indian Legal AI
      </h2>

      <p className="mt-4 max-w-lg text-zinc-400">
        Ask questions about Indian law, legal procedures,
        property disputes, contracts, marriage, consumer rights,
        labour law, taxation and more.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-zinc-900 p-4">
          Explain bail procedure
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          How to register a company?
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          Divorce procedure
        </div>

        <div className="rounded-xl bg-zinc-900 p-4">
          Property dispute
        </div>

      </div>

    </div>
  );
}