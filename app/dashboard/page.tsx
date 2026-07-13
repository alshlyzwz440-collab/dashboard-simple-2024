"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Lang = "en" | "ar";

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("en");
  const isRtl = lang === "ar";

  const [symbol, setSymbol] = useState("");
  const [strike, setStrike] = useState("");
  const [expiration, setExpiration] = useState<Date | null>(null);
  const [side, setSide] = useState<"CALL" | "PUT" | null>(null);
  const [entry, setEntry] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [notes, setNotes] = useState("");

  const [botRunning, setBotRunning] = useState(false);

  const [companies, setCompanies] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState("");

  const t = {
    en: {
      title: "SPX TRADING",
      symbol: "Symbol",
      strike: "Strike",
      expiration: "Expiration",
      entry: "Entry Price",
      tp: "Take Profit",
      sl: "Stop Loss",
      notes: "Notes",
      submit: "Submit Contract",
      companies: "Saved Companies",
      addCompany: "Add Company",
      botRunning: "Bot Status: RUNNING",
      botStopped: "Bot Status: STOPPED",
      preview: "Contract Preview",
      emptyPreview: "Fill the fields to preview the contract.",
      lang: "Language",
    },
    ar: {
      title: "SPX TRADING",
      symbol: "الرمز",
      strike: "سعر التنفيذ",
      expiration: "تاريخ الانتهاء",
      entry: "سعر الدخول",
      tp: "جني الأرباح",
      sl: "إيقاف الخسارة",
      notes: "ملاحظات",
      submit: "إرسال العقد",
      companies: "الشركات المحفوظة",
      addCompany: "حفظ شركة",
      botRunning: "حالة البوت: يعمل",
      botStopped: "حالة البوت: متوقف",
      preview: "معاينة العقد",
      emptyPreview: "املأ الحقول لمعاينة العقد.",
      lang: "اللغة",
    },
  }[lang];

  const addCompanyFn = () => {
    const c = companyInput.trim();
    if (!c) return;
    if (!companies.includes(c)) setCompanies([...companies, c]);
    setCompanyInput("");
  };

  return (
    <main
      className="min-h-screen p-6"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ background: "#000", color: "#fff" }}
    >
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-400">{t.title}</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setLang("en")}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
            style={{ opacity: lang === "en" ? 1 : 0.5 }}
          >
            EN
          </button>
          <button
            onClick={() => setLang("ar")}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
            style={{ opacity: lang === "ar" ? 1 : 0.5 }}
          >
            AR
          </button>
        </div>
      </header>

      {/* BOT STATUS */}
      <div className="mb-4">
        <span
          className="px-3 py-1 rounded text-sm font-bold"
          style={{
            color: botRunning ? "#00ff80" : "#ff0033",
          }}
        >
          {botRunning ? t.botRunning : t.botStopped}
        </span>
      </div>

      {/* FORM */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        {/* SYMBOL */}
        <div>
          <label className="text-sm text-purple-300">{t.symbol}</label>
          <input
            className="input"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        {/* STRIKE */}
        <div>
          <label className="text-sm text-purple-300">{t.strike}</label>
          <input
            className="input"
            value={strike}
            onChange={(e) => setStrike(e.target.value)}
          />
        </div>

        {/* EXPIRATION */}
        <div>
          <label className="text-sm text-purple-300">{t.expiration}</label>
          <DatePicker
            selected={expiration}
            onChange={(date) => setExpiration(date)}
            className="input"
            calendarStartDay={isRtl ? 6 : 0}
            locale={isRtl ? "ar" : "en"}
            placeholderText={isRtl ? "اختر التاريخ" : "Select date"}
          />
        </div>

        {/* SIDE */}
        <div>
          <label className="text-sm text-purple-300">Side</label>
          <div className="flex gap-3 mt-2">
            <button
              className={`btn-call ${side === "CALL" ? "active" : ""}`}
              onClick={() => setSide("CALL")}
            >
              CALL
            </button>
            <button
              className={`btn-put ${side === "PUT" ? "active" : ""}`}
              onClick={() => setSide("PUT")}
            >
              PUT
            </button>
          </div>
        </div>

        {/* ENTRY */}
        <div>
          <label className="text-sm text-purple-300">{t.entry}</label>
          <input
            className="input"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </div>

        {/* TP */}
        <div>
          <label className="text-sm text-purple-300">{t.tp}</label>
          <input
            className="input"
            value={tp}
            onChange={(e) => setTp(e.target.value)}
          />
        </div>

        {/* SL */}
        <div>
          <label className="text-sm text-purple-300">{t.sl}</label>
          <input
            className="input"
            value={sl}
            onChange={(e) => setSl(e.target.value)}
          />
        </div>

        {/* NOTES */}
        <div className="col-span-2">
          <label className="text-sm text-purple-300">{t.notes}</label>
          <textarea
            className="input"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </section>

      {/* BOT BUTTONS */}
      <div className="flex gap-4 mb-6">
        {botRunning ? (
          <button className="btn-stop" onClick={() => setBotRunning(false)}>
            STOP BOT
          </button>
        ) : (
          <button className="btn-start" onClick={() => setBotRunning(true)}>
            START BOT
          </button>
        )}
      </div>

      {/* COMPANIES */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-purple-300 mb-2">
          {t.companies}
        </h2>

        <div className="flex gap-3 mb-3">
          <input
            className="input"
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
            placeholder={isRtl ? "اكتب الشركة" : "Enter company"}
          />
          <button className="btn-start" onClick={addCompanyFn}>
            +
          </button>
        </div>

        <ul className="space-y-2">
          {companies.map((c) => (
            <li
              key={c}
              className="px-3 py-2 bg-gray-900 rounded border border-purple-700 hover:bg-gray-800"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* PREVIEW */}
      <section className="card">
        <h2 className="text-lg font-bold text-purple-300 mb-3">{t.preview}</h2>

        {!symbol || !side || !expiration ? (
          <p className="text-gray-500">{t.emptyPreview}</p>
        ) : (
          <div className="space-y-2 text-sm">
            <p>Symbol: {symbol}</p>
            <p>Side: {side}</p>
            <p>Strike: {strike}</p>
            <p>Expiration: {expiration?.toLocaleDateString()}</p>
            <p>Entry: {entry}</p>
            <p>TP: {tp}</p>
            <p>SL: {sl}</p>
            <p>Notes: {notes}</p>
          </div>
        )}
      </section>
    </main>
  );
}
