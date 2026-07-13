// app/dashboard/page.tsx
"use client";

import { useState } from "react";

type Lang = "en" | "ar";

type Contract = {
  symbol: string;
  strike: string;
  expiration: string;
  side: "CALL" | "PUT" | null;
  entry: string;
  tp: string;
  sl: string;
  notes: string;
};

const texts: Record<Lang, Record<string, string>> = {
  en: {
    title: "SPX Trading Dashboard",
    panel: "Dashboard Control Panel",
    symbol: "Symbol",
    symbolPlaceholder: "SPX / TSLA / QQQ",
    strike: "Strike",
    strikePlaceholder: "e.g. 255.00",
    expiration: "Expiration",
    entry: "Entry Price",
    entryPlaceholder: "e.g. 7.00",
    tp: "Take Profit (TP)",
    tpPlaceholder: "e.g. 12.00",
    sl: "Stop Loss (SL)",
    slPlaceholder: "e.g. 4.00",
    notes: "Notes",
    notesPlaceholder: "Write any notes",
    submit: "Submit Contract",
    botStart: "Start Bot",
    botStop: "Stop Bot",
    botRunning: "Bot Status: RUNNING",
    botStopped: "Bot Status: STOPPED",
    companies: "Saved Companies",
    addCompany: "Add Company",
    companyPlaceholder: "e.g. TSLA",
    previewTitle: "Contract Preview",
    previewEmpty: "Fill the form to preview the contract.",
    langLabel: "Language",
  },
  ar: {
    title: "لوحة تداول SPX",
    panel: "لوحة تحكم التداول",
    symbol: "الرمز",
    symbolPlaceholder: "SPX / TSLA / QQQ",
    strike: "سعر التنفيذ",
    strikePlaceholder: "مثال: 255.00",
    expiration: "تاريخ الانتهاء",
    entry: "سعر الدخول",
    entryPlaceholder: "مثال: 7.00",
    tp: "جني الأرباح (TP)",
    tpPlaceholder: "مثال: 12.00",
    sl: "إيقاف الخسارة (SL)",
    slPlaceholder: "مثال: 4.00",
    notes: "ملاحظات",
    notesPlaceholder: "اكتب أي ملاحظات",
    submit: "تقديم العقد",
    botStart: "تشغيل البوت",
    botStop: "إيقاف البوت",
    botRunning: "حالة البوت: يعمل",
    botStopped: "حالة البوت: متوقف",
    companies: "الشركات المحفوظة",
    addCompany: "حفظ شركة",
    companyPlaceholder: "مثال: TSLA",
    previewTitle: "معاينة العقد",
    previewEmpty: "املأ الحقول لمعاينة العقد قبل الإرسال.",
    langLabel: "اللغة",
  },
};

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = texts[lang];

  const [contract, setContract] = useState<Contract>({
    symbol: "",
    strike: "",
    expiration: "",
    side: null,
    entry: "",
    tp: "",
    sl: "",
    notes: "",
  });

  const [botRunning, setBotRunning] = useState(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState("");

  const isRtl = lang === "ar";

  const handleChange = (field: keyof Contract, value: string) => {
    setContract((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // هنا تربط مع الباك أو البوت لاحقًا
    console.log("Submitting contract:", contract);
    alert("Contract submitted (placeholder).");
  };

  const toggleBot = () => {
    setBotRunning((prev) => !prev);
  };

  const addCompany = () => {
    const trimmed = companyInput.trim();
    if (!trimmed) return;
    if (!companies.includes(trimmed)) {
      setCompanies((prev) => [...prev, trimmed]);
    }
    setCompanyInput("");
  };

  const directionClass = isRtl ? "text-right" : "text-left";
  const flexDir = isRtl ? "flex-row-reverse" : "flex-row";

  return (
    <main className="dashboard-shell">
      <header className={`mb-4 flex ${flexDir} items-center justify-between`}>
        <div className={directionClass}>
          <h1 className="text-xl font-semibold text-yellow-400">
            {t.title}
          </h1>
          <p className="text-xs text-slate-400">
            Hybrid dashboard · Contracts · Bot control · Company saving
          </p>
        </div>
        <div className={`flex ${flexDir} items-center gap-2`}>
          <span className="badge">{t.langLabel}</span>
          <button
            className="btn btn-secondary"
            onClick={() => setLang("en")}
            style={{ opacity: lang === "en" ? 1 : 0.5 }}
          >
            EN
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setLang("ar")}
            style={{ opacity: lang === "ar" ? 1 : 0.5 }}
          >
            AR
          </button>
        </div>
      </header>

      {/* لوحة التحكم الرئيسية */}
      <section className="card mb-4">
        <div className="card-header">
          <span className="card-title">{t.panel}</span>
          <span className="badge">
            {botRunning ? t.botRunning : t.botStopped}
          </span>
        </div>

        <div className={`grid-2 ${directionClass}`}>
          <div>
            <label className="input-label">{t.symbol}</label>
            <input
              className="input"
              placeholder={t.symbolPlaceholder}
              value={contract.symbol}
              onChange={(e) => handleChange("symbol", e.target.value)}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
          <div>
            <label className="input-label">{t.strike}</label>
            <input
              className="input"
              placeholder={t.strikePlaceholder}
              value={contract.strike}
              onChange={(e) => handleChange("strike", e.target.value)}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className={`grid-3 mt-3 ${directionClass}`}>
          <div>
            <label className="input-label">{t.expiration}</label>
            <input
              type="date"
              className="input"
              value={contract.expiration}
              onChange={(e) => handleChange("expiration", e.target.value)}
            />
          </div>
          <div>
            <label className="input-label">Side</label>
            <div className={`flex ${flexDir} gap-2`}>
              <button
                className="btn btn-primary"
                style={{
                  opacity: contract.side === "CALL" ? 1 : 0.6,
                }}
                onClick={() => handleChange("side", "CALL")}
              >
                CALL
              </button>
              <button
                className="btn btn-danger"
                style={{
                  opacity: contract.side === "PUT" ? 1 : 0.6,
                }}
                onClick={() => handleChange("side", "PUT")}
              >
                PUT
              </button>
            </div>
          </div>
          <div>
            <label className="input-label">{t.entry}</label>
            <input
              className="input"
              placeholder={t.entryPlaceholder}
              value={contract.entry}
              onChange={(e) => handleChange("entry", e.target.value)}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className={`grid-2 mt-3 ${directionClass}`}>
          <div>
            <label className="input-label">{t.tp}</label>
            <input
              className="input"
              placeholder={t.tpPlaceholder}
              value={contract.tp}
              onChange={(e) => handleChange("tp", e.target.value)}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
          <div>
            <label className="input-label">{t.sl}</label>
            <input
              className="input"
              placeholder={t.slPlaceholder}
              value={contract.sl}
              onChange={(e) => handleChange("sl", e.target.value)}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className={`mt-3 ${directionClass}`}>
          <label className="input-label">{t.notes}</label>
          <textarea
            className="input"
            rows={3}
            placeholder={t.notesPlaceholder}
            value={contract.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            dir={isRtl ? "rtl" : "ltr"}
          />
        </div>

        <div className={`mt-4 flex ${flexDir} gap-2`}>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {t.submit}
          </button>
          <button className="btn btn-secondary" onClick={toggleBot}>
            {botRunning ? t.botStop : t.botStart}
          </button>
        </div>
      </section>

      {/* حفظ الشركات + معاينة العقد */}
      <section className={`grid-2 gap-4 ${directionClass}`}>
        {/* حفظ الشركات */}
        <div className="card">
          <div className="card-header">
            <span className="section-title">{t.companies}</span>
            <span className="badge">
              {companies.length} {lang === "ar" ? "شركة" : "symbols"}
            </span>
          </div>
          <div className={directionClass}>
            <label className="input-label">{t.addCompany}</label>
            <div className={`flex ${flexDir} gap-2`}>
              <input
                className="input"
                placeholder={t.companyPlaceholder}
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                dir={isRtl ? "rtl" : "ltr"}
              />
              <button className="btn btn-secondary" onClick={addCompany}>
                +
              </button>
            </div>
            <ul className="mt-3 text-xs text-slate-300 space-y-1">
              {companies.length === 0 && (
                <li className="text-slate-500">
                  {lang === "ar"
                    ? "لا توجد شركات محفوظة بعد."
                    : "No saved companies yet."}
                </li>
              )}
              {companies.map((c) => (
                <li
                  key={c}
                  className="flex items-center justify-between border border-slate-700 rounded-md px-2 py-1"
                >
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* معاينة العقد */}
        <div className="card">
          <div className="card-header">
            <span className="section-title">{t.previewTitle}</span>
          </div>
          <div className={directionClass}>
            {contract.symbol && contract.side && contract.expiration ? (
              <div className="text-xs space-y-1 text-slate-200">
                <p>
                  {lang === "ar" ? "الرمز:" : "Symbol:"} {contract.symbol}
                </p>
                <p>
                  {lang === "ar" ? "النوع:" : "Side:"} {contract.side}
                </p>
                <p>
                  {lang === "ar" ? "سعر التنفيذ:" : "Strike:"}{" "}
                  {contract.strike || "-"}
                </p>
                <p>
                  {lang === "ar" ? "تاريخ الانتهاء:" : "Expiration:"}{" "}
                  {contract.expiration}
                </p>
                <p>
                  {lang === "ar" ? "سعر الدخول:" : "Entry:"}{" "}
                  {contract.entry || "-"}
                </p>
                <p>
                  {lang === "ar" ? "جني الأرباح:" : "TP:"}{" "}
                  {contract.tp || "-"}
                </p>
                <p>
                  {lang === "ar" ? "إيقاف الخسارة:" : "SL:"}{" "}
                  {contract.sl || "-"}
                </p>
                {contract.notes && (
                  <p>
                    {lang === "ar" ? "ملاحظات:" : "Notes:"} {contract.notes}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">{t.previewEmpty}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
