export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-teal-dark mb-4">Proyecto Raiquet MVP</h1>
      <p className="text-xl text-teal-primary mb-8">El marketplace hiperlocal</p>
      
      <div className="flex gap-4">
        <button className="bg-teal-primary text-white px-6 py-2 rounded-md hover:bg-teal-dark transition">
          Comprar
        </button>
        <button className="bg-amber text-white px-6 py-2 rounded-md hover:opacity-90 transition">
          Vender
        </button>
      </div>
    </main>
  );
}
