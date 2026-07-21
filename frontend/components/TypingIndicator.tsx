export default function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="rounded-xl bg-zinc-900 px-5 py-4">

        <div className="flex gap-2">

          <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:.2s]"></span>
          <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:.4s]"></span>

        </div>

      </div>

    </div>
  );
}