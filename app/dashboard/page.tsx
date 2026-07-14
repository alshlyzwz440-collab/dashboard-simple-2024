"use client";

import { useState } from "react";

type Lang = "ar" | "en";
type Side = "CALL" | "PUT";

const labels = {
  ar: {
    title: "لوحة تحكم SPX TRADING",
    botStatus: "حالة البوت",
    botRunning: "البوت يعمل",
    botStopped: "البوت متوقف",
    symbol: "الرمز",
    expiration: "تاريخ الانتهاء",
    entryPrice: "سعر الدخول",
    side: "نوع العقد",
    tp: "جني الأرباح",
    sl: "إيقاف الخسارة",
    notes: "ملاحظات",
    startBot: "تشغيل البوت",
    stopBot: "إيقاف البوت",
    savedCompanies: "الشركات المحفوظة",
    searchCompany: "ابحث عن شركة...",
    contractPreview: "معاينة العقد",
    entryNames: "أسماء الدخول لمعاينة العقد",
    call: "شراء (CALL)",
    put: "بيع (PUT)",
    langAr: "عربي",
    langEn: "إنجليزي",
  },
  en: {
    title: "SPX TRADING Control Panel",
    botStatus: "Bot Status",
    botRunning: "Bot Running",
    botStopped: "Bot Stopped",
    symbol: "Symbol",
    expiration: "Expiration Date",
    entryPrice: "Entry Price",
    side: "Contract Type",
    tp: "Take Profit",
    sl: "Stop Loss",
    notes: "Notes",
    startBot: "Start Bot",
    stopBot: "Stop Bot",
    savedCompanies: "Saved Companies",
    searchCompany: "Search company...",
    contractPreview: "Contract Preview",
    entryNames: "Entry names for preview",
    call: "CALL",
    put: "PUT",
    langAr: "AR",
    langEn: "EN",
  },
};

const initialCompanies = ["SPX", "TSLA", "QQQ", "AAPL", "MSFT", "NVDA", "META"];

export default function Dashboard() {
  const [lang, setLang] = useState<Lang>("ar");
  const [botRunning, setBotRunning] = useState(false);
  const [side, setSide] = useState<Side>("CALL");

  const [symbol, setSymbol] = useState("SPX");
  const [expiration, setExpiration] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [notes, setNotes] = useState("");
  const [entryNames, setEntryNames] = useState("");

  const [companySearch, setCompanySearch] = useState("");
  const [companies, setCompanies] = useState<string[]>(initialCompanies);

  const t = labels[lang];

  const filteredCompanies = companies.filter((c) =>
    c.toLowerCase().includes(companySearch.toLowerCase())
  );

  const handleAddCompany = () => {
    const name = companySearch.trim().toUpperCase();
    if (!name) return;
    if (!companies.includes(name)) {
      setCompanies((prev) => [...prev, name]);
    }
  };

  const handleStartBot = () => {
    setBotRunning(true);
  };

  const handleStopBot = () => {
    setBotRunning(false);
  };

  const isRTL = lang === "ar";

  return (
    <div
      className={`min-h-screen bg-[#1c1c1e] flex items-center justify-center p-6 ${
        isRTL ? "direction-rtl" : "direction-ltr"
      }`}
    >
      <div className="w-full max-w-md bg-[#2a2a2d] rounded-xl shadow-xl p-6 space-y-6">

        {/* اللغة + حالة البوت */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <button
              className={`lang-btn ${lang === "ar" ? "lang-btn-active" : ""}`}
              onClick={() => setLang("ar")}
            >
              {t.langAr}
            </button>
            <button
              className={`lang-btn ${lang === "en" ? "lang-btn-active" : ""}`}
              onClick={() => setLang("en")}
            >
              {t.langEn}
            </button>
          </div>
          <div className="text-sm text-gray-300">
            {t.botStatus}:{" "}
            <span className={botRunning ? "text-green-400" : "text-red-400"}>
              {botRunning ? t.botRunning : t.botStopped}
            </span>
          </div>
        </div>

        {/* العنوان */}
        <h1 className="text-center text-xl font-bold text-white">
          {t.title}
        </h1>

        {/* الرمز */}
        <div className="field-block">
          <label className="field-label">{t.symbol}</label>
          <input
            type="text"
            className="input-purple"
            placeholder="SPX / TSLA / QQQ"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        {/* تاريخ الانتهاء */}
        <div className="field-block">
          <label className="field-label">{t.expiration}</label>
          <input
            type="date"
            className="input-purple"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
        </div>

        {/* سعر الدخول */}
        <div className="field-block">
          <label className="field-label">{t.entryPrice}</label>
          <input
            type="number"
            className="input-purple"
            placeholder="7.00"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
          />
        </div>

        {/* نوع العقد */}
        <div className="field-block">
          <label className="field-label">{t.side}</label>
          <div className="flex gap-3">
            <button
              className={`btn-call ${side === "CALL" ? "btn-selected" : ""}`}
              onClick={() => setSide("CALL")}
            >
              {t.call}
            </button>
            <button
              className={`btn-put ${side === "PUT" ? "btn-selected" : ""}`}
              onClick={() => setSide("PUT")}
            >
              {t.put}
            </button>
          </div>
        </div>

        {/* جني الأرباح */}
        <div className="field-block">
          <label className="field-label">{t.tp}</label>
          <input
            type="number"
            className="input-purple"
            placeholder="12.00"
            value={tp}
            onChange={(e) => setTp(e.target.value)}
          />
        </div>

        {/* إيقاف الخسارة */}
        <div className="field-block">
          <label className="field-label">{t.sl}</label>
          <input
            type="number"
            className="input-purple"
            placeholder="4.00"
            value={sl}
            onChange={(e) => setSl(e.target.value)}
          />
        </div>

        {/* ملاحظات */}
        <div className="field-block">
          <label className="field-label">{t.notes}</label>
          <textarea
            className="input-purple h-24"
            placeholder={lang === "ar" ? "اكتب أي ملاحظات هنا" : "Write any notes here"}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* الشركات المحفوظة */}
        <div className="field-block">
          <label className="field-label">{t.savedCompanies}</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="input-purple"
              placeholder={t.searchCompany}
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
            />
            <button className="btn-add-company" onClick={handleAddCompany}>
              +
            </button>
          </div>
          <div className="company-list">
            {filteredCompanies.map((c) => (
              <span key={c} className="company-pill">
                {c}
              </span>
            ))}
            {filteredCompanies.length === 0 && (
              <span className="text-xs text-gray-400">
                {lang === "ar" ? "لا توجد شركات مطابقة" : "No matching companies"}
              </span>
            )}
          </div>
        </div>

        {/* أسماء الدخول لمعاينة العقد */}
        <div className="field-block">
          <label className="field-label">{t.entryNames}</label>
          <input
            type="text"
            className="input-purple"
            placeholder={lang === "ar" ? "مثال: دخول 1، دخول 2" : "Ex: Entry 1, Entry 2"}
            value={entryNames}
            onChange={(e) => setEntryNames(e.target.value)}
          />
        </div>

        {/* معاينة العقد */}
        <div className="field-block">
          <label className="field-label">{t.contractPreview}</label>
          <div className="contract-card">
            <div className="contract-header">
              <span className="contract-title">
                {symbol || "SPX"}
              </span>
              <span
                className={
                  side === "CALL" ? "contract-side-call" : "contract-side-put"
                }
              >
                {side === "CALL" ? t.call : t.put}
              </span>
            </div>
            <div className="contract-row">
              <span>{lang === "ar" ? "تاريخ الانتهاء" : "Expiration"}</span>
              <span>{expiration || (lang === "ar" ? "غير محدد" : "Not set")}</span>
            </div>
            <div className="contract-row">
              <span>{lang === "ar" ? "سعر الدخول" : "Entry"}</span>
              <span>{entryPrice || "—"}</span>
            </div>
            <div className="contract-row">
              <span>{lang === "ar" ? "جني الأرباح" : "TP"}</span>
              <span>{tp || "—"}</span>
            </div>
            <div className="contract-row">
              <span>{lang === "ar" ? "إيقاف الخسارة" : "SL"}</span>
              <span>{sl || "—"}</span>
            </div>
            <div className="contract-row">
              <span>{lang === "ar" ? "أسماء الدخول" : "Entries"}</span>
              <span>{entryNames || "—"}</span>
            </div>
            <div className="contract-notes">
              <span>{lang === "ar" ? "ملاحظات:" : "Notes:"}</span>
              <p>{notes || (lang === "ar" ? "لا توجد ملاحظات" : "No notes")}</p>
            </div>
          </div>
        </div>

        {/* أزرار البوت */}
        <div className="flex gap-3">
          <button className="btn-start" onClick={handleStartBot}>
            {t.startBot}
          </button>
          <button className="btn-stop" onClick={handleStopBot}>
            {t.stopBot}
          </button>
        </div>
      </div>
    </div>
  );
}
