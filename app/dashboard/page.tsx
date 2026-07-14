"use client";

// react-datepicker installed

import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import en from "date-fns/locale/en-US";

registerLocale("ar", ar);
registerLocale("en", en);

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

  const [showPreview, setShowPreview] = useState(false);

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
    setShowPreview(true);
  };

  const handleToggleBot = () => {
    console.log("Bot toggled");
  };

  return (
    <div className={`min-h-screen bg-black text-white ${directionClass}`}>
      <div className="mx-auto px-4 py-8" style={{ maxWidth: "420px" }}>
        {/* عنوان القروب */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold" style={{ color: "#FFD700" }}>
            لوحة تحكم SPX TRADING
          </h1>
          <p className="text-sm" style={{ color: "#c9c9c9" }}>
            Dashboard Control Panel
          </p>
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

        {/* الكارد الرئيسي */}
        <div
          className="contract-card"
          style={{ background: "#111", borderColor: "#333" }}
        >
          {/* الرمز */}
          <div className="field-block">
            <label className="field-label" style={{ color: "#FFD700" }}>
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
            <label className="field-label" style={{ color: "#FFD700" }}>
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
            <label className="field-label" style={{ color: "#FFD700" }}>
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
            <label className="field-label" style={{ color: "#FFD700" }}>
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

          {/* نوع الخيار */}
          <div className="field-block">
            <label className="field-label" style={{ color: "#FFD700" }}>
              {lang === "ar" ? "نوع الخيار" : "Contract Type"}
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                className={`btn-call ${
                  contractType === "CALL" ? "btn-selected" : ""
                }`}
                onClick={() => setContractType("CALL")}
              >
                {lang === "ar" ? "شراء" : "CALL"}
              </button>

              <button
                type="button"
                className={`btn-put ${
                  contractType === "PUT" ? "btn-selected" : ""
                }`}
                onClick={() => setContractType("PUT")}
              >
                {lang === "ar" ? "بيع" : "PUT"}
              </button>
            </div>
          </div>

          {/* الأسعار */}
          <div className="field-block">
            <label className="field-label" style={{ color: "#FFD700" }}>
              {lang === "ar" ? "سعر الدخول" : "Entry Price"}
            </label>
            <input
              className="input-purple"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
            />
          </div>

          <div className="field-block">
            <label className="field-label" style={{ color: "#FFD700" }}>
              {lang === "ar" ? "هدف الربح (TP)" : "Take Profit (TP)"}
            </label>
            <input
              className="input-purple"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>

          <div className="field-block">
            <label className="field-label" style={{ color: "#FFD700" }}>
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
            <label className="field-label" style={{ color: "#FFD700" }}>
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

      {/* معاينة العقد */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-4">
          <div
            className="contract-card"
            style={{
              maxWidth: "420px",
              width: "100%",
              background: "#111",
              borderColor: "#333",
              padding: "20px",
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "#FFD700" }}
            >
              {lang === "ar" ? "معاينة العقد" : "Contract Preview"}
            </h2>

            <p>رمز: {symbol}</p>
            <p>Strike: {strike}</p>
            <p>
              Expiration:{" "}
              {expiration ? expiration.toISOString().split("T")[0] : "-"}
            </p>
            <p>
              نوع العقد:{" "}
              {contractType === "CALL"
                ? lang === "ar"
                  ? "شراء"
                  : "CALL"
                : lang === "ar"
                ? "بيع"
                : "PUT"}
            </p>
            <p>سعر الدخول: {entryPrice}</p>
            <p>هدف الربح: {takeProfit}</p>
            <p>إيقاف الخسارة: {stopLoss}</p>
            <p>ملاحظات: {notes || "-"}</p>

            <button
              className="btn-stop mt-4"
              onClick={() => setShowPreview(false)}
            >
              {lang === "ar" ? "إغلاق" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
