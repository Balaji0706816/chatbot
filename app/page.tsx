// app/page.tsx

type HomeLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

async function getHomeLinks(): Promise<HomeLink[]> {
  const res = await fetch(
    // ⚠️ Use the RAW gist URL, not the normal gist page URL
    "https://gist.githubusercontent.com/Balaji0706816/9275ba3e824f0392de3828dff377e399/raw",
    { next: { revalidate: 60 } } // re-fetch every 60 seconds on the server
  );

  if (!res.ok) {
    console.error("Failed to fetch home links from Gist");
    return [];
  }

  return (await res.json()) as HomeLink[];
}

export default async function Home() {
  const homeLinks = await getHomeLinks();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <section className="w-full flex-1 flex flex-col items-center sm:items-start gap-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center sm:text-left">
            Hello, Next.js!
          </h1>


          <ul className="mt-8 w-full space-y-4">
            {homeLinks.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <h2 className="text-sm font-semibold mb-1">{item.title}</h2>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                  <p className="mt-2 text-[11px] text-zinc-500 underline">
                    Open link →
                  </p>
                </a>
              </li>
            ))}

            {homeLinks.length === 0 && (
              <li className="text-xs text-zinc-500">
                No links found. Check that your Gist JSON is valid and matches
                the expected structure.
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
