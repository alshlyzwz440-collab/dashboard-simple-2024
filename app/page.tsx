export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div
        className="p-8 rounded-xl border border-[#FFD700] text-center"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#FFD700" }}>
          SPX TRADING
        </h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          لوحة تداول فاخرة — إدارة العقود، الصفقات، الملاحظات، الصور، والتقارير
          في مكان واحد وبأسلوب احترافي بدون لخبطة.
        </p>

        <a
          href="/dashboard"
          className="block bg-yellow-600 hover:bg-yellow-700 transition p-3 rounded-lg font-bold"
        >
          دخول لوحة التحكم
        </a>
      </div>
    </div>
  );
}
