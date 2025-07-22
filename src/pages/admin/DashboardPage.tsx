export default function DashboardPage() {
  return (
    <div className="px-4 py-6 flex flex-col items-center text-center space-y-6">

      {/* 🧾 Tarjeta de información */}
      <div className="bg-white border border-gray-300 p-6 w-full max-w-3xl">
        <h2 className="text-xl font-bold text-rojo uppercase tracking-wide mb-2">
          Panel de administración
        </h2>
        <p className="text-sm text-gray-700">
          Desde aquí podrás gestionar productos, pedidos y usuarios del catálogo.
        </p>
      </div>

      {/* 🔥 Video realista fuera de la tarjeta */}
      <video
        src="/videos/video de prueba.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="rounded shadow w-full max-w-3xl border"
      />
    </div>
  );
}
