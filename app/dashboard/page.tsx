"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DashboardPage() {
  // الحقول الأساسية
  const [symbol, setSymbol] = useState("SPX");
  const [company, setCompany] = useState("");
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);

  const [strike, setStrike] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);

  const [note, setNote] = useState("");
  const [groupLink, setGroupLink] = useState("");

  const [preview, setPreview] = useState(false);

  const [openTrades, setOpenTrades] = useState<any[]>([]);
  const [closedTrades, setClosedTrades] = useState<any[]>([]);

  const [botRunning, setBotRunning] = useState(false);

  // حفظ الشركات
  useEffect(() => {
    const saved = localStorage.getItem("lux_companies");
    if (saved) setSavedCompanies(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!company.trim()) {
      setFilteredCompanies([]);
      return;
    }
    const lower = company.toLowerCase();
    setFilteredCompanies(
      savedCompanies.filter((c) => c.toLowerCase().startsWith(lower))
    );
  }, [company, savedCompanies]);

  const saveCompany = () => {
    if (!company.trim()) return;
    if (!savedCompanies.includes(company)) {
      const updated = [...savedCompanies, company];
      setSavedCompanies(updated);
      localStorage.setItem("lux_companies", JSON.stringify(updated));
    }
    setCompany("");
  };

  // إرسال العقد
  const sendContract = () => {
    const contract = {
      symbol,
      company,
      strike,
      manualDate: `${day}/${month}/${year}`,
      calendarDate,
      note,
      groupLink,
    };
    setOpenTrades([...openTrades, contract]);
    setPreview(true);
  };

  // إغلاق المعاينة
  const closePreview = () => setPreview(false);

  return (
    <div className="min-h-screen bg-black text-white px-5 py-6">
      <div className="mx-auto" style={{ maxWidth: "430px" }}>

        {/* الهيدر */}
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "#FFD700" }}>
          SPX TRADING — Luxury Dashboard
        </h1>

        {/* القسم الأول — إدخال العقد */}
        <div className="bg-[#0D0D0D] border border-[#FFD700] p-5 rounded-xl shadow-lg mb-6">

          <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700" }}>
            إدخال العقد
          </h2>

          {/* الرمز */}
          <label className="text-[#FFD700] font-semibold">الرمز</label>
          <input
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-4"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />

          {/* الشركة */}
          <label className="text-[#FFD700] font-semibold">اسم الشركة</label>
          <input
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          {filteredCompanies.length > 0 && (
            <div className="bg-black border border-[#FFD700] p-2 rounded-lg mb-3">
              {filteredCompanies.map((c) => (
                <div
                  key={c}
                  className="p-2 hover:bg-[#222] cursor-pointer rounded"
                  onClick={() => setCompany(c)}
                >
                  {c}
                </div>
              ))}
            </div>
          )}

          <button
            className="w-full bg-purple-700 p-3 rounded-lg mb-4 font-semibold"
            onClick={saveCompany}
          >
            حفظ الشركة
          </button>

          {/* Strike */}
          <label className="text-[#FFD700] font-semibold">سعر التنفيذ (Strike)</label>
          <input
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-4"
            value={strike}
            onChange={(e) => setStrike(e.target.value)}
          />

          {/* التاريخ اليدوي */}
          <label className="text-[#FFD700] font-semibold">تاريخ الانتهاء (يدوي)</label>
          <div className="flex gap-2 mb-4">
            <input
              placeholder="يوم"
              className="w-full bg-black border border-[#FFD700] p-3 rounded-lg"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <input
              placeholder="شهر"
              className="w-full bg-black border border-[#FFD700] p-3 rounded-lg"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              placeholder="سنة"
              className="w-full bg-black border border-[#FFD700] p-3 rounded-lg"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* تقويم فاخر */}
          <DatePicker
            selected={calendarDate}
            onChange={(date) => setCalendarDate(date)}
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-4"
            placeholderText="اختر من التقويم"
          />

          {/* ملاحظة */}
          <label className="text-[#FFD700] font-semibold">ملاحظة</label>
          <textarea
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-4"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* القروب */}
          <label className="text-[#FFD700] font-semibold">رابط القروب</label>
          <input
            className="w-full bg-black border border-[#FFD700] p-3 rounded-lg mb-4"
            placeholder="ضع رابط القروب هنا"
            value={groupLink}
            onChange={(e) => setGroupLink(e.target.value)}
          />

          {/* الأزرار */}
          <button
            className="w-full bg-yellow-600 text-black p-3 rounded-lg font-bold mb-3"
            onClick={sendContract}
          >
            إرسال العقد
          </button>

          <button
            className={`w-full p-3 rounded-lg font-bold mb-3 ${
              botRunning ? "bg-red-700" : "bg-green-700"
            }`}
            onClick={() => setBotRunning(!botRunning)}
          >
            {botRunning ? "إيقاف البوت" : "تشغيل البوت"}
          </button>
        </div>

        {/* القسم الثاني — الصفقات المفتوحة */}
        <div className="bg-[#0D0D0D] border border-[#FFD700] p-5 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700" }}>
            الصفقات المفتوحة
          </h2>

          {openTrades.length === 0 && (
            <p className="text-gray-400">لا توجد صفقات مفتوحة حالياً.</p>
          )}

          {openTrades.map((t, i) => (
            <div key={i} className="border border-[#FFD700] p-3 rounded-lg mb-3">
              <p>الرمز: {t.symbol}</p>
              <p>الشركة: {t.company}</p>
              <p>Strike: {t.strike}</p>
              <p>تاريخ: {t.manualDate}</p>
              <p>ملاحظة: {t.note || "-"}</p>
            </div>
          ))}
        </div>

        {/* القسم الثالث — الصفقات المغلقة */}
        <div className="bg-[#0D0D0D] border border-[#FFD700] p-5 rounded-xl shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700" }}>
            الصفقات المغلقة
          </h2>

          {closedTrades.length === 0 && (
            <p className="text-gray-400">لا توجد صفقات مغلقة حالياً.</p>
          )}
        </div>

        {/* معاينة العقد */}
        {preview && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center px-4">
            <div className="bg-[#0D0D0D] border border-[#FFD700] p-5 rounded-xl shadow-lg" style={{ maxWidth: "420px", width: "100%" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700" }}>
                معاينة العقد
              </h2>

              <p>الرمز: {symbol}</p>
              <p>الشركة: {company || "-"}</p>
              <p>Strike: {strike || "-"}</p>
              <p>تاريخ يدوي: {day}/{month}/{year}</p>
              <p>ملاحظة: {note || "-"}</p>
              <p>القروب: {groupLink || "-"}</p>

              <button
                className="w-full bg-red-700 p-3 rounded-lg mt-4"
                onClick={closePreview}
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
