export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl shadow-black/10 -mt-16 relative z-10">
      <form method="GET" action="/" className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
        <input
          type="text"
          name="postcode"
          placeholder="Enter your postcode (e.g., GL50 2PR)"
          defaultValue={defaultValue}
          required
          className="flex-1 px-6 py-4 text-base border-2 border-border rounded-lg transition-all focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10"
        />
        <button
          type="submit"
          className="px-10 py-4 bg-gold text-white rounded-lg font-semibold whitespace-nowrap transition-all hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30"
        >
          Search
        </button>
      </form>
    </div>
  );
}
