"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  // ============================
  // حفظ الشركات تلقائيًا
  // ============================
  const [symbol, setSymbol] = useState("");
  const [savedSymbols, setSavedSymbols] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("symbols") || "[]");
    setSavedSymbols(stored);
  }, []);

  const handleSymbolChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSymbol(value);

    if (value.length > 1 && !savedSymbols.includes(value)) {
      const updated = [...savedSymbols, value];
      setSavedSymbols(updated);
      localStorage.setItem("symbols", JSON.stringify(updated));
    }
  };

  // ============================
  // باقي الحقول
  // ============================
  const [strike, setStrike] = useState("");
  const [expiration, setExpiration] = useState("");
  const [direction, setDirection] = useState("CALL");
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [notes, setNotes] = useState("");

  // ============================
  // إرسال العقد للبوت (لاحقًا)
  // ============================
  const sendToBot = () => {
    alert("سيتم ربط هذا الزر بالبوت لاحقًا");
  };

  // ============================
  // توليد صورة العقد (لاحقًا)
  // ============================
  const generateImage = () => {
    alert("سيتم توليد صورة العقد الداكن لاحقًا من السيرفر");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-6 flex flex-col items-center">

      {/* عنوان الداشبورد */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Control Panel</h1>

      {/* ============================
          واجهة الداشبورد الأساسية
      ============================ */}
      <div className="w-full max-w-xl bg-neutral-800 p-5 rounded-xl border border-neutral-700 shadow-lg space-y-4">

        {/* Symbol */}
        <div>
          <label className="text-sm text-gray-300">Symbol</label>
          <input
            type="text"
            list="symbols"
            placeholder="SPX / TSLA / QQQ"
            value={symbol}
            onChange={handleSymbolChange}
            className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
          />
          <datalist id="symbols">
            {savedSymbols.map((s, i) => (
              <option key={i} value={s} />
            ))}
          </datalist>
        </div>

        {/* Strike */}
        <div>
          <label className="text-sm text-gray-300">Strike</label>
          <input
            type="number"
            placeholder="3900.00"
            value={strike}
            onChange={(e) => setStrike(e.target.value)}
            className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
          />
        </div>

        {/* Expiration */}
        <div>
          <label className="text-sm text-gray-300">Expiration</label>
          <input
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
          />
        </div>

        {/* CALL / PUT */}
        <div className="flex gap-3">
          <button
            onClick={() => setDirection("CALL")}
            className={`flex-1 p-2 rounded-md border ${
              direction === "CALL"
                ? "bg-green-600 border-green-700"
                : "bg-neutral-900 border-neutral-700"
            }`}
          >
            CALL
          </button>

          <button
            onClick={() => setDirection("PUT")}
            className={`flex-1 p-2 rounded-md border ${
              direction === "PUT"
                ? "bg-red-600 border-red-700"
                : "bg-neutral-900 border-neutral-700"
            }`}
          >
            PUT
          </button>
        </div>

        {/* Entry */}
        <div>
          <label className="text-sm text-gray-300">Entry Price</label>
          <input
            type="number"
            placeholder="3.50"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
          />
        </div>

        {/* TP / SL */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm text-gray-300">Take Profit (%)</label>
            <input
              type="number"
              placeholder="20.00"
              value={tp}
              onChange={(e) => setTp(e.target.value)}
              className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm text-gray-300">Stop Loss (%)</label>
            <input
              type="number"
              placeholder="40.00"
              value={sl}
              onChange={(e) => setSl(e.target.value)}
              className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm text-gray-300">Notes</label>
          <textarea
            placeholder="Write any notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 mt-1 bg-neutral-900 border border-neutral-700 rounded-md text-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={sendToBot}
            className="flex-1 p-3 bg-yellow-600 hover:bg-yellow-700 rounded-md font-bold"
          >
            Submit Contract
          </button>

          <button
            onClick={generateImage}
            className="flex-1 p-3 bg-red-600 hover:bg-red-700 rounded-md font-bold"
          >
            Generate Image
          </button>
        </div>
      </div>

      {/* ============================
          عرض العقد داخل الداشبورد
      ============================ */}
      <div className="w-full max-w-xl mt-8 bg-neutral-800 p-4 rounded-xl border border-neutral-700">
        <h2 className="text-xl font-bold mb-3">Preview Contract</h2>

        <div className="text-sm space-y-2">
          <p>Symbol: {symbol || "—"}</p>
          <p>Strike: {strike || "—"}</p>
          <p>Expiration: {expiration || "—"}</p>
          <p>Direction: {direction}</p>
          <p>Entry: {entry || "—"}</p>
          <p>TP: {tp || "—"}</p>
          <p>SL: {sl || "—"}</p>
          <p>Notes: {notes || "لا توجد ملاحظات"}</p>
        </div>
      </div>
    </div>
  );
}
