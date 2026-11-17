function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-4 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Rymoskop</h1>
      <p className="text-lg text-slate-700">
        Wklej polski tekst piosenki albo wiersza, a Rymoskop pokaże, jak brzmi
        i jak się rymuje: transkrypcję fonetyczną, sylaby, akcenty i rodziny
        rymów.
      </p>
      <label htmlFor="lyrics" className="font-medium">
        Tekst do analizy
      </label>
      <textarea
        id="lyrics"
        rows={12}
        placeholder="Wklej tutaj tekst…"
        className="w-full rounded-md border border-slate-300 p-3 font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      />
    </main>
  )
}

export default App
