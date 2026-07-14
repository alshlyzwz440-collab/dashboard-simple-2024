"use client";

// react-datepicker installed

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Lang = "en" | "ar";

type Company = {
  name: string;
};

export default function DashboardPage() {
  const [lang, setLang] = useState<Lang>("ar");
  const [symbol, setSymbol] = useState("SPX");
  const [strike, setStrike] = useState("255.00");
  const [expiration, setExpiration] = useState<Date | null>(null);
  const [contractType, setContractType] = useState<"CALL" | "PUT">("CALL");
  const [entryPrice, setEntryPrice] = useState("7.00");
  const [takeProfit, setTakeProfit] = useState("12.00");
  const [stopLoss, setStopLoss] = useState("4.00");
  const [notes, setNotes] = useState("");

  const [companyInput, setCompanyInput] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  // تحميل الشركات من التخزين المحلي
  useEffect(() => {
    const stored = localStorage.getItem("saved_companies");
    if (stored) {
      try {
        const parsed: Company[] = JSON.parse(stored);
        setCompanies(parsed);
      } catch {
        setCompanies([]);
      }
    }
  }, []);

  // فلترة الشركات حسب أول حرف
  useEffect(() => {
    if (!companyInput) {
      setFilteredCompanies([]);
      return;
    }
    const lower = companyInput.toLowerCase();
    setFilteredCompanies(
      companies.filter((c) => c.name.toLowerCase().startsWith(lower))
    );
  }, [companyInput, companies]);

  const directionClass = lang === "ar" ? "direction-rtl" : "direction-ltr";

  const handleAddCompany = () => {
    const trimmed = companyInput.trim();
    if (!trimmed) return;

    if (companies.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setCompanyInput("");
      return;
    }

    const updated = [...companies, { name: trimmed }];
    setCompanies(updated);
    localStorage.setItem("saved_companies", JSON.stringify(updated));
    setCompanyInput("");
  };

  const handleSelectCompany = (name: string) => {
    setCompanyInput(name);
    setFilteredCompanies([]);
  };

  const handleSubmitContract = () => {
    console.log("Contract Submitted:", {
      symbol,
      strike,
      expiration,
      contractType,
      entryPrice,
      takeProfit,
      stopLoss,
      notes,
    });
  };

  const handleToggleBot = () => {
    console.log("Bot toggled");
  };

  return (
    <div className={`min-h-screen bg-[#0f0f11] text-white ${directionClass}`}>
      <div className="max-w-xl mx-auto px-4 py-8">

        {/* عنوان القروب */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">SPX TRADING</h1>
          <p className="text-sm text-gray-400 mt-1">Dashboard Control Panel</p>
        </div>

        {/* زر اللغة */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            className={`lang-btn ${lang === "ar" ? "lang-btn-active" : ""}`}
            onClick={() => setLang("ar")}
          >
            عربي
          </button>
          <button
            className={`lang-btn ${lang === "en" ? "lang-btn-active" : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>

        {/* الكارد */}
        <div className="contract-card">

          {/* الرمز */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "الرمز" : "Symbol"}
            </label>
            <input
              className="input-purple"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="SPX / TSLA / QQQ"
            />
          </div>

          {/* اسم الشركة */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "اسم الشركة" : "Company Name"}
            </label>
            <input
              className="input-purple"
              value={companyInput}
              onChange={(e) => setCompanyInput(e.target.value)}
              placeholder={lang === "ar" ? "اكتب اسم الشركة" : "Type company name"}
            />

            {filteredCompanies.length > 0 && (
              <div className="company-list">
                {filteredCompanies.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className="company-pill"
                    onClick={() => handleSelectCompany(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              className="btn-add-company"
              onClick={handleAddCompany}
            >
              {lang === "ar" ? "حفظ الشركة" : "Save Company"}
            </button>
          </div>

          {/* Strike */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "سعر التنفيذ (Strike)" : "Strike"}
            </label>
            <input
              className="input-purple"
              value={strike}
              onChange={(e) => setStrike(e.target.value)}
            />
          </div>

          {/* التقويم */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "تاريخ الانتهاء" : "Expiration"}
            </label>

            <DatePicker
              selected={expiration}
              onChange={(date) => setExpiration(date)}
              className="input-purple"
              dateFormat="yyyy-MM-dd"
              placeholderText={lang === "ar" ? "اختر التاريخ" : "Select date"}
              locale={lang === "ar" ? "ar" : "en"}
            />
          </div>

          {/* نوع العقد */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "نوع الخيار" : "Contract Type"}
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                className={`btn-call ${contractType === "CALL" ? "btn-selected" : ""}`}
                onClick={() => setContractType("CALL")}
              >
                {lang === "ar" ? "CALL (شراء)" : "CALL (Buy)"}
              </button>

              <button
                type="button"
                className={`btn-put ${contractType === "PUT" ? "btn-selected" : ""}`}
                onClick={() => setContractType("PUT")}
              >
                {lang === "ar" ? "PUT (بيع)" : "PUT (Sell)"}
              </button>
            </div>
          </div>

          {/* الأسعار */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "سعر الدخول" : "Entry Price"}
            </label>
            <input
              className="input-purple"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
            />
          </div>

          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "هدف الربح (TP)" : "Take Profit (TP)"}
            </label>
            <input
              className="input-purple"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>

          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "إيقاف الخسارة (SL)" : "Stop Loss (SL)"}
            </label>
            <input
              className="input-purple"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
          </div>

          {/* ملاحظات */}
          <div className="field-block">
            <label className="field-label">
              {lang === "ar" ? "ملاحظات" : "Notes"}
            </label>
            <textarea
              className="input-purple"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* الأزرار */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="btn-start"
              onClick={handleSubmitContract}
            >
              {lang === "ar" ? "إرسال العقد" : "Submit Contract"}
            </button>

            <button
              type="button"
              className="btn-stop"
              onClick={handleToggleBot}
            >
              {lang === "ar" ? "تشغيل / إيقاف البوت" : "Start / Stop Bot"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
